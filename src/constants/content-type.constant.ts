/**
 * Content types used by the GitLab REST API.
 * @see https://docs.gitlab.com/api/rest/#response-format
 */
export const CONTENT_TYPE = {
  JSON: "application/json",
  JSON_UTF8: "application/json; charset=utf-8",
  TEXT_PLAIN: "text/plain",
} as const;

export type ContentType = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE];
