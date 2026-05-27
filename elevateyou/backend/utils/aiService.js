const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Image Analysis using Gemini 1.5 Flash
 */
async function analyzeImage(imageBase64, prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const base64Data = imageBase64.split(',')[1];
    const mimeType = imageBase64.split(',')[0].split(':')[1].split(';')[0];

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      }
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini Image Analysis Error:', error);
    throw error;
  }
}

/**
 * Text Analysis/Generation using Groq (Llama 3 70b)
 */
async function generateText(prompt, systemPrompt = '', history = []) {
  try {
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    
    // Add history (ensure it's in the correct format)
    if (history && history.length > 0) {
      messages.push(...history.slice(-10)); // Keep last 10 messages for context
    }
    
    messages.push({ role: 'user', content: prompt });

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2048,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Groq Generation Error:', error);
    throw error;
  }
}

/**
 * JSON extraction helper
 */
function extractJSON(text) {
  try {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) return JSON.parse(match[1].trim());
    return JSON.parse(text.trim());
  } catch (e) {
    console.error('JSON Extraction Error:', e);
    // If it's still not JSON, try one last desperation fix
    try {
        const cleaned = text.trim().replace(/^[^[{]*/, '').replace(/[^\]}]*$/, '');
        return JSON.parse(cleaned);
    } catch (e2) {
        throw new Error('Failed to parse AI response as JSON');
    }
  }
}

module.exports = { analyzeImage, generateText, extractJSON };
