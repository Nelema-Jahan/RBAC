import React, { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';
import UserCard from '../components/UserCard';

export default function Users({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersAPI.delete(userId);
        setUsers(users.filter(u => u.id !== userId));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete user');
      }
    }
  };

  const handleEditRole = async (userId, newRole) => {
    try {
      await usersAPI.update(userId, { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update user');
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="card bg-red-50 border-l-4 border-red-500">
        <p className="text-red-700 font-medium">Access Denied</p>
        <p className="text-red-600 text-sm">Only admins can manage users</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-2xl font-bold mb-2">User Management</h2>
        <p className="text-gray-600">Total Users: <span className="font-bold">{users.length}</span></p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="card text-center">
          <p className="text-gray-500">Loading users...</p>
        </div>
      ) : users.length > 0 ? (
        <div className="grid gap-4">
          {users.map(u => (
            <UserCard
              key={u.id}
              user={u}
              onDelete={handleDelete}
              onEditRole={handleEditRole}
              isAdmin={user.role === 'admin'}
            />
          ))}
        </div>
      ) : (
        <div className="card text-center text-gray-500">
          No users found
        </div>
      )}
    </div>
  );
}
