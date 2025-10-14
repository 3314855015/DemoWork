<template>
  <div class="counter-display">
    <div class="count-value">{{ count }}</div>
    <div class="double-count">双倍值: {{ doubleCount }}</div>
  </div>
</template>

<script setup lang="ts">
/**
 * 计数器显示组件
 * 用于展示当前计数值和计算属性
 */

interface Props {
  count: number
  doubleCount: number
}

defineProps<Props>()
</script>

<style scoped>
.counter-display {
  text-align: center;
  margin-bottom: 2rem;
}

.count-value {
  font-size: 4rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.double-count {
  font-size: 1.2rem;
  color: #4a5568;
  font-weight: 500;
}

@media (max-width: 768px) {
  .count-value {
    font-size: 3rem;
  }
  
  .double-count {
    font-size: 1rem;
  }
}
</style>