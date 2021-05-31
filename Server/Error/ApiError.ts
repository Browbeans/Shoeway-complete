
class ApiError extends Error {
  code: any;
  message: any;
  constructor(code: any, message: any) {
    super();
    this.code = code;
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
