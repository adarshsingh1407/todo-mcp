import axios, { AxiosInstance } from "axios";
import {
  AIProvider,
  AIResponse,
  AIProviderError,
  OllamaConfig,
  ClaudeConfig,
} from "../types";

export interface AIClientConfig {
  provider: AIProvider;
  ollama?: OllamaConfig;
  claude?: ClaudeConfig;
}

export class AIClient {
  private config: AIClientConfig;
  private ollamaClient?: AxiosInstance;
  private claudeClient?: AxiosInstance;

  constructor(config: AIClientConfig) {
    this.config = config;
    this.initializeClients();
  }

  private initializeClients(): void {
    if (this.config.provider === "ollama" && this.config.ollama) {
      this.ollamaClient = axios.create({
        baseURL: this.config.ollama.url,
        timeout: 30000,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (this.config.provider === "claude" && this.config.claude) {
      this.claudeClient = axios.create({
        baseURL: "https://api.anthropic.com/v1",
        timeout: 30000,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.config.claude.apiKey,
          "anthropic-version": "2023-06-01",
        },
      });
    }
  }

  async generateResponse(
    prompt: string,
    systemPrompt?: string
  ): Promise<AIResponse> {
    try {
      if (this.config.provider === "ollama") {
        return await this.generateOllamaResponse(prompt, systemPrompt);
      } else if (this.config.provider === "claude") {
        return await this.generateClaudeResponse(prompt, systemPrompt);
      } else {
        throw new AIProviderError("Unsupported AI provider");
      }
    } catch (error) {
      if (error instanceof AIProviderError) {
        throw error;
      }
      throw new AIProviderError(
        `AI generation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private async generateOllamaResponse(
    prompt: string,
    systemPrompt?: string
  ): Promise<AIResponse> {
    if (!this.ollamaClient || !this.config.ollama) {
      throw new AIProviderError("Ollama client not initialized");
    }

    const requestBody = {
      model: this.config.ollama.model,
      prompt: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt,
      stream: false,
    };

    const response = await this.ollamaClient.post("/api/generate", requestBody);

    return {
      content: response.data.response,
      model: this.config.ollama.model,
      usage: {
        promptTokens: response.data.prompt_eval_count || 0,
        completionTokens: response.data.eval_count || 0,
        totalTokens:
          (response.data.prompt_eval_count || 0) +
          (response.data.eval_count || 0),
      },
    };
  }

  private async generateClaudeResponse(
    prompt: string,
    systemPrompt?: string
  ): Promise<AIResponse> {
    if (!this.claudeClient || !this.config.claude) {
      throw new AIProviderError("Claude client not initialized");
    }

    const requestBody = {
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      messages: [
        ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
        { role: "user", content: prompt },
      ],
    };

    const response = await this.claudeClient.post("/messages", requestBody);

    return {
      content: response.data.content[0].text,
      model: response.data.model,
      usage: {
        promptTokens: response.data.usage.input_tokens,
        completionTokens: response.data.usage.output_tokens,
        totalTokens:
          response.data.usage.input_tokens + response.data.usage.output_tokens,
      },
    };
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (this.config.provider === "ollama" && this.ollamaClient) {
        await this.ollamaClient.get("/api/tags");
        return true;
      } else if (this.config.provider === "claude" && this.claudeClient) {
        // Claude doesn't have a simple health check endpoint, so we'll test with a minimal request
        await this.generateResponse("Hello", "You are a helpful assistant.");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  getProvider(): AIProvider {
    return this.config.provider;
  }

  getModel(): string {
    if (this.config.provider === "ollama") {
      return this.config.ollama?.model || "unknown";
    } else if (this.config.provider === "claude") {
      return "claude-3-haiku-20240307";
    }
    return "unknown";
  }
}
