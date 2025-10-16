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
  margin-bottom: 3rem;
  position: relative;
}

.count-value {
  font-size: 6rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 1rem;
  text-shadow: 
    3px 3px 6px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(102, 126, 234, 0.3);
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: countPulse 2s ease-in-out infinite;
  position: relative;
  display: inline-block;
  padding: 0 1rem;
}

@keyframes countPulse {
  0%, 100% {
    transform: scale(1);
    text-shadow: 
      3px 3px 6px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(102, 126, 234, 0.3);
  }
  50% {
    transform: scale(1.05);
    text-shadow: 
      5px 5px 10px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(102, 126, 234, 0.5);
  }
}

.count-value::before,
.count-value::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40px;
  height: 3px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2px;
  animation: linePulse 2s ease-in-out infinite;
}

.count-value::before {
  left: -50px;
  animation-delay: 0.5s;
}

.count-value::after {
  right: -50px;
  animation-delay: 1s;
}

@keyframes linePulse {
  0%, 100% {
    transform: scaleX(1);
    opacity: 0.7;
  }
  50% {
    transform: scaleX(1.2);
    opacity: 1;
  }
}

.double-count {
  font-size: 1.5rem;
  color: #4a5568;
  font-weight: 600;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  display: inline-block;
  border: 1px solid rgba(102, 126, 234, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.double-count:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

/* 深色主题适配 */
.dark-theme .count-value {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 
    3px 3px 6px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(129, 140, 248, 0.4);
}

.dark-theme .count-value::before,
.dark-theme .count-value::after {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
}

.dark-theme .double-count {
  color: #e2e8f0;
  background: rgba(129, 140, 248, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.3);
}

.dark-theme .double-count:hover {
  background: rgba(129, 140, 248, 0.25);
  box-shadow: 0 4px 15px rgba(129, 140, 248, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .count-value {
    font-size: 4.5rem;
    padding: 0 0.5rem;
  }
  
  .count-value::before,
  .count-value::after {
    width: 30px;
  }
  
  .count-value::before {
    left: -40px;
  }
  
  .count-value::after {
    right: -40px;
  }
  
  .double-count {
    font-size: 1.3rem;
    padding: 0.6rem 1.2rem;
  }
}

@media (max-width: 480px) {
  .count-value {
    font-size: 3.5rem;
  }
  
  .count-value::before,
  .count-value::after {
    width: 20px;
  }
  
  .count-value::before {
    left: -30px;
  }
  
  .count-value::after {
    right: -30px;
  }
  
  .double-count {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
  }
}
</style>