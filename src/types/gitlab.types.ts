import type { HttpMethod } from "../constants/http-method.constant";

export interface GitlabAuthConfig {
  personalAccessToken?: string;
  jobToken?: string;
  sudo?: string;
}

export interface GitlabConfig extends GitlabAuthConfig {
  host: string;
  projectId?: number | string;
  projectPath?: string;
  headers?: Record<string, string>;
  apiPrefix?: string;
}

export interface RequestOptions {
  method?: HttpMethod;
  path: string;
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  headers?: Record<string, string>;
}
