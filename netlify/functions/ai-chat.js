// Netlify Function for AI Chat API
export default async function handler(event, context) {
  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const n8nWebhookUrl = 'https://yjw123456.app.n8n.cloud/webhook/ai-chat';
    const requestBody = JSON.parse(event.body);
    
    console.log('代理请求到n8n:', requestBody);
    
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('n8n服务错误:', response.status, errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'n8n服务错误',
          status: response.status,
          details: errorText
        })
      };
    }

    const data = await response.json();
    console.log('n8n返回数据:', data);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('API代理错误:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: '内部服务器错误',
        message: error.message 
      })
    };
  }
}