import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [adminId, setAdminId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await api.post('/auth/signup', {
        username,
        password,
        role,
        adminId: role === 'admin' ? adminId : undefined
      });
      setMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
      ) {
        setError((err as { response: { data: { message: string } } }).response.data.message);
      } else {
        setError('Account already exists or registration failed.');
      }
      setTimeout(() => navigate('/login'), 2000);
      console.error('Registration failed', err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
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
        <button className="w-full py-2 bg-green-600 text-white rounded">Create account</button>
        {message && <div className="text-green-600 mt-2">{message}</div>}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}