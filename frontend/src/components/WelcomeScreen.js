import React, { useState } from 'react';
import api from '../services/api';
import './WelcomeScreen.css'; // ודא שקובץ זה קיים

const WelcomeScreen = ({ onLogin }) => {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!name || !phone) {
            setError("Please enter name and phone");
            return;
        }

        try {
            const res = await api.post('/api/users', { name, phone });
            localStorage.setItem('userId', res.data.id);
            onLogin();
        } catch {
            setError("Registration failed");
        }
    };

    const handleLogin = async () => {
        try {
            const res = await api.post('/api/users/find', { name, phone });
            localStorage.setItem('userId', res.data.id);
            onLogin();
        } catch {
            setError("Login failed");
        }
    };

    const handleAdminLogin = () => {
        localStorage.setItem("userId", "admin");
        window.location.reload();
    };

    return (
        <div className="welcome-container">
            <h2>Welcome to the Learning App</h2>

            {error && <p className="error-msg">{error}</p>}

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="input-field"
                />
                <span className="input-icon">📱</span>
            </div>
            <div className="input-container">
                <input
                    type="password"
                    placeholder="Password (admin only)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-field"
                />
                <span className="input-icon">🔒</span>
            </div>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="input-field"
                />
                <span className="input-icon">👤</span>
            </div>

            <div className="btn-container">
                <button onClick={handleRegister} className="btn blue">Register</button>
                <button onClick={handleLogin} className="btn dark">Login</button>
            </div>

            <button
                onClick={handleAdminLogin}
                style={{
                    marginTop: '15px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={e => e.target.style.backgroundColor = '#007bff'}
            >
                Login as Admin
            </button>
        </div>
    );
};

export default WelcomeScreen;
