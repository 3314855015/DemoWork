<template>
  <div class="about-page">
    <div class="container">
      <!-- 页面标题 -->
      <PageTitle title="关于项目" subtitle="了解项目架构和技术栈" />
      
      <!-- 项目信息 -->
      <div class="project-info">
        <div class="info-card">
          <h3>🚀 技术栈</h3>
          <ul class="tech-list">
            <li><strong>Vue 3</strong> - 渐进式JavaScript框架</li>
            <li><strong>TypeScript</strong> - 类型安全的JavaScript超集</li>
            <li><strong>Vite</strong> - 快速的前端构建工具</li>
            <li><strong>Vue Router</strong> - 官方路由管理器</li>
            <li><strong>Pinia</strong> - 现代化状态管理库</li>
          </ul>
        </div>
        
        <div class="info-card">
          <h3>📁 项目结构</h3>
          <div class="project-structure">
            <pre><code>src/
├── components/     # 可复用组件
├── views/         # 页面组件
├── stores/        # Pinia状态管理
├── router/        # 路由配置
├── style.css      # 全局样式
└── main.ts        # 应用入口</code></pre>
          </div>
        </div>
        
        <div class="info-card">
          <h3>✨ 特性</h3>
          <ul class="feature-list">
            <li>🎯 TypeScript支持，提供类型安全</li>
            <li>🔥 热重载开发体验</li>
            <li>📱 响应式设计</li>
            <li>🎨 组件化开发</li>
            <li>🛣️ 路由管理和导航守卫</li>
            <li>🗃️ 状态管理和计算属性</li>
            <li>📝 详细的代码注释</li>
            <li>🔧 现代化的构建工具链</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'

/**
 * 关于页面组件
 * 展示项目的技术栈、结构和特性
 */
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 100%);
  animation: gradientShift 10s ease infinite;
  background-size: 400% 400%;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.project-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s ease;
}

.info-card:hover::before {
  left: 100%;
}

.info-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 25px 60px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.2);
}

.info-card h3 {
  margin-top: 0;
  color: #2d3748;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: 700;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;
}

.info-card h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2px;
}

.tech-list,
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-list li,
.feature-list li {
  padding: 1rem 0;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  position: relative;
  padding-left: 2rem;
}

.tech-list li::before,
.feature-list li::before {
  content: '✨';
  position: absolute;
  left: 0;
  color: #667eea;
  font-size: 1.1rem;
}

.tech-list li:hover,
.feature-list li:hover {
  transform: translateX(5px);
  color: #667eea;
}

.tech-list li:last-child,
.feature-list li:last-child {
  border-bottom: none;
}

.project-structure {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  padding: 1.5rem;
  border-radius: 12px;
  overflow-x: auto;
  border: 1px solid rgba(102, 126, 234, 0.1);
  margin-top: 1rem;
}

.project-structure pre {
  margin: 0;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #2d3748;
}

.project-structure code {
  color: #2d3748;
  font-weight: 500;
}

/* 深色主题适配 */
.dark-theme .about-page {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 100%);
}

.dark-theme .info-card {
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}

.dark-theme .info-card h3 {
  color: #f1f5f9;
}

.dark-theme .info-card h3::after {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
}

.dark-theme .tech-list li::before,
.dark-theme .feature-list li::before {
  color: #818cf8;
}

.dark-theme .tech-list li:hover,
.dark-theme .feature-list li:hover {
  color: #818cf8;
}

.dark-theme .project-structure {
  background: linear-gradient(135deg, #1e293b, #334155);
  border: 1px solid rgba(129, 140, 248, 0.1);
}

.dark-theme .project-structure pre,
.dark-theme .project-structure code {
  color: #f1f5f9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-page {
    padding: 2rem 0;
  }
  
  .project-info {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .info-card {
    padding: 2rem 1.5rem;
  }
  
  .info-card:hover {
    transform: translateY(-4px);
  }
}

@media (max-width: 480px) {
  .info-card {
    padding: 1.5rem 1rem;
  }
  
  .info-card h3 {
    font-size: 1.5rem;
  }
  
  .tech-list li,
  .feature-list li {
    padding: 0.8rem 0;
    padding-left: 1.5rem;
  }
}
</style>