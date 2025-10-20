// Netlify function for AI chat API
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const { input, sessionId } = JSON.parse(event.body);
    
    if (!input) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Input is required' })
      };
    }

    // Call the n8n webhook
    const n8nResponse = await fetch('https://yjw123456.app.n8n.cloud/webhook/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: input,
        sessionId: sessionId || Date.now().toString(),
        timestamp: new Date().toISOString()
      }),
      timeout: 10000 // 10 second timeout
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n API error: ${n8nResponse.status}`);
    }

    const n8nData = await n8nResponse.json();
    
    // Return the response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        response: n8nData.response || n8nData.output || n8nData.message || '收到您的消息，正在思考中...',
        sessionId: n8nData.sessionId
      })
    };

  } catch (error) {
    console.error('Error in AI chat function:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};