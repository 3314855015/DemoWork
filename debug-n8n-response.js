// 详细调试n8n工作流响应
const debugN8nResponse = async () => {
  console.log('详细调试n8n工作流响应...\n')
  
  const testData = {
    input: '测试消息',
    timestamp: new Date().toISOString(),
    sessionId: 'test-' + Date.now()
  }
  
  try {
    const response = await fetch('https://yjw123456.app.n8n.cloud/webhook/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })
    
    console.log('=== HTTP响应信息 ===')
    console.log('状态码:', response.status)
    console.log('状态文本:', response.statusText)
    console.log('内容类型:', response.headers.get('content-type'))
    console.log('内容长度:', response.headers.get('content-length'))
    console.log('')
    
    // 获取原始响应文本
    const responseText = await response.text()
    console.log('=== 原始响应内容 ===')
    console.log('响应长度:', responseText.length)
    console.log('响应内容 (前1000字符):')
    console.log(responseText.substring(0, 1000))
    console.log('')
    
    if (responseText.length === 0) {
      console.log('❌ 响应内容为空 - n8n可能没有返回任何数据')
      console.log('可能的原因:')
      console.log('1. Respond to Webhook节点未正确配置')
      console.log('2. 工作流没有连接到Respond to Webhook节点')
      console.log('3. Respond to Webhook节点的responseData为空')
    } else {
      // 尝试逐字符分析
      console.log('=== 响应内容分析 ===')
      console.log('第一个字符:', JSON.stringify(responseText[0]))
      console.log('最后一个字符:', JSON.stringify(responseText[responseText.length - 1]))
      console.log('')
      
      // 检查是否是有效的JSON
      try {
        const jsonData = JSON.parse(responseText)
        console.log('✅ JSON解析成功:')
        console.log(JSON.stringify(jsonData, null, 2))
      } catch (jsonError) {
        console.log('❌ JSON解析失败:', jsonError.message)
        
        // 检查是否是HTML错误页面
        if (responseText.includes('<!DOCTYPE') || responseText.includes('<html')) {
          console.log('⚠️ 响应包含HTML内容 - 可能是错误页面')
        }
        
        // 检查是否是n8n特定的错误信息
        if (responseText.includes('n8n') || responseText.includes('webhook')) {
          console.log('⚠️ 响应包含n8n相关关键词')
        }
      }
    }
    
  } catch (error) {
    console.log('❌ 请求失败:', error.message)
  }
}

// 运行调试
debugN8nResponse()