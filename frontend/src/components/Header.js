import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <nav>
        {user ? (
          <>
            {user.role === 'Creator' && <Link to="/creator">Creator Dashboard</Link>}
            {user.role === 'Editor' && <Link to="/editor">Editor Dashboard</Link>}
            {user.role === 'Reader' && <Link to="/reader">Reader Dashboard</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
