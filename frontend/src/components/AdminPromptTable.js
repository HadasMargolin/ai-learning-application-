import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPromptTable = () => {
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/Prompts/all`)
            .then(res => {
                console.log('Fetched prompts:', res.data);
                setPrompts(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch prompts', err);
                setIsLoading(false);
            });
    }, []);

    const filteredPrompts = prompts.filter(prompt =>
        (prompt.user?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (prompt.question?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h2>All Prompts</h2>

            <input
                type="text"
                placeholder="Search by user name or question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: '8px',
                    marginBottom: '15px',
                    width: '60%',
                    borderRadius: '6px',
                    border: '1px solid #ccc'
                }}
            />

            {isLoading ? (
                <p>טוען נתונים...</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
                    <thead style={{ backgroundColor: '#f0f0f0' }}>
                        <tr>
                            <th>User Name</th>
                            <th>Category</th>
                            <th>SubCategory</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPrompts.length > 0 && filteredPrompts.map(prompt => (
                            <tr key={prompt.id}>
                                <td>{prompt.user?.name}</td>
                                <td>{prompt.category?.name}</td>
                                <td>{prompt.subCategory?.name}</td>
                                <td>{prompt.question}</td>
                                <td>{prompt.answer}</td>
                                <td>{new Date(prompt.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPromptTable;
