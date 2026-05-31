#!/usr/bin/env python3
"""
Simple RBAC (Role-Based Access Control) Mini Project
Demonstrates basic role-based access control with user management
"""

import sys
import os

# Add src directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from cli import RBACCLI

if __name__ == "__main__":
    app = RBACCLI()
    app.run()
