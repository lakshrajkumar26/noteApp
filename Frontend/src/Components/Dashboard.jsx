

import React, { useEffect } from 'react';
import './Dashboard.css';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
  const { user, logout } = useAuth0();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <header className="dashboard-header">
          <div className="logo">🌐 Dashboard</div>
          
          {/* <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout({
                logoutParams: {
                  returnTo: `${window.location.origin}/home`,
                },
              });
            }}
            className="signout-link"
          >
            Sign Out
          </a> */}
          <button onClick={(e)=>logout()}>Sign out</button>
        </header>

        <div className="welcome-card">
          <h3>Welcome, {user?.name}</h3>
          <p>Email: {user?.email}</p>
        </div>

        <button className="create-note-btn">Create Note</button>

        <h4 className="notes-heading">Notes</h4>
        <div className="note-card">
          <span>Note 1</span>
          <button className="delete-btn">🗑️</button>
        </div>
        <div className="note-card">
          <span>Note 2</span>
          <button className="delete-btn">🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
