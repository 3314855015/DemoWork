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
              :disabled="isLoading"
            />
            <button 
              @click="sendMessage"
              :disabled="!inputText.trim() || isLoading"
              class="send-button"
            >
              {{ isLoading ? '处理中...' : '发送' }}
            </button>
          </div>
          <p class="hint">提示：输入格式为：人物名</p>
        </div>

        <!-- 加载提示 -->
        <div v-if="isLoading" class="loading-indicator">
          <div class="loading-spinner"></div>
          <span>AI正在思考中，请稍候...</span>
        </div>
      </div>
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
const isLoading = ref(false)
const sessionId = ref<string>('')
const messagesContainer = ref<HTMLElement>()
const messageRefs = ref<Record<string, Element | null>>({})
const lastRequestTime = ref<number>(0)
const requestCooldown = 1000 // 1秒冷却时间
const responseCache = ref<Map<string, string>>(new Map())
const requestCount = ref<number>(0)
const maxRequestsPerMinute = 6 // 每分钟最大请求数
const requestTimestamps = ref<number[]>([])

// 输入验证和内容过滤
const validateInput = (input: string): { isValid: boolean; message?: string } => {
  // 检查输入长度
  if (input.length > 500) {
    return { isValid: false, message: '输入内容过长，请控制在500字符以内' }
  }
  
  // 检查空输入
  if (!input.trim()) {
    return { isValid: false, message: '请输入有效内容' }
  }
  
  // 检查恶意模式（简单防护）
  const maliciousPatterns = [
    /script/i,
    /javascript:/i,
    /onload=/i,
    /onerror=/i,
    /eval\(/i,
    /document\./i,
    /window\./i,
    /alert\(/i,
    /prompt\(/i,
    /confirm\(/i
  ]
  
  for (const pattern of maliciousPatterns) {
    if (pattern.test(input)) {
      return { isValid: false, message: '输入包含不安全内容' }
    }
  }
  
  // 检查重复字符（防止垃圾内容）
  const repeatedChars = /(.)\1{10,}/ // 连续10个相同字符
  if (repeatedChars.test(input)) {
    return { isValid: false, message: '输入内容异常' }
  }
  
  return { isValid: true }
}

// 检查速率限制
const checkRateLimit = (): boolean => {
  const now = Date.now()
  const oneMinuteAgo = now - 60000
  
  // 清理过期的请求时间戳
  requestTimestamps.value = requestTimestamps.value.filter(timestamp => timestamp > oneMinuteAgo)
  
  // 检查是否超过限制
  if (requestTimestamps.value.length >= maxRequestsPerMinute) {
    console.warn('速率限制：每分钟请求次数超过限制')
    return false
  }
  
  // 记录当前请求时间
  requestTimestamps.value.push(now)
  return true
}

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
  const now = Date.now()
  
  // 检查冷却时间
  if (now - lastRequestTime.value < requestCooldown) {
    console.log('请求过于频繁，请稍后再试')
    const errorMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: '请求过于频繁，请稍后再试',
      isUser: false,
      timestamp: new Date()
    }
    messages.value.push(errorMessage)
    await scrollToBottom()
    return
  }
  
  // 检查速率限制
  if (!checkRateLimit()) {
    console.error('请求频率过高，请稍后再试')
    const errorMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: '请求频率过高，请稍后再试（每分钟最多10次）',
      isUser: false,
      timestamp: new Date()
    }
    messages.value.push(errorMessage)
    await scrollToBottom()
    return
  }
  
  if (!inputText.value.trim() || isLoading.value) return
  
  // 验证输入内容
  const validation = validateInput(inputText.value)
  if (!validation.isValid) {
    console.error('输入验证失败:', validation.message)
    const errorMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: validation.message || '输入内容不符合要求',
      isUser: false,
      timestamp: new Date()
    }
    messages.value.push(errorMessage)
    await scrollToBottom()
    return
  }
  
  // 更新最后请求时间
  lastRequestTime.value = now

  // 设置加载状态
  isLoading.value = true

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
    // 检查缓存
    const cachedResponse = responseCache.value.get(userInput)
    if (cachedResponse) {
      console.log('使用缓存响应')
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: cachedResponse,
        isUser: false,
        timestamp: new Date()
      }
      messages.value.push(aiMessage)
      await scrollToBottom()
      isLoading.value = false
      return
    }

    // 调用实际的n8n服务
    const response = await callN8nService(userInput)
    
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date()
    }

    messages.value.push(aiMessage)
    
    // 缓存响应结果
    responseCache.value.set(userInput, response)
    
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
  } finally {
    // 无论成功或失败，都清除加载状态
    isLoading.value = false
  }
}

// 获取API端点URL（根据环境动态配置）
const getApiUrl = (): string => {
  // 开发环境使用本地API代理
  if (import.meta.env.DEV) {
    return '/api/ai-chat'
  }
  // 生产环境使用Netlify函数路径
  return `${window.location.origin}/.netlify/functions/ai-chat`
}

// 调用API代理服务（解决跨域问题）
const callN8nService = async (userInput: string): Promise<string> => {
  try {
    // 使用动态配置的API端点
    const apiUrl = getApiUrl()
    console.log('API端点:', apiUrl, '环境:', import.meta.env.MODE)
    
    console.log('通过API代理发送请求:', { message: userInput })
    
    const response = await fetch(apiUrl, {
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



// 组件挂载时初始化
onMounted(() => {
  // 页面加载时滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  // 添加欢迎消息
  messages.value.push({
    id: Date.now().toString(),
    text: '欢迎使用AI历史人物聊天机器人！请输入历史人物名',
    isUser: false,
    timestamp: new Date()
  })
  
  // 延迟滚动到底部显示欢迎消息
  setTimeout(() => {
    scrollToBottom()
  }, 100)
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

/* 加载指示器样式 */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 10px;
  margin: 1rem 2rem;
  border-left: 4px solid #667eea;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-indicator span {
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 深色主题下的加载指示器 */
.dark-theme .loading-indicator {
  background: rgba(129, 140, 248, 0.1);
  border-left-color: #818cf8;
}

.dark-theme .loading-spinner {
  border: 2px solid #4a5568;
  border-top: 2px solid #818cf8;
}

.dark-theme .loading-indicator span {
  color: #e2e8f0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .chat-area {
    height: 500px;
  }
  
  .loading-indicator {
    margin: 1rem;
    padding: 1rem;
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