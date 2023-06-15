const statusCode = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const messages = {
  SERVER_ERROR: "Internal Server Error",
  VALIDATION_ERROR: "Invalid Credentials",
  MISSING_FIELD: "please fill all fields",
  POST_CREATED: "post created successfully",
  POST_NOT_FOUND: "post not found",
  POST_GET: "your post",
  POST_GETS: "All post",
  POST_UPDATE: "post updated successfully",
  POST_DELETE: "post deleted successfully",
  USER_CREATED: "user created successfully",
  LOGIN_SUCCESS: "user logged in successfully",
  UPDATE_SUCCESS: "user updated successfully",
};

module.exports = {
  statusCode,
  messages,
};
