import React, { useEffect, useState } from 'react';
import api from '../services/api';

const LearningHistory = () => {
    const [prompts, setPrompts] = useState([]);
    const userId = localStorage.getItem('userId');

    const fetchHistory = async () => {
        try {
            const res = await api.get(`/api/prompts/user/${userId}`);
            setPrompts(res.data.reverse());
        } catch {
            setPrompts([]);
        }
    };

    useEffect(() => {
        if (userId && userId !== 'admin') {
            fetchHistory();
        }
    }, [userId]);

    const handleClearHistory = async () => {
        if (!window.confirm('Are you sure you want to delete all your history?')) return;
        try {
            await api.delete(`/api/prompts/user/${userId}`);
            setPrompts([]);
        } catch {
            alert('Error deleting history');
        }
    };

    return (
        <div className="history" style={{ marginTop: '40px' }}>
            <h3>Learning History</h3>
            {prompts.length > 0 && (
                <button onClick={handleClearHistory} style={{ marginBottom: '20px' }}>🗑️ Clear History</button>
            )}
            {prompts.length === 0 ? (
                <p>No previous questions yet.</p>
            ) : (
                <ul>
                    {prompts.map((p, i) => (
                        <li key={i} style={{ marginBottom: '20px' }}>
                            <strong>Q:</strong> {p.question}<br />
                            <strong>A:</strong> {p.response || <em>No response</em>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LearningHistory;
