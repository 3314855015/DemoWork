<template>
  <div class="feature-card" @click="$emit('click')">
    <div class="card-icon">{{ icon }}</div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>
    <div class="card-arrow">→</div>
  </div>
</template>

<script setup lang="ts">
/**
 * 功能卡片组件
 * 用于展示应用的各种功能特性
 */

interface Props {
  title: string
  description: string
  icon: string
}

interface Emits {
  (e: 'click'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.feature-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  transition: left 0.6s ease;
}

.feature-card:hover::before {
  left: 100%;
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: block;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.4s ease;
}

.feature-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  padding-bottom: 0.5rem;
}

.card-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.feature-card:hover .card-title::after {
  width: 80px;
}

.card-description {
  color: #4a5568;
  line-height: 1.7;
  margin: 0 0 2rem 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.card-arrow {
  color: #667eea;
  font-size: 2rem;
  font-weight: bold;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
}

.feature-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(3px);
  }
}

/* 深色主题适配 */
.dark-theme .feature-card {
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}

.dark-theme .card-title {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark-theme .card-title::after {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
}

.dark-theme .card-description {
  color: #cbd5e0;
}

.dark-theme .card-arrow {
  color: #818cf8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .feature-card {
    padding: 2.5rem 2rem;
  }
  
  .card-icon {
    font-size: 3.5rem;
  }
  
  .card-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .feature-card {
    padding: 2rem 1.5rem;
  }
  
  .card-icon {
    font-size: 3rem;
  }
  
  .card-title {
    font-size: 1.4rem;
  }
  
  .card-description {
    font-size: 1rem;
  }
}
</style>