import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔐</span>
          <h1 className="text-xl font-bold">RBAC Dashboard</h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-gray-300">{user.role}</p>
            </div>
            <button
              onClick={onLogout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
