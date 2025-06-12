import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [userId, setUserId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id && id !== 'null' && id !== 'undefined' && id.trim() !== '') {
      setUserId(id);
    }
    setLoaded(true);
  }, []);

  const handleLogin = () => {
    const id = localStorage.getItem('userId');
    setUserId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  if (!loaded) return null;

  return (
    <div className="App">
      <h1>Welcome to the Learning App</h1>
      {userId === 'admin' ? (
        <AdminDashboard />
      ) : !userId ? (
        <WelcomeScreen onLogin={handleLogin} />
      ) : (
        <Home onLogout={handleLogout} />
      )}
    </div>
  );

}

export default App;