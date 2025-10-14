<template>
  <div class="welcome-section">
    <div class="welcome-content">
      <h1 class="welcome-title">{{ appStore.appTitle }}</h1>
      <p class="welcome-subtitle">基于 Vue 3 + TypeScript + Vite 构建的现代化脚手架</p>
      <div class="theme-info">
        <span class="theme-label">当前主题：</span>
        <span class="theme-value">{{ appStore.theme === 'light' ? '浅色' : '深色' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

/**
 * 欢迎区域组件
 * 显示应用标题和基本信息
 */

// 使用应用状态管理
const appStore = useAppStore()
</script>

<style scoped>
.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-content {
  max-width: 800px;
  margin: 0 auto;
}

.welcome-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.welcome-subtitle {
  font-size: 1.3rem;
  margin: 0 0 2rem 0;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.theme-info {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  display: inline-block;
  backdrop-filter: blur(10px);
}

.theme-label {
  font-weight: 500;
}

.theme-value {
  font-weight: 700;
  color: #ffd700;
}

@media (max-width: 768px) {
  .welcome-section {
    padding: 3rem 1rem;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-subtitle {
    font-size: 1.1rem;
  }
}
</style>