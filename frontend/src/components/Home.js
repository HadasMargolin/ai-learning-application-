import React from 'react';
import ChatBox from './ChatBox';
import LearningHistory from './LearningHistory';
import '../App.css';

const Home = ({ onLogout }) => {
  return (
    <div className="home-container">
      <div className="home-header">
        <button className="switch-btn" onClick={onLogout}>🔁 Switch User</button>
      </div>

      <div className="card-section">
        <ChatBox />
      </div>

      <div className="history-section">
        <LearningHistory />
      </div>
    </div>
  );
};

export default Home;
