import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@supabase/supabase-js'
import AuthService from '@/lib/auth'
import DBOperations from '@/lib/db-operations'

interface AuthState {
  user: User | null
  profile: any | null
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const state = ref<AuthState>({
    user: null,
    profile: null,
    isLoading: false
  })

  // Getters
  const isAuthenticated = computed(() => !!state.value.user)
  const userRole = computed(() => state.value.profile?.role)
  const isCandidate = computed(() => userRole.value === 'candidate')
  const isRecruiter = computed(() => userRole.value === 'recruiter')

  // Actions
  const setUser = (user: User | null) => {
    state.value.user = user
  }

  const setProfile = (profile: any | null) => {
    state.value.profile = profile
  }

  const setLoading = (loading: boolean) => {
    state.value.isLoading = loading
  }

  // 初始化认证状态
  const initializeAuth = async () => {
    setLoading(true)
    try {
      const user = await AuthService.getCurrentUser()
      if (user) {
        state.value.user = user
        // 获取用户profile
        const { data: profile } = await DBOperations.getUserProfile(user.id)
        state.value.profile = profile
      }
    } catch (error) {
      console.error('初始化认证状态失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 用户注册
  const signUp = async (email: string, password: string, userData: { full_name: string; role: 'candidate' | 'recruiter' }) => {
    setLoading(true)
    try {
      const { user, error } = await AuthService.signUp(email, password, userData)
      if (error) throw error
      
      if (user) {
        state.value.user = user
        // 获取新创建的profile
        const { data: profile } = await DBOperations.getUserProfile(user.id)
        state.value.profile = profile
      }
      
      return { user, error: null }
    } catch (error) {
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  // 用户登录
  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { user, error } = await AuthService.signIn(email, password)
      if (error) throw error
      
      if (user) {
        state.value.user = user
        // 获取用户profile
        const { data: profile } = await DBOperations.getUserProfile(user.id)
        state.value.profile = profile
      }
      
      return { user, error: null }
    } catch (error) {
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  // 用户登出
  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await AuthService.signOut()
      if (error) throw error
      
      state.value.user = null
      state.value.profile = null
      
      return { error: null }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // 更新用户profile
  const updateProfile = async (updates: any) => {
    if (!state.value.user) throw new Error('用户未登录')
    
    try {
      const { data, error } = await DBOperations.updateUserProfile(state.value.user.id, updates)
      if (error) throw error
      
      state.value.profile = { ...state.value.profile, ...data }
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // 重置密码
  const resetPassword = async (email: string) => {
    return await AuthService.resetPassword(email)
  }

  // 更新密码
  const updatePassword = async (newPassword: string) => {
    return await AuthService.updatePassword(newPassword)
  }

  return {
    // State
    user: computed(() => state.value.user),
    profile: computed(() => state.value.profile),
    isLoading: computed(() => state.value.isLoading),
    
    // Getters
    isAuthenticated,
    userRole,
    isCandidate,
    isRecruiter,
    
    // Actions
    initializeAuth,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    updatePassword,
    setUser,
    setProfile
  }
})