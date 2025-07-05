import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useAuth0 } from '@auth0/auth0-react';
import { authApi, notesApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/logo.png'; // Use your logo here

const maskEmail = (email) => {
  if (!email) return '';
  const [name, domain] = email.split('@');
  return (
    (name ? 'x'.repeat(Math.min(6, name.length)) : '') +
    '@' +
    (domain ? 'x'.repeat(Math.min(4, domain.length)) + domain.slice(-4) : '')
  );
};

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: ''
  });

  // Helper to get email and name for note requests
  const getUserInfo = () => {
    if (isAuthenticated && user) {
      return { email: user.email, name: user.name };
    }
    if (sessionUser) {
      return { email: sessionUser.email, name: sessionUser.name };
    }
    return {};
  };

  useEffect(() => {
    fetchDashboardData();
    fetchNotes();
    // eslint-disable-next-line
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const response = await authApi.dashboard();
      setDashboardData(response.data);
      // Try to get session user info from dashboard response if available
      if (response.data && response.data.user) {
        setSessionUser(response.data.user);
      } else {
        // Optionally, fetch session user info from a dedicated endpoint if needed
        // setSessionUser(null);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load dashboard');
    }
  };

  const fetchNotes = async () => {
    try {
      const info = getUserInfo();
      const response = await notesApi.getUserNotes(info.email);
      setNotes(response.data.notes);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load notes');
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      logout();
      navigate('/');
    } catch (error) {
      logout();
      navigate('/');
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) {
      setMessage('Please fill in both title and content');
      return;
    }
    try {
      const info = getUserInfo();
      await notesApi.createNote({ ...newNote, ...info });
      setNewNote({ title: '', content: '' });
      setShowCreateForm(false);
      setMessage('Note created successfully!');
      fetchNotes();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create note');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const info = getUserInfo();
      await notesApi.deleteNote(noteId, info.email);
      setMessage('Note deleted successfully!');
      fetchNotes();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete note');
    }
  };

  const handleInputChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  // Get display name and email for welcome card
  const displayName = isAuthenticated && user ? user.name : sessionUser?.name;
  const displayEmail = isAuthenticated && user ? user.email : sessionUser?.email;

  return (
    <div className="dashboard-mobile-root">
      <header className="dashboard-header-mobile">
        <img src={logo} alt="Logo" className="dashboard-logo-mobile" />
        <span className="dashboard-title-mobile">Dashboard</span>
        <button className="signout-link-mobile" onClick={handleLogout}>Sign Out</button>
      </header>

      <div className="welcome-card-mobile">
        <h3>Welcome, {displayName || 'User'} !</h3>
        <div className="dashboard-user-info-mobile">
          <div className="dashboard-user-name-mobile">{displayName}</div>
          <div className="dashboard-user-email-mobile">{displayEmail}</div>
        </div>
        {dashboardData && <p style={{display:'none'}}>{dashboardData.message}</p>}
      </div>

      <button 
        className="create-note-btn-mobile" 
        onClick={() => setShowCreateForm(!showCreateForm)}
      >
        {showCreateForm ? 'Cancel' : 'Create Note'}
      </button>

      {showCreateForm && (
        <div className="create-note-form-mobile">
          <form onSubmit={handleCreateNote}>
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              value={newNote.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="content"
              placeholder="Note Content"
              value={newNote.content}
              onChange={handleInputChange}
              required
              rows="4"
            />
            <button type="submit" className="submit-note-btn-mobile">Create Note</button>
          </form>
        </div>
      )}

      <h4 className="notes-heading-mobile">Notes</h4>
      {notes.length === 0 ? (
        <p style={{textAlign: 'center', color: '#666'}}>No notes yet. Create your first note!</p>
      ) : (
        notes.map((note) => (
          <div key={note._id} className="note-card-mobile">
            <span className="note-title-mobile">{note.title}</span>
            <button 
              className="delete-btn-mobile" 
              onClick={() => handleDeleteNote(note._id)}
            >
              <img src="/image.png" alt="Delete" className="delete-icon-mobile" />
            </button>
          </div>
        ))
      )}

      {/* Only show error/success messages for non-Auth0 logins */}
      {!isAuthenticated && message && (
        <div className="dashboard-message-mobile" style={{color: message.includes('success') ? 'green' : 'red'}}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
