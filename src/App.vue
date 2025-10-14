<template>
  <div id="app" :class="{ 'dark-theme': appStore.theme === 'dark' }">
    <!-- 导航栏 -->
    <AppHeader />
    
    <!-- 主要内容区域 -->
    <main class="main-content">
      <RouterView />
    </main>
    
    <!-- 页脚 -->
    <AppFooter />
    
    <!-- 加载指示器 -->
    <LoadingSpinner v-if="appStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

/**
 * 主应用组件
 * 使用Vue Router进行路由管理，Pinia进行状态管理
 * 支持主题切换和响应式设计
 */

// 使用应用状态管理
const appStore = useAppStore()
</script>

<style>
/* 全局样式重置和基础样式 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  transition: background-color 0.3s ease;
}

.main-content {
  flex: 1;
}

/* 深色主题样式 */
.dark-theme {
  background-color: #1a202c !important;
  color: #e2e8f0 !important;
}

.dark-theme body {
  background-color: #1a202c;
  color: #e2e8f0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.dark-theme ::-webkit-scrollbar-track {
  background: #2d3748;
}

.dark-theme ::-webkit-scrollbar-thumb {
  background: #4a5568;
}

.dark-theme ::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>