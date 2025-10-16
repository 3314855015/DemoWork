<template>
  <header class="app-header">
    <nav class="nav-container">
      <!-- Logo和标题 -->
      <div class="nav-brand">
        <RouterLink to="/" class="brand-link">
          <span class="brand-icon">🚀</span>
          <span class="brand-text">{{ appStore.appTitle }}</span>
        </RouterLink>
      </div>
      
      <!-- 导航菜单 -->
      <div class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
        <RouterLink
          v-for="route in navRoutes"
          :key="route.name"
          :to="route.path"
          class="nav-link"
          @click="closeMenu"
        >
          <span class="nav-icon">{{ route.icon }}</span>
          <span class="nav-text">{{ route.title }}</span>
        </RouterLink>
      </div>
      
      <!-- 工具栏 -->
      <div class="nav-tools">
        <button
          class="tool-btn theme-btn"
          @click="appStore.toggleTheme"
          :title="appStore.theme === 'light' ? '切换到深色主题' : '切换到浅色主题'"
        >
          {{ appStore.theme === 'light' ? '🌙' : '☀️' }}
        </button>
        
        <button
          class="tool-btn menu-btn"
          @click="toggleMenu"
          :class="{ 'menu-btn-active': isMenuOpen }"
        >
          <span class="menu-icon"></span>
          <span class="menu-icon"></span>
          <span class="menu-icon"></span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

/**
 * 应用头部导航组件
 * 提供路由导航、主题切换等功能
 */

// 使用应用状态管理
const appStore = useAppStore()

// 移动端菜单状态
const isMenuOpen = ref(false)

// 导航路由配置
const navRoutes = [
  { name: 'Home', path: '/', title: '首页', icon: '🏠' },
  { name: 'Counter', path: '/counter', title: '计数器', icon: '🔢' },
  { name: 'About', path: '/about', title: '关于', icon: '📖' }
]

/**
 * 切换移动端菜单
 */
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

/**
 * 关闭移动端菜单
 */
const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideInDown 0.6s ease-out;
}

@keyframes slideInDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.nav-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.brand-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.brand-link:hover::before {
  left: 100%;
}

.brand-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.brand-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  backdrop-filter: blur(15px);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.nav-icon {
  font-size: 1.3rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.nav-tools {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tool-btn {
  background: rgba(255, 255, 255, 0.25);
  border: none;
  color: white;
  padding: 0.9rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.tool-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.tool-btn:hover::before {
  left: 100%;
}

.tool-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.theme-btn {
  font-size: 1.3rem;
  width: 3rem;
  height: 3rem;
}

.menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.4rem;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
}

.menu-icon {
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.menu-btn-active .menu-icon:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.menu-btn-active .menu-icon:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.menu-btn-active .menu-icon:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* 移动端样式 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .brand-text {
    display: none;
  }
  
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }
  
  .nav-menu-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  
  .nav-link {
    width: 100%;
    justify-content: center;
    padding: 1rem;
  }
  
  .menu-btn {
    display: flex;
  }
}
</style>