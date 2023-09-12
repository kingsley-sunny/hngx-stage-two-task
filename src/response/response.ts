export class ApiResponse {
  static makeErrorResponse(message: string = "Error", statusCode = 500) {
    return { statusCode: statusCode, message, success: false };
  }

  static makeSuccessResponse(data: any, message: string = "Successful", statusCode = 200) {
    return {
      data,
      success: true,
      message,
      statusCode,
    };
  }
}
