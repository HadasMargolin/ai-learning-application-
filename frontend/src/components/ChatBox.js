import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ChatBox = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selection, setSelection] = useState({ categoryId: '', subCategoryId: '' });
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    api.get('/api/categories').then(res => setCategories(res.data));
    api.get('/api/subcategories').then(res => setSubCategories(res.data));
  }, []);

  const handleCategoryChange = (e) => {
    setSelection({ categoryId: e.target.value, subCategoryId: '' });
  };

  const handleSubCategoryChange = (e) => {
    setSelection(prev => ({ ...prev, subCategoryId: e.target.value }));
  };

  const filteredSubCategories = subCategories.filter(
    sc => sc.categoryId === parseInt(selection.categoryId)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt || !selection.categoryId || !selection.subCategoryId) {
      setResponse('Please complete all fields.');
      return;
    }

    setLoading(true);

    try {
      const selectedCat = categories.find(c => c.id === parseInt(selection.categoryId));
      const selectedSub = subCategories.find(sc => sc.id === parseInt(selection.subCategoryId));

      const fullPrompt = `The user selected:
- Category: ${selectedCat?.name}
- SubCategory: ${selectedSub?.name}

Question: ${prompt}

Please return a short and clear educational lesson based on this topic.`;

      const gptRes = await api.post('/api/openai/complete', {
        question: fullPrompt
      });

      const aiAnswer = gptRes.data.response;

      const saveRes = await api.post('/api/prompts', {
        userId,
        categoryId: parseInt(selection.categoryId),
        subCategoryId: parseInt(selection.subCategoryId),
        question: prompt,
        response: aiAnswer
      });

      console.log(saveRes.data); // בדיקה מה חזר מהשרת

      setResponse(aiAnswer);
      setPrompt('');
    } catch (err) {
      setResponse('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox">
      <form onSubmit={handleSubmit}>
        <h2>Ask the AI a Question</h2>

        <label>Category:</label>
        <select value={selection.categoryId} onChange={handleCategoryChange} required>
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <label>Subcategory:</label>
        <select value={selection.subCategoryId} onChange={handleSubCategoryChange} required>
          <option value="">Select a subcategory</option>
          {filteredSubCategories.map(sc => (
            <option key={sc.id} value={sc.id}>{sc.name}</option>
          ))}
        </select>

        <label>Question:</label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question..."
          required
        />

        <button type="submit" disabled={loading}>Send</button>
      </form>

      {loading && <p>Loading...</p>}
      {response && (
        <div className="response-box">
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
