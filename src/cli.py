# Command Line Interface for RBAC System
from rbac import RBAC
from users import UserManager
from config import ROLES

class RBACCLI:
    def __init__(self):
        self.rbac = RBAC()
        self.user_manager = UserManager()
        self.current_user = None
    
    def show_banner(self):
        """Display welcome banner"""
        print("\n" + "="*50)
        print("🔐 RBAC (Role-Based Access Control) System")
        print("="*50)
    
    def login_menu(self):
        """Handle login and registration"""
        while True:
            print("\n📌 Main Menu:")
            print("  1. Login")
            print("  2. Register")
            print("  3. Exit")
            
            choice = input("Choose option (1-3): ").strip()
            
            if choice == "1":
                self.login()
                if self.current_user:
                    break
            elif choice == "2":
                self.register()
            elif choice == "3":
                print("👋 Goodbye!")
                exit()
            else:
                print("❌ Invalid choice!")
    
    def login(self):
        """Login user"""
        username = input("Enter username: ").strip()
        password = input("Enter password: ").strip()
        self.current_user = self.user_manager.login(username, password)
    
    def register(self):
        """Register new user"""
        username = input("Enter username: ").strip()
        password = input("Enter password: ").strip()
        
        print(f"\nAvailable roles: {', '.join(ROLES)}")
        role = input("Choose role (default: viewer): ").strip() or "viewer"
        
        self.user_manager.register_user(username, password, role)
    
    def action_menu(self):
        """Main action menu after login"""
        while True:
            print(f"\n👤 Logged in as: {self.current_user['username']} ({self.current_user['role']})")
            print("📌 Available actions:")
            print("  • create   - Create resource")
            print("  • read     - Read resource")
            print("  • update   - Update resource")
            print("  • delete   - Delete resource")
            print("  • exit     - Logout")
            
            if self.current_user['role'] == 'admin':
                print("\n🔧 Admin Options:")
                print("  • manage_users - Manage users")
                print("  • change_role  - Change user role")
                print("  • change_pwd   - Change password")
                print("  • delete_user  - Delete user")
            else:
                print("\n  • change_pwd   - Change password")
            
            action = input("\nChoose action: ").strip().lower()
            
            if action == "exit":
                print("👋 Logged out!")
                self.current_user = None
                break
            elif action == "manage_users":
                self.admin_only("manage_users", self.user_manager.list_users)
            elif action == "change_role":
                self.admin_only("change_role", self.manage_roles)
            elif action == "change_pwd":
                self.change_password()
            elif action == "delete_user":
                self.admin_only("delete_user", self.delete_user)
            elif action in ["create", "read", "update", "delete"]:
                self.rbac.check_access(self.current_user, action)
            else:
                print("❌ Invalid action!")
    
    def admin_only(self, action, callback):
        """Check admin permission"""
        if self.rbac.check_access(self.current_user, action):
            callback()
        else:
            print("❌ You don't have permission to perform this action!")
    
    def manage_roles(self):
        """Allow admin to change user roles"""
        self.user_manager.list_users()
        username = input("Enter username to change role: ").strip()
        
        print(f"Available roles: {', '.join(ROLES)}")
        new_role = input("Enter new role: ").strip()
        
        self.user_manager.change_role(username, new_role)
    
    def change_password(self):
        """Change current user password"""
        old_pwd = input("Enter current password: ").strip()
        new_pwd = input("Enter new password: ").strip()
        
        self.user_manager.change_password(self.current_user['username'], old_pwd, new_pwd)
    
    def delete_user(self):
        """Delete a user (admin only)"""
        self.user_manager.list_users()
        username = input("Enter username to delete: ").strip()
        
        confirm = input(f"Are you sure? (yes/no): ").strip().lower()
        if confirm == "yes":
            self.user_manager.delete_user(username)
    
    def run(self):
        """Run the application"""
        self.show_banner()
        self.login_menu()
        self.action_menu()
        print("\n" + "="*50)
        print("Thank you for using RBAC System!")
        print("="*50 + "\n")
