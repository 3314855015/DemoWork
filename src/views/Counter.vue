<template>
  <div class="counter-page">
    <div class="container">
      <!-- 页面标题 -->
      <PageTitle title="计数器演示" subtitle="展示Vue响应式系统和Pinia状态管理" />
      
      <!-- 计数器组件 -->
      <div class="counter-section">
        <CounterDisplay :count="counterStore.count" :double-count="counterStore.doubleCount" />
        
        <CounterControls
          @increment="counterStore.increment"
          @decrement="counterStore.decrement"
          @reset="counterStore.reset"
        />
        
        <!-- 状态信息 -->
        <div class="status-info">
          <p class="status-text">
            当前数字是 <strong>{{ counterStore.isEven ? '偶数' : '奇数' }}</strong>
          </p>
        </div>
      </div>
      
      <!-- 消息输入区域 -->
      <div class="message-section">
        <h3>消息管理</h3>
        <MessageInput
          :message="counterStore.message"
          @update:message="counterStore.setMessage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import PageTitle from '@/components/PageTitle.vue'
import CounterDisplay from '@/components/CounterDisplay.vue'
import CounterControls from '@/components/CounterControls.vue'
import MessageInput from '@/components/MessageInput.vue'

/**
 * 计数器页面组件
 * 展示状态管理和组件通信
 */

// 使用计数器状态管理
const counterStore = useCounterStore()
</script>

<style scoped>
.counter-page {
  min-height: 100vh;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f5f7fa 100%);
  animation: gradientShift 8s ease infinite;
  background-size: 400% 400%;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.counter-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 4rem;
  border-radius: 20px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  margin-bottom: 3rem;
  text-align: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: cardFloat 6s ease-in-out infinite;
}

@keyframes cardFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(0.5deg);
  }
}

.status-info {
  margin-top: 2.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.status-text {
  font-size: 1.3rem;
  color: #4a5568;
  font-weight: 600;
}

.status-text strong {
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.message-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.message-section h3 {
  margin-top: 0;
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 深色主题适配 */
.dark-theme .counter-page {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 20%, #334155 100%);
}

.dark-theme .counter-section {
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}

.dark-theme .status-info {
  background: linear-gradient(135deg, #1e293b, #334155);
  border: 1px solid rgba(129, 140, 248, 0.1);
}

.dark-theme .status-text {
  color: #e2e8f0;
}

.dark-theme .status-text strong {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark-theme .message-section {
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}

.dark-theme .message-section h3 {
  color: #f1f5f9;
  background: linear-gradient(135deg, #818cf8, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .counter-page {
    padding: 2rem 0;
  }
  
  .counter-section {
    padding: 2.5rem 1.5rem;
    margin-bottom: 2rem;
  }
  
  .message-section {
    padding: 2rem 1.5rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .counter-section {
    padding: 2rem 1rem;
  }
  
  .message-section {
    padding: 1.5rem 1rem;
  }
  
  .status-text {
    font-size: 1.1rem;
  }
}
</style>