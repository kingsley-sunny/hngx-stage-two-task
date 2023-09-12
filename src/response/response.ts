export class ApiResponse {
  static makeErrorResponse(message: string = "Error", statusCode = 500) {
    return { statusCode: statusCode, message, success: false };
  }

  static makeSuccessResponse(
    data: Record<any, any>,
    message: string = "Successful",
    statusCode = 200
  ) {
    return {
      data,
      success: true,
      message,
      statusCode,
    };
  }
}
