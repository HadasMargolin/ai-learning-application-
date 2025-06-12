import React from 'react';
import ChatBox from './ChatBox';
import LearningHistory from './LearningHistory';

const Home = ({ onLogout }) => {
  return (
    <div className="home">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       
        <button onClick={onLogout} style={{ padding: '6px 12px' }}>🔁 Switch User</button>
      </div>

      <ChatBox />
      <LearningHistory />
    </div>
  );
};

export default Home;
