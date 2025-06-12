// frontend/src/services/openaiService.js
import axios from 'axios';

const API_URL = 'https://localhost:7066/api/OpenAI/complete'; // ודאי שזו הכתובת הנכונה

export const getCompletion = async (question) => {
    //var json = JSON.stringify({ 'request': question })
    const response = await axios.post(API_URL, { question });
    return response.data.response;
};

