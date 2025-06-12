export async function getCompletion(question) {
  const response = await fetch('http://localhost:7066/api/OpenAI/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question })
  });

  if (!response.ok) {
    throw new Error('Failed to get completion from API');
  }

  const data = await response.json();
  return data.response;
}
