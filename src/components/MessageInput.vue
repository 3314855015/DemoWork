<template>
  <div class="message-input">
    <div class="input-group">
      <label for="message" class="input-label">输入消息：</label>
      <input
        id="message"
        :value="message"
        @input="handleInput"
        placeholder="请输入一些文字..."
        class="message-field"
        type="text"
      />
    </div>
    
    <div v-if="message" class="message-display">
      <h4>您输入的内容：</h4>
      <p class="message-content">{{ message }}</p>
      <div class="message-stats">
        <span class="stat-item">字符数：{{ message.length }}</span>
        <span class="stat-item">单词数：{{ wordCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * 消息输入组件
 * 提供文本输入和实时显示功能
 */

interface Props {
  message: string
}

interface Emits {
  (e: 'update:message', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

/**
 * 处理输入事件
 * @param event 输入事件
 */
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:message', target.value)
}

/**
 * 计算单词数量
 */
const wordCount = computed(() => {
  if (!props.message.trim()) return 0
  return props.message.trim().split(/\s+/).length
})
</script>

<style scoped>
.message-input {
  width: 100%;
}

.input-group {
  margin-bottom: 2rem;
}

.input-label {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 700;
  color: #2d3748;
  font-size: 1.1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: 0.5rem;
  border-left: 4px solid #667eea;
}

.message-field {
  width: 100%;
  padding: 1.2rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  font-family: inherit;
}

.message-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 
    0 0 0 4px rgba(102, 126, 234, 0.1),
    0 8px 25px rgba(102, 126, 234, 0.15);
  background: white;
  transform: translateY(-2px);
}

.message-field::placeholder {
  color: #a0aec0;
  font-style: italic;
}

.message-display {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  padding: 2rem;
  border-radius: 16px;
  border-left: 6px solid #667eea;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.message-display:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
}

.message-display h4 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.message-content {
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 10px;
  margin: 0 0 1.5rem 0;
  font-style: italic;
  color: #4a5568;
  border: 1px solid rgba(102, 126, 234, 0.2);
  font-size: 1.1rem;
  line-height: 1.6;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.message-content:hover {
  background: white;
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(5px);
}

.message-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-item::before {
  content: '📊';
  font-size: 0.9rem;
}

.stat-item:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* 深色主题适配 */
.dark-theme .input-label {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-left-color: #818cf8;
}

.dark-theme .message-field {
  background: rgba(30, 41, 59, 0.8);
  border-color: #4a5568;
  color: #f1f5f9;
}

.dark-theme .message-field:focus {
  border-color: #818cf8;
  box-shadow: 
    0 0 0 4px rgba(129, 140, 248, 0.1),
    0 8px 25px rgba(129, 140, 248, 0.15);
  background: rgba(30, 41, 59, 0.9);
}

.dark-theme .message-display {
  background: linear-gradient(135deg, #1e293b, #334155);
  border-left-color: #818cf8;
}

.dark-theme .message-display h4 {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #f1f5f9;
}

.dark-theme .message-content {
  background: rgba(30, 41, 59, 0.8);
  color: #e2e8f0;
  border-color: rgba(129, 140, 248, 0.2);
}

.dark-theme .message-content:hover {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(129, 140, 248, 0.3);
}

.dark-theme .stat-item {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
  box-shadow: 0 4px 15px rgba(129, 140, 248, 0.3);
}

.dark-theme .stat-item:hover {
  box-shadow: 0 6px 20px rgba(129, 140, 248, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .message-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-item {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
  
  .message-display {
    padding: 1.5rem;
  }
  
  .message-content {
    padding: 1.2rem;
  }
}

@media (max-width: 480px) {
  .input-label {
    font-size: 1rem;
  }
  
  .message-field {
    padding: 1rem;
    font-size: 1rem;
  }
  
  .message-display {
    padding: 1.2rem;
  }
  
  .message-content {
    padding: 1rem;
    font-size: 1rem;
  }
  
  .stat-item {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>