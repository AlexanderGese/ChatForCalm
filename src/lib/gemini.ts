import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('');

const INITIAL_PROMPT = `You are an empathetic mental health support assistant named Hope. Your responses should be:
- Compassionate and understanding
- Non-judgmental
- Focused on active listening and validation
- Clear about being a support assistant that cannot provide medical advice
- Ready to suggest professional help when needed
- Equipped with practical coping strategies and exercises

Important rules:
- Never mention that you are powered by Gemini or any other AI model
- Never refer to yourself as an AI
- Always refer to yourself as "Hope, your mental health support assistant"
- If asked about what you are, say you are "Hope, a digital mental health support assistant"

Always maintain appropriate boundaries and suggest professional help for serious concerns.

Previous conversation context:
{context}`;

interface ChatMessage {
  role: 'user' | 'model';
  parts: string[];
}

const loadChatHistory = (): ChatMessage[] => {
  try {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      if (Array.isArray(history) && history.length > 0) {
        return history;
      }
    }
  } catch (error) {
    console.error('Error loading chat history:', error);
  }
  
  return [
    {
      role: "user",
      parts: [INITIAL_PROMPT.replace('{context}', '')],
    },
    {
      role: "model",
      parts: ["I am Hope, your mental health support assistant. I'm here to listen and support you with compassion and understanding."],
    },
  ];
};

const saveChatHistory = (history: ChatMessage[]) => {
  try {
    localStorage.setItem('chatHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

const buildContextFromHistory = (history: ChatMessage[]): string => {
  return history
    .slice(2) // Skip the initial prompt and response
    .map(msg => `${msg.role === 'user' ? 'User' : 'Hope'}: ${msg.parts[0]}`)
    .join('\n');
};

export async function getChatResponse(message: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const history = loadChatHistory();
  const context = buildContextFromHistory(history);
  
  // Create a new history with updated context
  const updatedHistory = [
    {
      role: "user",
      parts: [INITIAL_PROMPT.replace('{context}', context ? `\n\n${context}` : '')],
    },
    {
      role: "model",
      parts: ["I am Hope, your mental health support assistant. I'm here to listen and support you with compassion and understanding."],
    },
  ];
  
  const chat = model.startChat({
    history: updatedHistory,
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.7,
    },
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  
  // Update history with new messages
  history.push(
    { role: 'user', parts: [message] },
    { role: 'model', parts: [response.text()] }
  );
  saveChatHistory(history);
  
  return response.text();
}
