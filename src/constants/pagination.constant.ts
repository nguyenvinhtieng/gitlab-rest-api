/**
 * Pagination query parameter names.
 * @see https://docs.gitlab.com/api/rest/#pagination
 */
export const PAGINATION_PARAM = {
  PAGE: "page",
  PER_PAGE: "per_page",
  PAGINATION: "pagination",
  ORDER_BY: "order_by",
  SORT: "sort",
} as const;

/**
 * Default and limit values for pagination.
 * @see https://docs.gitlab.com/api/rest/#offset-based-pagination
 */
export const PAGINATION_DEFAULT = {
  PAGE: 1,
  PER_PAGE: 20,
  PER_PAGE_MAX: 100,
} as const;

/** @see https://docs.gitlab.com/api/rest/#keyset-based-pagination */
export const PAGINATION_TYPE = {
  KEYSET: "keyset",
} as const;

/**
 * `rel` values in the pagination `Link` header.
 * @see https://docs.gitlab.com/api/rest/#pagination-link-header
 */
export const PAGINATION_LINK_REL = {
  PREV: "prev",
  NEXT: "next",
  FIRST: "first",
  LAST: "last",
} as const;

/**
 * Pagination response headers returned by the GitLab REST API.
 * @see https://docs.gitlab.com/api/rest/#other-pagination-headers
 */
export const PAGINATION_HEADER = {
  X_NEXT_PAGE: "x-next-page",
  X_PAGE: "x-page",
  X_PER_PAGE: "x-per-page",
  X_PREV_PAGE: "x-prev-page",
  X_TOTAL: "x-total",
  X_TOTAL_PAGES: "x-total-pages",
  X_NEXT_CURSOR: "X-NEXT-CURSOR",
  X_PREV_CURSOR: "X-PREV-CURSOR",
  LINK: "Link",
} as const;

/** @see https://docs.gitlab.com/api/rest/#pagination-response-headers */
export const PAGINATION_TOTAL_HEADER_THRESHOLD = 10_000 as const;

export type PaginationParam =
  (typeof PAGINATION_PARAM)[keyof typeof PAGINATION_PARAM];
export type PaginationLinkRel =
  (typeof PAGINATION_LINK_REL)[keyof typeof PAGINATION_LINK_REL];
export type PaginationHeader =
  (typeof PAGINATION_HEADER)[keyof typeof PAGINATION_HEADER];
