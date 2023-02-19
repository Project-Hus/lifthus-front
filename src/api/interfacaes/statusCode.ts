export const StatusInfo = {
  succ: {
    Ok: {
      code: 200,
      message: "Ok",
    },
    Created: {
      code: 201,
      message: "Created",
    },
  },
  fail: {
    Unauthorized: {
      code: 401,
      message: "Unauthorized",
    },
    NotAcceptable: {
      code: 406,
      message: "Not Acceptable",
    },
    Conflict: {
      code: 409,
      message: "Conflict",
    },
  },
};
