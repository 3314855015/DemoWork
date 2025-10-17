<template>
  <div class="home">
    <!-- 欢迎区域 -->
    <WelcomeSection />
    
    <!-- 功能展示区域 -->
    <div class="features-section">
      <h2>功能展示</h2>
      <div class="features-grid">
        <FeatureCard
          title="计数器演示"
          description="展示Vue响应式系统和状态管理"
          icon="🔢"
          @click="$router.push('/counter')"
        />
        <FeatureCard
          title="历史人物"
          description="探索历史名人故事和成就"
          icon="👑"
          @click="$router.push('/history')"
        />
        <FeatureCard
          title="关于项目"
          description="了解项目架构和技术栈"
          icon="📖"
          @click="$router.push('/about')"
        />
        <FeatureCard
          title="AI历史人物聊天"
          description="与历史名人进行智能对话"
          icon="🤖"
          @click="$router.push('/ai-chat')"
        />
        <FeatureCard
          title="主题切换"
          description="演示全局状态管理"
          icon="🎨"
          @click="toggleTheme"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import WelcomeSection from '@/components/WelcomeSection.vue'
import FeatureCard from '@/components/FeatureCard.vue'

/**
 * 首页组件
 * 展示应用的主要功能和导航
 */

// 使用应用状态管理
const appStore = useAppStore()

/**
 * 切换主题
 */
const toggleTheme = () => {
  appStore.toggleTheme()
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.features-section h2 {
  text-align: center;
  color: #2d3748;
  margin-bottom: 4rem;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  padding-bottom: 1rem;
}

.features-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

/* 深色主题适配 */
.dark-theme .home {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

.dark-theme .features-section h2 {
  color: #f1f5f9;
  background: linear-gradient(135deg, #818cf8, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark-theme .features-section h2::after {
  background: linear-gradient(135deg, #818cf8, #a78bfa);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home {
    padding: 2rem 0;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .features-section h2 {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
}

@media (max-width: 480px) {
  .features-section {
    padding: 0 1rem;
  }
  
  .features-section h2 {
    font-size: 1.8rem;
  }
}
</style>