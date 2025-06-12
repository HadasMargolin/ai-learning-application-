import React, { useState } from 'react';
import api from '../services/api';
import CategorySelector from './CategorySelector';

const PromptForm = ({ onPromptSent }) => {
  const [selection, setSelection] = useState({ categoryId: '', subCategoryId: '' });
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = 1; // קבוע זמנית

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt || !selection.categoryId || !selection.subCategoryId) return;

    setLoading(true);
    try {
      const fullPrompt = `Topic: ${selection.categoryId} - ${selection.subCategoryId}. Question: ${prompt}`;

      const res = await api.post('/api/prompts', {
        userId,
        categoryId: parseInt(selection.categoryId),
        subCategoryId: parseInt(selection.subCategoryId),
        question: prompt,
        response: '' // AI ייצור אותו
      });

      setResponse(res.data.response || 'Response saved.');
      setPrompt(''); // נקה את שדה השאלה!
      if (onPromptSent) onPromptSent();
    } catch (err) {
      setResponse('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt-form">
      <form onSubmit={handleSubmit}>
        <CategorySelector onChange={setSelection} />

        <label>Ask your question:</label>
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
      {response && <p><strong>AI Response:</strong> {response}</p>}
    </div>
  );
};

export default PromptForm;
