// RBAC Configuration
export const ROLES = ["admin", "editor", "viewer"];

export const PERMISSIONS = {
  admin: ["create", "read", "update", "delete", "manage_users"],
  editor: ["create", "read", "update"],
  viewer: ["read"],
};

export const DEFAULT_ROLE = "viewer";

// Check if user has permission
export function hasPermission(role, action) {
  return PERMISSIONS[role]?.includes(action) || false;
}

// Check if user has role
export function isValidRole(role) {
  return ROLES.includes(role);
}
