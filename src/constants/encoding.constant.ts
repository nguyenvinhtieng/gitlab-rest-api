/**
 * URL encoding values used by the GitLab REST API.
 * @see https://docs.gitlab.com/api/rest/#encoding
 */
export const URL_ENCODING = {
  SLASH: "%2F",
  PLUS: "%2B",
} as const;

export type UrlEncoding = (typeof URL_ENCODING)[keyof typeof URL_ENCODING];
