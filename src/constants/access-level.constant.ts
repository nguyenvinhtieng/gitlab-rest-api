/**
 * Valid access levels for protected branches and project/group members.
 * @see https://docs.gitlab.com/api/protected_branches/#valid-access-levels
 */
export const ACCESS_LEVEL = {
  NO_ACCESS: 0,
  MINIMAL_ACCESS: 5,
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MAINTAINER: 40,
  OWNER: 50,
  ADMINISTRATOR: 60,
} as const;

export type AccessLevel = (typeof ACCESS_LEVEL)[keyof typeof ACCESS_LEVEL];
