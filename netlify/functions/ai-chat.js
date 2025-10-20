// Netlify Function for AI Chat API
export default async function handler(event, context) {
  // 处理 OPTIONS 预检请求 (CORS)
  if (event.httpMethod === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const n8nWebhookUrl = 'https://yjw123456.app.n8n.cloud/webhook/ai-chat';
    const requestBody = JSON.parse(event.body);
    
    console.log('开始代理请求到n8n:', new Date().toISOString());
    console.log('请求数据:', JSON.stringify(requestBody).substring(0, 200) + '...');
    
    // 设置超时控制 - 调整为60秒，避免平台限制
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('请求超时')), 60000); // 60秒超时
    });
    
    const startTime = Date.now();
    const fetchPromise = fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    // 使用 Promise.race 实现超时控制
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    const responseTime = Date.now() - startTime;
    
    console.log(`n8n响应时间: ${responseTime}ms`, new Date().toISOString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error('n8n服务错误:', response.status, errorText);
      return new Response(JSON.stringify({ 
        error: 'n8n服务错误',
        status: response.status,
        details: errorText,
        responseTime: responseTime
      }), {
        status: response.status,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const data = await response.json();
    console.log('n8n返回数据长度:', JSON.stringify(data).length);
    console.log('数据处理完成:', new Date().toISOString());
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error('API代理错误:', error);
    
    // 处理超时错误
    if (error.message === '请求超时') {
      return new Response(JSON.stringify({ 
        error: '请求超时',
        message: 'AI服务响应时间过长，请稍后重试'
      }), {
        status: 504,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    return new Response(JSON.stringify({ 
      error: '内部服务器错误',
      message: error.message 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}