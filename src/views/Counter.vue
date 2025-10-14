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
  padding: 2rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.counter-section {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
}

.status-info {
  margin-top: 2rem;
}

.status-text {
  font-size: 1.2rem;
  color: #4a5568;
}

.message-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.message-section h3 {
  margin-top: 0;
  color: #333;
}

@media (max-width: 768px) {
  .counter-section {
    padding: 2rem 1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>