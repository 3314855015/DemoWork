// API代理服务 - 用于开发环境测试
// 在开发环境中，这个文件不会被Vite直接使用，而是通过代理配置
// 这个文件仅用于参考和生产环境部署

// 开发环境应该使用Vite的代理配置，而不是这个文件
// 如果出现500错误，请检查Vite代理配置是否正确工作

// 生产环境部署时使用的API处理函数
export default async function handler(request) {
  try {
    const n8nWebhookUrl = 'https://yjw123456.app.n8n.cloud/webhook/ai-chat'
    
    console.log('代理请求到n8n:', request.body)
    
    // 设置超时控制
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('请求超时')), 170000); // 170秒超时
    });
    
    const fetchPromise = fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body)
    })

    // 使用 Promise.race 实现超时控制
    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      const errorText = await response.text()
      console.error('n8n服务错误:', response.status, errorText)
      return new Response(JSON.stringify({ 
        error: 'n8n服务错误',
        status: response.status,
        details: errorText
      }), { status: response.status })
    }

    const data = await response.json()
    console.log('n8n返回数据:', data)
    
    return new Response(JSON.stringify(data), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('API代理错误:', error)
    
    // 处理超时错误
    if (error.message === '请求超时') {
      return new Response(JSON.stringify({ 
        error: '请求超时',
        message: 'AI服务响应时间过长，请稍后重试'
      }), { status: 504 })
    }
    
    return new Response(JSON.stringify({ 
      error: '内部服务器错误',
      message: error.message 
    }), { status: 500 })
  }
}