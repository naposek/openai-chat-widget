
interface OpenAIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatSettings {
  apiKey: string;
  assistantId?: string;
  model?: string;
}

// Load settings from localStorage
export const loadChatSettings = (): ChatSettings => {
  const settingsString = localStorage.getItem("openai-chat-settings");
  if (settingsString) {
    try {
      return JSON.parse(settingsString);
    } catch (e) {
      console.error("Failed to parse chat settings", e);
    }
  }
  return { apiKey: "", model: "gpt-4o-mini" };
};

// Save settings to localStorage
export const saveChatSettings = (settings: ChatSettings): void => {
  localStorage.setItem("openai-chat-settings", JSON.stringify(settings));
};

// This service will handle communication with the OpenAI API directly from the browser
export const sendChatMessage = async (messages: OpenAIMessage[], settings: ChatSettings): Promise<string> => {
  try {
    if (!settings.apiKey) {
      throw new Error("OpenAI API key is required");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.apiKey}`,
      },
      body: JSON.stringify({
        model: settings.model || "gpt-4o-mini",
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `OpenAI API error (${response.status}): ${
          errorData?.error?.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
