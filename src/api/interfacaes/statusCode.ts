export interface StatusInfo {
  status: 200 | 201 | 401 | 406 | 409 | 500;
  message: string;
}

export const statusInfo = {
  succ: {
    Ok: {
      status: 200,
      message: "Ok",
    },
    Created: {
      status: 201,
      message: "Created",
    },
  },
  fail: {
    Unauthorized: {
      status: 401,
      message: "Unauthorized",
    },
    NotAcceptable: {
      status: 406,
      message: "Not Acceptable",
    },
    Conflict: {
      status: 409,
      message: "Conflict",
    },
    InternalServerError: {
      status: 500,
      message: "Internal Server Error",
    },
  },
};