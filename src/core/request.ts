import { HTTP_METHOD, type HttpMethod } from "../constants/http-method.constant";

export class GitlabApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body: unknown;

  constructor(status: number, statusText: string, body: unknown) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof (body as { message: unknown }).message === "string"
        ? (body as { message: string }).message
        : `GitLab API request failed with status ${status}`;

    super(message);
    this.name = "GitlabApiError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

export interface CommonRequestOptions {
  method?: HttpMethod;
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  headers?: Record<string, string>;
}

function buildQueryString(
  query?: Record<string, string | number | boolean | undefined | null>,
): string {
  if (!query) {
    return "";
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) {
      continue;
    }

    params.append(key, String(value));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

function parseResponseBody(text: string): unknown {
  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function request<T = unknown>(
  url: string,
  options: CommonRequestOptions = {},
): Promise<T> {
  const method: HttpMethod = options.method ?? HTTP_METHOD.GET;
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...options.headers,
  };

  const init: RequestInit = {
    method,
    headers,
  };

  if (options.body !== undefined) {
    if (typeof options.body === "string") {
      init.body = options.body;
    } else {
      headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
      init.body = JSON.stringify(options.body);
    }
  }

  const response = await fetch(`${url}${buildQueryString(options.query)}`, init);
  const responseText = await response.text();
  const responseBody = parseResponseBody(responseText);

  if (!response.ok) {
    throw new GitlabApiError(response.status, response.statusText, responseBody);
  }

  return responseBody as T;
}
