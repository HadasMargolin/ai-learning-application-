import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("🎯 Admin Dashboard Loaded"); // בדיקת טעינה

        const fetchUsers = async () => {
            try {
                const response = await api.get('/api/users');
                setUsers(response.data);
            } catch (err) {
                console.error('❌ Failed to load users:', err);
            }
        };

        fetchUsers();
    }, []);

    return (

        <div>
            <button
                onClick={() => {
                    localStorage.removeItem('userId');
                    window.location.reload();
                }}
                style={{
                    marginBottom: '20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
            >
                🔁 Logout / Switch User
            </button>
            <h2>Admin Dashboard</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div>
                    {users.map((user) => (
                        <div key={user.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                            <h3>{user.name} ({user.phone})</h3>
                            <h4>Prompts:</h4>
                            {user.prompts && user.prompts.length > 0 ? (
                                <ul>
                                    {user.prompts.map((prompt) => (
                                        <li key={prompt.id}>
                                            <strong>Prompt:</strong> {prompt.prompt}<br />
                                            <strong>Response:</strong> {prompt.response || <em>No response</em>}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No prompts.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
