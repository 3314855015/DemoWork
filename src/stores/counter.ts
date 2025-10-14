import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * 计数器状态管理
 * 使用Pinia进行状态管理，采用Composition API风格
 */
export const useCounterStore = defineStore('counter', () => {
  // 状态定义
  const count = ref(0)
  const message = ref('')

  // 计算属性
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)

  /**
   * 增加计数
   * @param amount 增加的数量，默认为1
   */
  function increment(amount: number = 1) {
    count.value += amount
  }

  /**
   * 减少计数
   * @param amount 减少的数量，默认为1
   */
  function decrement(amount: number = 1) {
    count.value -= amount
  }

  /**
   * 重置计数器
   */
  function reset() {
    count.value = 0
  }

  /**
   * 设置消息
   * @param newMessage 新的消息内容
   */
  function setMessage(newMessage: string) {
    message.value = newMessage
  }

  return {
    // 状态
    count,
    message,
    // 计算属性
    doubleCount,
    isEven,
    // 方法
    increment,
    decrement,
    reset,
    setMessage
  }
})