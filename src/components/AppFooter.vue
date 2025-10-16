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
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: #e2e8f0;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h3,
.footer-section h4 {
  margin: 0 0 1.5rem 0;
  color: #fff;
}

.footer-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2px;
}

.footer-description {
  color: #cbd5e0;
  line-height: 1.8;
  margin: 0;
  font-size: 1rem;
}

.tech-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-list li {
  padding: 0.8rem 0;
  color: #a0aec0;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  padding-left: 1.5rem;
}

.tech-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.tech-list li:hover {
  color: #667eea;
  transform: translateX(5px);
}

.tech-list li:last-child {
  border-bottom: none;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-link {
  color: #a0aec0;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.2rem;
}

.footer-link::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #667eea;
  transition: transform 0.3s ease;
}

.footer-link:hover,
.footer-link.router-link-active {
  color: #667eea;
  transform: translateX(5px);
}

.footer-link:hover::before {
  transform: translateX(3px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  color: #a0aec0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.copyright {
  margin: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.theme-info {
  background: rgba(102, 126, 234, 0.3);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.theme-info:hover {
  background: rgba(102, 126, 234, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.build-info {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 深色主题适配 */
.dark-theme .app-footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-theme .footer-link:hover,
.dark-theme .footer-link.router-link-active {
  color: #818cf8;
}

.dark-theme .tech-list li:hover {
  color: #818cf8;
}

.dark-theme .theme-info {
  background: rgba(129, 140, 248, 0.3);
  color: #818cf8;
  border-color: rgba(129, 140, 248, 0.2);
}

.dark-theme .theme-info:hover {
  background: rgba(129, 140, 248, 0.4);
  box-shadow: 0 4px 15px rgba(129, 140, 248, 0.3);
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