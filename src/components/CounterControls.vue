<template>
  <div class="counter-controls">
    <button class="control-btn decrement-btn" @click="$emit('decrement')">
      <span class="btn-icon">-</span>
      <span class="btn-text">减少</span>
    </button>
    
    <button class="control-btn reset-btn" @click="$emit('reset')">
      <span class="btn-icon">↻</span>
      <span class="btn-text">重置</span>
    </button>
    
    <button class="control-btn increment-btn" @click="$emit('increment')">
      <span class="btn-icon">+</span>
      <span class="btn-text">增加</span>
    </button>
  </div>
</template>

<script setup lang="ts">
/**
 * 计数器控制组件
 * 提供增加、减少、重置功能的按钮控制
 */

interface Emits {
  (e: 'increment'): void
  (e: 'decrement'): void
  (e: 'reset'): void
}

defineEmits<Emits>()
</script>

<style scoped>
.counter-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  justify-content: center;
}

.increment-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.increment-btn:hover {
  background: linear-gradient(135deg, #45a049, #3d8b40);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.decrement-btn {
  background: linear-gradient(135deg, #f44336, #da190b);
  color: white;
}

.decrement-btn:hover {
  background: linear-gradient(135deg, #da190b, #c1150a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

.reset-btn {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
}

.reset-btn:hover {
  background: linear-gradient(135deg, #f57c00, #ef6c00);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.btn-icon {
  font-size: 1.3rem;
  font-weight: bold;
}

.btn-text {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .counter-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .control-btn {
    width: 200px;
    padding: 0.8rem 1.5rem;
  }
}
</style>