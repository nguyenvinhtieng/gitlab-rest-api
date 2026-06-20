/**
 * Authentication HTTP headers supported by the GitLab REST API.
 * @see https://docs.gitlab.com/api/rest/authentication/
 */
export const AUTH_HEADER = {
  PRIVATE_TOKEN: "PRIVATE-TOKEN",
  JOB_TOKEN: "JOB-TOKEN",
  AUTHORIZATION: "Authorization",
  SUDO: "Sudo",
  CAPTCHA_RESPONSE: "X-GitLab-Captcha-Response",
  SPAM_LOG_ID: "X-GitLab-Spam-Log-Id",
} as const;

/**
 * Authentication query parameter names.
 * @see https://docs.gitlab.com/api/rest/authentication/
 */
export const AUTH_QUERY_PARAM = {
  ACCESS_TOKEN: "access_token",
  PRIVATE_TOKEN: "private_token",
  SUDO: "sudo",
} as const;

/** @see https://docs.gitlab.com/api/rest/authentication/#oauth-20-tokens */
export const AUTH_SCHEME = {
  BEARER: "Bearer",
} as const;

/** @see https://docs.gitlab.com/api/rest/authentication/#oauth-20-tokens */
export const OAUTH_ACCESS_TOKEN_TTL_SECONDS = 7_200 as const;

export type AuthHeader = (typeof AUTH_HEADER)[keyof typeof AUTH_HEADER];
export type AuthQueryParam =
  (typeof AUTH_QUERY_PARAM)[keyof typeof AUTH_QUERY_PARAM];
