/**
 * Sort order values for keyset-based pagination.
 * @see https://docs.gitlab.com/api/rest/#keyset-based-pagination
 */
export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
