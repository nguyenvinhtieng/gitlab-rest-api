import { AUTH_HEADER } from "../constants/auth.constant";
import type { GitlabAuthConfig } from "../types/gitlab.types";

/** @deprecated Use {@link AUTH_HEADER} from constants instead. */
export const HEADERS = AUTH_HEADER;

export type AuthHeaderKey = keyof typeof AUTH_HEADER;

export function buildAuthHeaders(auth: GitlabAuthConfig): Record<string, string> {
  const headers: Record<string, string> = {};

  if (auth.personalAccessToken) {
    headers[AUTH_HEADER.PRIVATE_TOKEN] = auth.personalAccessToken;
  }

  if (auth.jobToken) {
    headers[AUTH_HEADER.JOB_TOKEN] = auth.jobToken;
  }

  if (auth.sudo) {
    headers[AUTH_HEADER.SUDO] = auth.sudo;
  }

  return headers;
}
