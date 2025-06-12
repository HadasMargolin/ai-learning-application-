import React, { useState } from 'react';
import api from '../services/api';

const UserRegister = ({ onRegistered }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !phone) {
            setError('Please fill in all fields');
            return;
        }

        try {
            // נסה למצוא משתמש קיים
            const findRes = await api.post('/api/users/find', { name, phone });

            if (findRes.status === 200) {
                localStorage.setItem('userId', findRes.data.id);
                onRegistered();
                return;
            }
        } catch {
            // אם לא קיים, ניצור חדש
            try {
                const res = await api.post('/api/users', { name, phone });
                localStorage.setItem('userId', res.data.id);
                onRegistered();
            } catch {
                setError('Registration failed.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>Phone:</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default UserRegister;
