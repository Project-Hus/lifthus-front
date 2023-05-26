export const USER_PROFILE_IMAGE_ROUTE = `${process.env.PUBLIC_URL}/assets/`;

/* SERVICE URLS */

export const LIFTHUS_FRONT_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://lifthus.com";

export const LIFTHUS_AUTH_URL =
  process.env.NODE_ENV === "development"
    ? //? "http://localhost:9091"
      "https://auth.lifthus.com"
    : "https://auth.lifthus.com";

export const LIFTHUS_API_URL =
  process.env.NODE_ENV === "development"
    ? //? "http://localhost:9091"
      "https://api.lifthus.com"
    : "https://api.lifthus.com";

export const HUS_AUTH_URL =
  process.env.NODE_ENV === "development"
    ? //? "http://localhost:9090"
      "https://auth.cloudhus.com"
    : "https://auth.cloudhus.com";

export const HUS_API_URL =
  process.env.NODE_ENV === "development"
    ? //? "http://localhost:9090"
      "https://api.cloudhus.com"
    : "https://api.cloudhus.com";

/* API ENDPOINTS */

export const HUS_GOOGLE_LOGIN_ENDPOINT: string =
  HUS_AUTH_URL +
  `/auth/social/google/${
    process.env.NODE_ENV === "development" ? "localhost" : "lifthus"
  }`;

export const HUS_SESSION_REVOKE_ENDPOINT: string =
  HUS_AUTH_URL + "/auth/session/revoke";
