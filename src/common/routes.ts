export const USER_PROFILE_IMAGE_ROUTE = `${process.env.PUBLIC_URL}/assets/`;

export const LIFTHUS_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://lifthus.com";

export const LIFTHUS_AUTH_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9091"
    : "https://api.lifthus.com";

export const LIFTHUS_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9091"
    : "https://api.lifthus.com";

export const HUS_AUTH_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9090"
    : "https://auth.cloudhus.com";

export const HUS_GOOGLE_LOGIN_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9090/auth/social/google/lifthus"
    : "https://auth.cloudhus.com/auth/social/google/lifthus";

export const HUS_SESSION_REVOKE_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9090/auth/session/revoke"
    : "https://auth.cloudhus.com/auth/session/revoke";
