export const ADMIN_SESSION_COOKIE = "medibook-admin-session";

export function isValidAdminSession(value: string | undefined) {
  return value === "authenticated";
}
