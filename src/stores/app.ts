import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 应用全局状态管理
 * 管理应用级别的状态，如主题、语言等
 */
export const useAppStore = defineStore('app', () => {
  // 主题状态
  const theme = ref<'light' | 'dark'>('light')
  
  // 加载状态
  const isLoading = ref(false)
  
  // 应用标题
  const appTitle = ref('Vue脚手架项目')

  /**
   * 切换主题
   */
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  /**
   * 设置加载状态
   * @param loading 加载状态
   */
  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  /**
   * 设置应用标题
   * @param title 新的标题
   */
  function setAppTitle(title: string) {
    appTitle.value = title
  }

  return {
    // 状态
    theme,
    isLoading,
    appTitle,
    // 方法
    toggleTheme,
    setLoading,
    setAppTitle
  }
})