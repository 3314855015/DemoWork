<template>
  <div class="page-title">
    <h1 class="title">{{ title }}</h1>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
/**
 * 页面标题组件
 * 用于显示页面的主标题和副标题
 */

interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<style scoped>
.page-title {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1.5rem 0;
  text-shadow: 
    3px 3px 6px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  padding: 0 2rem;
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 
      3px 3px 6px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(255, 255, 255, 0.2);
  }
  50% {
    text-shadow: 
      5px 5px 10px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(255, 255, 255, 0.4);
  }
}

.title::before,
.title::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 50px;
  height: 3px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
  border-radius: 2px;
  animation: lineGlow 2s ease-in-out infinite;
}

.title::before {
  left: -60px;
  animation-delay: 0.5s;
}

.title::after {
  right: -60px;
  animation-delay: 1s;
}

@keyframes lineGlow {
  0%, 100% {
    opacity: 0.7;
    transform: scaleX(1);
  }
  50% {
    opacity: 1;
    transform: scaleX(1.2);
  }
}

.subtitle {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  font-weight: 400;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.subtitle:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* 深色主题适配 */
.dark-theme .title {
  background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark-theme .subtitle {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-theme .subtitle:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    margin-bottom: 3rem;
  }
  
  .title {
    font-size: 2.5rem;
    padding: 0 1rem;
  }
  
  .title::before,
  .title::after {
    width: 30px;
  }
  
  .title::before {
    left: -40px;
  }
  
  .title::after {
    right: -40px;
  }
  
  .subtitle {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }
  
  .title::before,
  .title::after {
    width: 20px;
  }
  
  .title::before {
    left: -30px;
  }
  
  .title::after {
    right: -30px;
  }
  
  .subtitle {
    font-size: 1.1rem;
    padding: 0.7rem 1.2rem;
  }
}
</style>