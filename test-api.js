// 测试API代理是否正常工作
const testApiProxy = async () => {
  try {
    console.log('测试API代理连接...')
    
    const testData = {
      input: '测试连接',
      timestamp: new Date().toISOString(),
      sessionId: 'test-' + Date.now()
    }
    
    const response = await fetch('http://localhost:3000/api/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })
    
    console.log('响应状态:', response.status)
    console.log('响应状态文本:', response.statusText)
    
    if (response.ok) {
      const data = await response.json()
      console.log('响应数据:', data)
      console.log('✅ API代理工作正常')
    } else {
      const errorText = await response.text()
      console.log('❌ API代理错误:', errorText)
    }
  } catch (error) {
    console.log('❌ 连接失败:', error.message)
  }
}

// 运行测试
testApiProxy()