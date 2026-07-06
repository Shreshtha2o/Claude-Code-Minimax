const axios = require('axios');

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = process.env.CLAUDE_API_KEY;

if (!API_KEY) {
  console.warn('⚠️  CLAUDE_API_KEY not found in environment variables');
}

/**
 * Call Claude API with given prompt
 */
async function callClaude(messages, maxTokens = 2000, temperature = 0.7) {
  try {
    const isOpenRouter = API_KEY && API_KEY.startsWith('sk-or-');

    if (isOpenRouter) {
      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: 'anthropic/claude-sonnet-5',
          max_tokens: maxTokens,
          temperature: temperature,
          messages: messages
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'content-type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } else {
      const response = await axios.post(
        CLAUDE_API_URL,
        {
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: maxTokens,
          temperature: temperature,
          messages: messages
        },
        {
          headers: {
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
          }
        }
      );

      return response.data.content[0].text;
    }
  } catch (error) {
    console.error('Claude API Error:', error.response?.data || error.message);
    throw new Error(
      `Claude API Error: ${error.response?.data?.error?.message || error.message}`
    );
  }
}

module.exports = {
  callClaude
};

