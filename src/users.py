# User Management Module
import json
import os
from config import ROLES, DEFAULT_ROLE

USERS_FILE = "data/users.json"

class UserManager:
    def __init__(self, users_file=USERS_FILE):
        self.users_file = users_file
        self.users_db = self.load_users()
    
    def load_users(self):
        """Load users from JSON file"""
        if os.path.exists(self.users_file):
            try:
                with open(self.users_file, 'r') as f:
                    return json.load(f)
            except:
                return self.get_default_users()
        return self.get_default_users()
    
    def save_users(self):
        """Save users to JSON file"""
        os.makedirs(os.path.dirname(self.users_file), exist_ok=True)
        with open(self.users_file, 'w') as f:
            json.dump(self.users_db, f, indent=2)
        print("✓ Users saved successfully")
    
    def get_default_users(self):
        """Return default test users"""
        return {
            "alice": {"password": "1234", "role": "admin"},
            "bob": {"password": "5678", "role": "editor"},
            "charlie": {"password": "0000", "role": "viewer"}
        }
    
    def login(self, username, password):
        """Authenticate user"""
        if username in self.users_db and self.users_db[username]["password"] == password:
            print(f"\n✅ Welcome {username}!")
            return {"username": username, "role": self.users_db[username]["role"]}
        else:
            print("❌ Invalid credentials!")
            return None
    
    def register_user(self, username, password, role=DEFAULT_ROLE):
        """Register a new user"""
        if username in self.users_db:
            print("❌ User already exists!")
            return False
        
        if role not in ROLES:
            print(f"❌ Invalid role. Choose from: {', '.join(ROLES)}")
            return False
        
        self.users_db[username] = {"password": password, "role": role}
        self.save_users()
        print(f"✅ User '{username}' registered successfully with role '{role}'")
        return True
    
    def change_password(self, username, old_password, new_password):
        """Change user password"""
        if username not in self.users_db:
            print("❌ User not found!")
            return False
        
        if self.users_db[username]["password"] != old_password:
            print("❌ Incorrect current password!")
            return False
        
        self.users_db[username]["password"] = new_password
        self.save_users()
        print("✅ Password changed successfully!")
        return True
    
    def delete_user(self, username):
        """Delete a user"""
        if username not in self.users_db:
            print("❌ User not found!")
            return False
        
        del self.users_db[username]
        self.save_users()
        print(f"✅ User '{username}' deleted successfully")
        return True
    
    def list_users(self):
        """List all users"""
        print("\n📋 Registered Users:")
        print("-" * 40)
        for username, data in self.users_db.items():
            print(f"  • {username:15} | Role: {data['role']}")
        print("-" * 40)
    
    def change_role(self, username, new_role):
        """Change user role (admin only)"""
        if username not in self.users_db:
            print("❌ User not found!")
            return False
        
        if new_role not in ROLES:
            print(f"❌ Invalid role. Choose from: {', '.join(ROLES)}")
            return False
        
        self.users_db[username]["role"] = new_role
        self.save_users()
        print(f"✅ User '{username}' role changed to '{new_role}'")
        return True
