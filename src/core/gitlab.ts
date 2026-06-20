import { CONTENT_TYPE } from "../constants/content-type.constant";
import { DEFAULT_API_PREFIX } from "../constants/common.constant";
import { HTTP_METHOD } from "../constants/http-method.constant";
import type { GitlabConfig, RequestOptions } from "../types/gitlab.types";
import { buildAuthHeaders } from "./auth";
import { request } from "./request";

export class Gitlab {
  readonly host: string;
  readonly projectId?: number | string;
  readonly projectPath?: string;
  readonly apiPrefix: string;

  private readonly defaultHeaders: Record<string, string>;

  constructor(config: GitlabConfig) {
    this.host = config.host.replace(/\/+$/, "");
    this.projectId = config.projectId;
    this.projectPath = config.projectPath;
    this.apiPrefix = config.apiPrefix ?? DEFAULT_API_PREFIX;

    this.defaultHeaders = {
      Accept: CONTENT_TYPE.JSON,
      ...config.headers,
      ...buildAuthHeaders(config),
    };
  }

  get encodedProject(): string {
    if (this.projectId !== undefined) {
      return encodeURIComponent(String(this.projectId));
    }

    if (this.projectPath) {
      return encodeURIComponent(this.projectPath);
    }

    throw new Error("Gitlab projectId or projectPath is required");
  }

  projectPathOf(resourcePath = ""): string {
    const normalizedResource = resourcePath.replace(/^\/+/, "");
    return `/projects/${this.encodedProject}${
      normalizedResource ? `/${normalizedResource}` : ""
    }`;
  }

  buildUrl(path: string, query?: RequestOptions["query"]): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const baseUrl = `${this.host}${this.apiPrefix}${normalizedPath}`;

    if (!query) {
      return baseUrl;
    }

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) {
        continue;
      }

      params.append(key, String(value));
    }

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  async request<T = unknown>(options: RequestOptions): Promise<T> {
    const url = this.buildUrl(options.path, options.query);

    return request<T>(url, {
      ...options,
      method: options.method ?? HTTP_METHOD.GET,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    });
  }

  get<T = unknown>(
    path: string,
    options?: Omit<RequestOptions, "method" | "path">,
  ): Promise<T> {
    return this.request<T>({ ...options, method: HTTP_METHOD.GET, path });
  }

  post<T = unknown>(
    path: string,
    options?: Omit<RequestOptions, "method" | "path">,
  ): Promise<T> {
    return this.request<T>({ ...options, method: HTTP_METHOD.POST, path });
  }

  put<T = unknown>(
    path: string,
    options?: Omit<RequestOptions, "method" | "path">,
  ): Promise<T> {
    return this.request<T>({ ...options, method: HTTP_METHOD.PUT, path });
  }

  patch<T = unknown>(
    path: string,
    options?: Omit<RequestOptions, "method" | "path">,
  ): Promise<T> {
    return this.request<T>({ ...options, method: HTTP_METHOD.PATCH, path });
  }

  delete<T = unknown>(
    path: string,
    options?: Omit<RequestOptions, "method" | "path">,
  ): Promise<T> {
    return this.request<T>({ ...options, method: HTTP_METHOD.DELETE, path });
  }
}
