import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">Citizen Engagement</h1>
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        {user ? (
          <button onClick={logout} className="bg-white text-blue-600 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
