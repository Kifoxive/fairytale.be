export default class ApiError extends Error {
    status: number;
    errors: any;
    constructor(status: number, message: string, errors?: any[]);
    static BadRequest(message?: string): ApiError;
    static UnauthorizedError(message?: string): ApiError;
    static NotFound(message?: string): ApiError;
    static ServerError(message?: string): ApiError;
}
