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
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.message-field {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.message-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.message-display {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.message-display h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.message-content {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  margin: 0 0 1rem 0;
  font-style: italic;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.message-stats {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.stat-item {
  background: #667eea;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .message-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .stat-item {
    text-align: center;
  }
}
</style>