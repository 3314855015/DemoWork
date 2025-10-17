<template>
  <div class="ai-chat">
    <!-- 页面头部 -->
    <div class="chat-header">
      <h1>AI历史人物聊天机器人</h1>
      <p class="subtitle">输入历史人物名，与AI进行智能对话</p>
    </div>

    <!-- 聊天容器 -->
    <div class="chat-container">
      <!-- 聊天区域 -->
      <div class="chat-area">
        <div class="messages-container" ref="messagesContainer">
          <div 
            v-for="message in messages" 
            :key="message.id"
            class="message"
            :class="{ 'user-message': message.isUser, 'ai-message': !message.isUser }"
            :ref="(el) => { if (el) messageRefs[message.id] = el }"
          >
            <div class="message-avatar">
              {{ message.isUser ? '👤' : '🤖' }}
            </div>
            <div class="message-content">
              <div v-if="message.isUser" class="message-text">{{ message.text }}</div>
              <HistoryPersonRenderer v-else :content="message.text" class="message-text" />
              <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="input-area">
          <div class="input-container">
            <input
              v-model="inputText"
              type="text"
              placeholder="请输入历史人物名和您的问题"
              @keyup.enter="sendMessage"
            />
            <button 
              @click="sendMessage"
              :disabled="!inputText.trim()"
              class="send-button"
            >
              发送
            </button>
          </div>
          <p class="hint">提示：输入格式为"人物名，问题内容"，例如"秦始皇，统一六国的意义是什么？"</p>
        </div>
      </div>
    </div>

    <!-- 连接状态 -->
    <div class="connection-status" :class="{ connected: isConnected }">
      <span class="status-dot"></span>
      {{ isConnected ? '已连接到AI服务' : '正在连接AI服务...' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import HistoryPersonRenderer from '../components/HistoryPersonRenderer.vue'

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const messages = ref<ChatMessage[]>([])
const inputText = ref('')
const isConnected = ref(false)
const lastCheckTime = ref<number>(0)
const sessionId = ref<string>('')
const messagesContainer = ref<HTMLElement>()
const messageRefs = ref<Record<string, HTMLElement>>({})

// 自动滚动到最新消息
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

// 发送消息
const sendMessage = async () => {
  if (!inputText.value.trim()) return

  const userMessage: ChatMessage = {
    id: Date.now().toString(),
    text: inputText.value,
    isUser: true,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  const userInput = inputText.value
  inputText.value = ''

  // 用户发送消息后立即滚动到底部
  await scrollToBottom()

  try {
    // 调用实际的n8n服务
    const response = await callN8nService(userInput)
    
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date()
    }

    messages.value.push(aiMessage)
    
    // AI回复后再次滚动到底部
    await scrollToBottom()
  } catch (error) {
    console.error('发送消息失败:', error)
    const errorMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: '抱歉，暂时无法连接到AI服务，请稍后再试。',
      isUser: false,
      timestamp: new Date()
    }
    messages.value.push(errorMessage)
    
    // 错误消息后也滚动到底部
    await scrollToBottom()
  }
}

// 调用本地API代理服务（解决跨域问题）
const callN8nService = async (userInput: string): Promise<string> => {
  try {
    // 使用本地API代理端点，避免跨域问题
    const localApiUrl = '/api/ai-chat'
    
    console.log('通过本地API代理发送请求:', { message: userInput })
    
    const response = await fetch(localApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: userInput,
        timestamp: new Date().toISOString(),
        sessionId: sessionId.value || Date.now().toString()
      })
    })

    console.log('本地API响应状态:', response.status, response.statusText)
    
    if (!response.ok) {
      // 尝试获取错误详情
      let errorDetail = ''
      try {
        const errorData = await response.text()
        errorDetail = errorData
      } catch (e) {
        errorDetail = '无法读取错误详情'
      }
      throw new Error(`API错误! 状态: ${response.status}, 详情: ${errorDetail}`)
    }

    // 检查响应内容类型
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text()
      console.warn('非JSON响应:', textResponse.substring(0, 200))
      throw new Error('服务器返回了非JSON格式的响应')
    }

    const data = await response.json()
    console.log('API返回数据:', data)
    
    // 处理n8n返回的[object Object]问题
    let responseText = data.response || data.output || data.message || data.answer || data.text || data.content || data.result
    
    // 如果返回的是对象而不是字符串，尝试转换为字符串
    if (typeof responseText === 'object' && responseText !== null) {
      try {
        responseText = JSON.stringify(responseText)
      } catch (e) {
        responseText = 'AI回复内容格式异常'
      }
    }
    
    // 如果n8n返回了有效的sessionId，更新本地sessionId
    if (data.sessionId && data.sessionId !== sessionId.value) {
      sessionId.value = data.sessionId
      console.log('更新sessionId:', sessionId.value)
    }
    
    return responseText || '收到您的消息，正在思考中...'
  } catch (error) {
    console.error('调用AI服务失败:', error)
    if (error instanceof Error) {
      throw new Error(`AI服务响应格式错误: ${error.message}`)
    } else {
      throw new Error('AI服务响应格式错误: 未知错误')
    }
  }
}

// 格式化时间
const formatTime = (timestamp: Date): string => {
  return timestamp.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// 检查本地API服务连接状态（优化版，减少频繁检查）
const checkN8nConnection = async () => {
  try {
    const localApiUrl = '/api/ai-chat'
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 缩短超时时间
    
    // 使用轻量级测试数据
    const response = await fetch(localApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: 'ping',
        timestamp: new Date().toISOString(),
        sessionId: sessionId.value || 'connection-check'
      }),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    isConnected.value = response.ok
    lastCheckTime.value = Date.now()
    
    if (response.ok) {
      console.log('✅ API服务连接正常')
      
      // 尝试获取响应数据以更新sessionId
      try {
        const data = await response.json()
        if (data.sessionId && data.sessionId !== sessionId.value) {
          sessionId.value = data.sessionId
          console.log('连接检查中更新sessionId:', sessionId.value)
        }
      } catch (e) {
        // 忽略JSON解析错误，连接状态检查是主要的
      }
    }
  } catch (error) {
    // 区分超时错误和其他错误
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('API连接检查超时')
    } else {
      console.error('API服务连接检查失败:', error)
    }
    isConnected.value = false
    lastCheckTime.value = Date.now()
  }
}

// 组件挂载时检查连接状态
onMounted(() => {
  // 页面加载时滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  // 添加欢迎消息
  messages.value.push({
    id: Date.now().toString(),
    text: '欢迎使用AI历史人物聊天机器人！请输入历史人物名和您的问题，例如："孔子，什么是仁？"',
    isUser: false,
    timestamp: new Date()
  })
  
  // 延迟滚动到底部显示欢迎消息
  setTimeout(() => {
    scrollToBottom()
  }, 100)
  
  // 延迟检查连接状态，避免页面加载时立即检查
  setTimeout(() => {
    checkN8nConnection()
  }, 1000)
  
  // 连接检查逻辑 - 使用固定间隔，避免频繁检查
  const checkInterval = 60000 // 60秒检查一次
  
  const interval = setInterval(() => {
    // 只有在未连接状态或长时间未检查时才进行检查
    if (!isConnected.value || Date.now() - lastCheckTime.value > 120000) {
      checkN8nConnection()
    }
  }, checkInterval)
  
  // 组件卸载时清除定时器
  return () => clearInterval(interval)
})

// 监听路由变化，确保页面切换时滚动到顶部
import { useRouter } from 'vue-router'

const router = useRouter()

router.afterEach((to, from) => {
  if (to.name === 'AIChat') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>

<style scoped>
.ai-chat {
  min-height: 100vh;
  padding: 2rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
}

.chat-header {
  text-align: center;
  margin-bottom: 3rem;
}

.chat-header h1 {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #4a5568;
  font-weight: 500;
}

.chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}



.chat-area {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  height: 600px;
}

.messages-container {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message {
  display: flex;
  gap: 1rem;
  max-width: 80%;
}

.message.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message.ai-message {
  align-self: flex-start;
}

.message-avatar {
  font-size: 2rem;
  flex-shrink: 0;
}

.message-content {
  background: #f7fafc;
  padding: 1rem 1.5rem;
  border-radius: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.user-message .message-content {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.message-text {
  margin: 0;
  line-height: 1.7;
}

.ai-message .message-text {
  font-size: 0.95rem;
}

/* 历史人物信息渲染器样式 */
.ai-message .message-text :deep(.section-title) {
  font-size: 1.3em;
  font-weight: 700;
  margin: 0.8em 0 0.4em 0;
  color: #2d3748;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.3em;
  text-align: center;
}

.ai-message .message-text :deep(.subsection-title) {
  font-size: 1.15em;
  font-weight: 600;
  margin: 1em 0 0.4em 0;
  color: #4a5568;
  border-left: 3px solid #764ba2;
  padding-left: 0.8em;
}

.ai-message .message-text :deep(.info-row) {
  display: flex;
  margin: 0.5em 0;
  padding: 0.6em;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
  border-left: 3px solid #667eea;
}

.ai-message .message-text :deep(.info-label) {
  font-weight: 600;
  color: #4a5568;
  min-width: 80px;
  margin-right: 1em;
}

.ai-message .message-text :deep(.info-value) {
  color: #2d3748;
  flex: 1;
}

.ai-message .message-text :deep(.list-item) {
  margin: 0.4em 0;
  padding: 0.3em 0;
  line-height: 1.6;
}

.ai-message .message-text :deep(.list-number) {
  font-weight: 600;
  color: #667eea;
  margin-right: 0.5em;
}

.ai-message .message-text :deep(.quote) {
  background: rgba(118, 75, 162, 0.05);
  border-left: 3px solid #764ba2;
  padding: 0.8em 1em;
  margin: 1em 0;
  border-radius: 4px;
  font-style: italic;
  color: #4a5568;
}

.ai-message .message-text :deep(strong) {
  font-weight: 600;
  color: #2d3748;
  background: linear-gradient(120deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ai-message .message-text :deep(em) {
  font-style: italic;
  color: #718096;
}

.message-time {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.5rem;
}

.input-area {
  padding: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.input-container {
  display: flex;
  gap: 1rem;
}

.input-container input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-container input:focus {
  border-color: #667eea;
}

.input-container input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hint {
  text-align: center;
  color: #718096;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.connection-status {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e53e3e;
  animation: pulse 2s infinite;
}

.connection-status.connected .status-dot {
  background: #38a169;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 深色主题适配 */
.dark-theme .ai-chat {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

.dark-theme .chat-area {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark-theme .message-content {
  background: #2d3748;
  color: #f1f5f9;
}

.dark-theme .user-message .message-content {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
}

.dark-theme .input-container input {
  background: #2d3748;
  border-color: #4a5568;
  color: #f1f5f9;
}

.dark-theme .input-container input:focus {
  border-color: #818cf8;
}

.dark-theme .connection-status {
  background: rgba(30, 41, 59, 0.9);
  color: #f1f5f9;
}

/* 深色主题下的历史人物信息渲染器样式 */
.dark-theme .ai-message .message-text :deep(.section-title) {
  color: #f7fafc;
  border-bottom-color: #818cf8;
}

.dark-theme .ai-message .message-text :deep(.subsection-title) {
  color: #e2e8f0;
  border-left-color: #a78bfa;
}

.dark-theme .ai-message .message-text :deep(.info-row) {
  background: rgba(129, 140, 248, 0.1);
  border-left-color: #818cf8;
}

.dark-theme .ai-message .message-text :deep(.info-label) {
  color: #e2e8f0;
}

.dark-theme .ai-message .message-text :deep(.info-value) {
  color: #f7fafc;
}

.dark-theme .ai-message .message-text :deep(.list-number) {
  color: #818cf8;
}

.dark-theme .ai-message .message-text :deep(.quote) {
  background: rgba(167, 139, 250, 0.1);
  border-left-color: #a78bfa;
  color: #e2e8f0;
}

.dark-theme .ai-message .message-text :deep(strong) {
  color: #f7fafc;
}

.dark-theme .ai-message .message-text :deep(em) {
  color: #cbd5e0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .chat-area {
    height: 500px;
  }
}

@media (max-width: 768px) {
  .chat-header h1 {
    font-size: 2.5rem;
  }
  
  .chat-container {
    padding: 0 1rem;
  }
  
  .messages-container {
    padding: 1.5rem;
  }
  
  .message {
    max-width: 90%;
  }
  
  .input-area {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .chat-header h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .figure-selection {
    padding: 1.5rem;
  }
  
  .messages-container {
    padding: 1rem;
  }
  
  .input-container {
    flex-direction: column;
  }
  
  .send-button {
    width: 100%;
  }
}
</style>