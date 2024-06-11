export default class ApiError extends Error {
  status: number;
  errors;
  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static BadRequest(message = "Invalid request") {
    return new ApiError(400, message);
  }
  static UnauthorizedError(message = "Unauthorized request") {
    return new ApiError(401, message);
  }
  static Forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }
  static NotFound(message = "Resource not found") {
    return new ApiError(404, message);
  }
  static ServerError(message = "Unexpected error occured") {
    return new ApiError(500, message);
  }
}
