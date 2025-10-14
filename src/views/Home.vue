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
  padding: 2rem 0;
}

.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.features-section h2 {
  text-align: center;
  color: #333;
  margin-bottom: 3rem;
  font-size: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>