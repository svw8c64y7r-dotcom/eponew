export function getUserRole(user) {
  if (!user) return null;
  // Role MUST come from server-authoritative Supabase app_metadata or user_metadata.
  // NEVER infer role from the email address — email is user-controlled and can be spoofed.
  // Admin role is set exclusively via the Supabase Admin API (service_role key, backend only).
  return (
    user?.app_metadata?.role ||
    user?.user_metadata?.role ||
    'client'
  );
}
