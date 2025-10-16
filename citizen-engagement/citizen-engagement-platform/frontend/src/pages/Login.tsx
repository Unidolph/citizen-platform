import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [adminId, setAdminId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', {
        username,
        password,
        role,
        adminId: role === 'admin' ? adminId : undefined
      });
      login(res.data.token ?? '', res.data.user);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
      ) {
        setError((err as { response: { data: { message: string } } }).response.data.message);
      } else {
        setError('Login failed.');
      }
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full p-2 border"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="w-full p-2 border"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          className="w-full p-2 border"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {role === 'admin' && (
          <input
            className="w-full p-2 border"
            value={adminId}
            onChange={e => setAdminId(e.target.value)}
            placeholder="Admin ID"
            required
          />
        )}
        <button className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
      <div className="mt-4 text-center">
        <span>Don't have an account? </span>
        <button
          className="text-blue-600 underline"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}