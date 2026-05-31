# Core RBAC Logic
from config import PERMISSIONS

class RBAC:
    def __init__(self, permissions=None):
        self.permissions = permissions or PERMISSIONS
    
    def has_permission(self, role, action):
        """Check if a role has permission to perform an action"""
        if role not in self.permissions:
            return False
        return action in self.permissions[role]
    
    def check_access(self, user, action):
        """Check and print access status"""
        role = user["role"]
        
        if self.has_permission(role, action):
            print(f"✅ Access granted: {role} can perform '{action}'")
            return True
        else:
            print(f"❌ Access denied: {role} cannot perform '{action}'")
            return False
    
    def get_permissions(self, role):
        """Get all permissions for a role"""
        return self.permissions.get(role, [])
