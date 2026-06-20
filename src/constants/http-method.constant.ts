/**
 * HTTP methods supported by the GitLab REST API.
 * @see https://docs.gitlab.com/api/rest/troubleshooting/#status-codes
 */
export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export type HttpMethod = (typeof HTTP_METHOD)[keyof typeof HTTP_METHOD];
