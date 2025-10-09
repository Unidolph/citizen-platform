/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      const res = await api.get('/projects', { headers: { Authorization: `Bearer ${token}` } });
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Project Management</h2>
      {projects.map((p: any) => (
        <div key={p._id} className="bg-gray-100 p-4 rounded-lg mb-3">
          <p><strong>{p.name}</strong> — Status: {p.status}</p>
          <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Update</button>
        </div>
      ))}
    </div>
  );
};
export default AdminDashboard;