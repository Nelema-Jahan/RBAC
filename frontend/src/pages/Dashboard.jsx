import React from 'react';

const rolePermissions = {
  admin: ['create', 'read', 'update', 'delete', 'manage_users'],
  editor: ['create', 'read', 'update'],
  viewer: ['read'],
};

export default function Dashboard({ user }) {
  const permissions = rolePermissions[user.role] || [];

  const getActionStatus = (action) => {
    return permissions.includes(action);
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-gray-600">Username</p>
            <p className="text-lg font-bold">{user.username}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded">
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg font-bold">{user.email}</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <p className="text-sm text-gray-600">Role</p>
            <p className="text-lg font-bold capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Permissions Card */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Your Permissions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['create', 'read', 'update', 'delete', 'manage_users'].map((action) => {
            const hasAccess = getActionStatus(action);
            return (
              <div
                key={action}
                className={`p-4 rounded text-center font-medium capitalize ${
                  hasAccess
                    ? 'bg-green-50 text-green-700 border-2 border-green-200'
                    : 'bg-gray-50 text-gray-400 border-2 border-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">{hasAccess ? '✅' : '🚫'}</div>
                {action}
              </div>
            );
          })}
        </div>
      </div>

      {/* Role Info */}
      <div className="card bg-blue-50 border-l-4 border-blue-500">
        <h3 className="font-bold mb-2">Role Information</h3>
        <ul className="text-sm space-y-2">
          {user.role === 'admin' && (
            <li>👑 <strong>Admin</strong> - Full access to all features and user management</li>
          )}
          {user.role === 'editor' && (
            <li>✏️ <strong>Editor</strong> - Can create, read, and update resources</li>
          )}
          {user.role === 'viewer' && (
            <li>👁️ <strong>Viewer</strong> - Can only view resources (read-only access)</li>
          )}
        </ul>
      </div>
    </div>
  );
}
