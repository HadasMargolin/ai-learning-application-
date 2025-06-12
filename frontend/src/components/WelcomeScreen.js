import React, { useState } from 'react';
import api from '../services/api';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onLogin }) => {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (!name || !phone) {
            setError('Please enter name and phone');
            return;
        }

        try {
            const res = await api.post('/api/users', { name, phone });
            localStorage.setItem('userId', res.data.id);
            onLogin();
        } catch {
            setError('Registration failed');
        }
    };

    const handleLogin = async () => {
        try {
            const res = await api.post('/api/users/find', { name, phone });
            localStorage.setItem('userId', res.data.id);
            onLogin();
        } catch {
            setError('Login failed');
        }
    };

    const handleAdminLogin = () => {
        if (password === 'admin123') {
            localStorage.setItem('userId', 'admin');
            window.location.reload();
        } else {
            setError('Incorrect admin password');
        }
    };

    return (
        <div className="dark-background">
            <div className="dark-card">
                <h2>Welcome to the Learning App</h2>

                {error && <p className="error-msg">{error}</p>}

                <div className="input-container">
                    <input
                        type="text"
                        placeholder="📱 Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="password"
                        placeholder="🔐 Password (admin only)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        placeholder="👤 Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="button-row">
                    <button className="btn login" onClick={handleLogin}>Login</button>
                    <button className="btn register" onClick={handleRegister}>Register</button>
                </div>

                <button className="btn admin" onClick={handleAdminLogin}>Login as Admin</button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
