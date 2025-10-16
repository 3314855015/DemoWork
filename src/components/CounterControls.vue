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
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 140px;
  justify-content: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  background-clip: padding-box;
}

.control-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s ease;
}

.control-btn:hover::before {
  left: 100%;
}

.increment-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
}

.increment-btn:hover {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 30px rgba(16, 185, 129, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

.decrement-btn {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
}

.decrement-btn:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 30px rgba(239, 68, 68, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

.reset-btn {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
}

.reset-btn:hover {
  background: linear-gradient(135deg, #d97706, #b45309);
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 30px rgba(245, 158, 11, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-icon {
  font-size: 1.5rem;
  font-weight: bold;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.control-btn:hover .btn-icon {
  transform: scale(1.2);
}

.btn-text {
  font-size: 1.1rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* 深色主题适配 */
.dark-theme .increment-btn {
  background: linear-gradient(135deg, #34d399, #10b981);
  box-shadow: 0 6px 20px rgba(52, 211, 153, 0.3);
}

.dark-theme .increment-btn:hover {
  background: linear-gradient(135deg, #10b981, #059669);
  box-shadow: 0 12px 30px rgba(52, 211, 153, 0.4);
}

.dark-theme .decrement-btn {
  background: linear-gradient(135deg, #f87171, #ef4444);
  box-shadow: 0 6px 20px rgba(248, 113, 113, 0.3);
}

.dark-theme .decrement-btn:hover {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  box-shadow: 0 12px 30px rgba(248, 113, 113, 0.4);
}

.dark-theme .reset-btn {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  box-shadow: 0 6px 20px rgba(251, 191, 36, 0.3);
}

.dark-theme .reset-btn:hover {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  box-shadow: 0 12px 30px rgba(251, 191, 36, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .counter-controls {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .control-btn {
    width: 220px;
    padding: 1rem 2rem;
    min-width: auto;
  }
  
  .btn-icon {
    font-size: 1.3rem;
  }
  
  .btn-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .control-btn {
    width: 200px;
    padding: 0.9rem 1.8rem;
  }
  
  .btn-icon {
    font-size: 1.2rem;
  }
}
</style>