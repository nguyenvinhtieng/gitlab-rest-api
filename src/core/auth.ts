import type { GitlabAuthConfig } from "../types/gitlab.types";

export const HEADERS = {
  JOB_TOKEN: "JOB-TOKEN",
  PRIVATE_TOKEN: "PRIVATE-TOKEN",
  SUDO: "Sudo",
} as const;

export type AuthHeaderKey = keyof typeof HEADERS;

export function buildAuthHeaders(auth: GitlabAuthConfig): Record<string, string> {
  const headers: Record<string, string> = {};

  if (auth.personalAccessToken) {
    headers[HEADERS.PRIVATE_TOKEN] = auth.personalAccessToken;
  }

  if (auth.jobToken) {
    headers[HEADERS.JOB_TOKEN] = auth.jobToken;
  }

  if (auth.sudo) {
    headers[HEADERS.SUDO] = auth.sudo;
  }

  return headers;
}
