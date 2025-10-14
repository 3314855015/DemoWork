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
  padding: 2rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.project-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.tech-list,
.feature-list {
  list-style: none;
  padding: 0;
}

.tech-list li,
.feature-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.tech-list li:last-child,
.feature-list li:last-child {
  border-bottom: none;
}

.project-structure {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.project-structure pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.project-structure code {
  color: #333;
}

@media (max-width: 768px) {
  .project-info {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .info-card {
    padding: 1.5rem;
  }
}
</style>