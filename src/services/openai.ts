
interface OpenAIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatCompletionResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

// This service will handle communication with your backend
// Replace the URL with your actual backend endpoint when deployed
export const sendChatMessage = async (messages: OpenAIMessage[]): Promise<string> => {
  try {
    // In a production environment, this should call your backend API
    // which securely handles the OpenAI API key
    const response = await fetch('https://YOUR_BACKEND_URL/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response');
    }

    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
