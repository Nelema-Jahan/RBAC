import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { authAPI } from '../services/api';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await authAPI.login(username, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLoginSuccess(response.data.user);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password, role) => {
    setLoading(true);
    try {
      const response = await authAPI.register(username, email, password, role);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLoginSuccess(response.data.user);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="text-3xl font-bold text-gray-800">RBAC System</h1>
          <p className="text-gray-600 mt-2">Role-Based Access Control Dashboard</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 font-medium rounded transition ${
              isLogin
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 font-medium rounded transition ${
              !isLogin
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <LoginForm onSuccess={handleLogin} />
        ) : (
          <RegisterForm onSuccess={handleRegister} />
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded">
          <p className="text-sm font-medium mb-2">Demo Credentials:</p>
          <ul className="text-xs space-y-1 text-gray-700">
            <li>👑 Admin: alice / 1234</li>
            <li>✏️ Editor: bob / 5678</li>
            <li>👁️ Viewer: charlie / 0000</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
