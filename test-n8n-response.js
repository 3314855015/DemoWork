// 测试n8n工作流响应格式
const testN8nResponse = async () => {
  console.log('测试n8n工作流响应格式...\n')
  
  const testData = {
    input: '测试消息',
    timestamp: new Date().toISOString(),
    sessionId: 'test-' + Date.now()
  }
  
  try {
    // 直接测试n8n webhook（绕过代理）
    const response = await fetch('https://yjw123456.app.n8n.cloud/webhook/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })
    
    console.log('HTTP状态码:', response.status)
    console.log('内容类型:', response.headers.get('content-type'))
    
    const responseText = await response.text()
    console.log('响应内容:', responseText.substring(0, 500))
    
    // 尝试解析JSON
    try {
      const jsonData = JSON.parse(responseText)
      console.log('\n✅ JSON解析成功:')
      console.log(JSON.stringify(jsonData, null, 2))
    } catch (jsonError) {
      console.log('\n❌ JSON解析失败:', jsonError.message)
      console.log('响应可能包含HTML错误页面或无效JSON')
    }
    
  } catch (error) {
    console.log('❌ 请求失败:', error.message)
  }
}

// 运行测试
testN8nResponse()