<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">{{ appStore.appTitle }}</h3>
          <p class="footer-description">
            基于 Vue 3 + TypeScript + Vite 构建的现代化脚手架项目
          </p>
        </div>
        
        <div class="footer-section">
          <h4 class="section-title">技术栈</h4>
          <ul class="tech-list">
            <li>Vue 3</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>Vue Router</li>
            <li>Pinia</li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="section-title">快速链接</h4>
          <nav class="footer-nav">
            <RouterLink to="/" class="footer-link">首页</RouterLink>
            <RouterLink to="/counter" class="footer-link">计数器</RouterLink>
            <RouterLink to="/about" class="footer-link">关于</RouterLink>
          </nav>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} Vue脚手架项目. 
          <span class="theme-info">
            当前主题: {{ appStore.theme === 'light' ? '浅色' : '深色' }}
          </span>
        </p>
        <p class="build-info">
          构建时间: {{ buildTime }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

/**
 * 应用页脚组件
 * 显示应用信息、技术栈和快速链接
 */

// 使用应用状态管理
const appStore = useAppStore()

// 当前年份
const currentYear = computed(() => new Date().getFullYear())

// 构建时间（模拟）
const buildTime = computed(() => {
  return new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>

<style scoped>
.app-footer {
  background: #2d3748;
  color: #e2e8f0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin: 0 0 1rem 0;
  color: #fff;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.footer-description {
  color: #a0aec0;
  line-height: 1.6;
  margin: 0;
}

.tech-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-list li {
  padding: 0.3rem 0;
  color: #a0aec0;
  transition: color 0.3s ease;
}

.tech-list li:hover {
  color: #667eea;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.3rem 0;
}

.footer-link:hover,
.footer-link.router-link-active {
  color: #667eea;
}

.footer-bottom {
  border-top: 1px solid #4a5568;
  padding-top: 1.5rem;
  text-align: center;
  color: #718096;
}

.copyright {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.theme-info {
  background: rgba(102, 126, 234, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #667eea;
}

.build-info {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.7;
}

/* 深色主题适配 */
.dark-theme .app-footer {
  background: #1a202c;
  border-top: 1px solid #2d3748;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 2rem 1rem 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>