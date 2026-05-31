import React from 'react';

const roleColors = {
  admin: 'bg-red-100 text-red-800',
  editor: 'bg-blue-100 text-blue-800',
  viewer: 'bg-green-100 text-green-800',
};

const roleEmojis = {
  admin: '👑',
  editor: '✏️',
  viewer: '👁️',
};

export default function UserCard({ user, onDelete, onEditRole, isAdmin }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold">{user.username}</h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                roleColors[user.role]
              }`}
            >
              {roleEmojis[user.role]} {user.role}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2">{user.email}</p>
          <p className="text-gray-500 text-xs">
            Joined {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>

        {isAdmin && (
          <div className="flex gap-2">
            <select
              defaultValue={user.role}
              onChange={(e) => onEditRole(user.id, e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={() => onDelete(user.id)}
              className="btn btn-danger text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
