import { errorHandler, notFoundHandler } from "../../middleware/errorHandler";

const mockReq = {} as any;
const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe("errorHandler middleware", () => {
  it("should return 500 and error message by default", () => {
    const err = new Error("Something went wrong");
    const res = mockRes();
    errorHandler(err, mockReq, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Something went wrong" })
    );
  });

  it("should use statusCode if provided", () => {
    const err = Object.assign(new Error("Bad request"), { statusCode: 400 });
    const res = mockRes();
    errorHandler(err, mockReq, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Bad request" })
    );
  });
});

describe("notFoundHandler middleware", () => {
  it("should return 404 and not found error", () => {
    const res = mockRes();
    notFoundHandler(mockReq, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Route not found" });
  });
});
