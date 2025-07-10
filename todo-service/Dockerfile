# Use Node.js 22.17.0 as specified in the spec
FROM node:22.17.0-alpine

# Install pnpm
RUN npm install -g pnpm@10.0.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Run tests before building
RUN pnpm test

# Build the application
RUN pnpm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"] 