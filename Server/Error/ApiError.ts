
class ApiError extends Error {
  status: any;
  message: any;
  constructor(status: any, message: any) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(msg: any) {
    return new ApiError(400, msg);
  }

  static internal(msg: any) {
    return new ApiError(500, msg);
  }
}

module.exports = ApiError;
