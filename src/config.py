# RBAC Configuration - Define roles and permissions
PERMISSIONS = {
    "admin": ["create", "read", "update", "delete", "manage_users"],
    "editor": ["create", "read", "update"],
    "viewer": ["read"]
}

ROLES = list(PERMISSIONS.keys())
DEFAULT_ROLE = "viewer"
