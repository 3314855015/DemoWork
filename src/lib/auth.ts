import { supabase } from './supabase'
import type { User, AuthError } from '@supabase/supabase-js'

export interface AuthResult {
  user: User | null
  error: AuthError | null
}

export class AuthService {
  // 用户注册
  static async signUp(email: string, password: string, userData: { full_name: string; role: 'candidate' | 'recruiter' }): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })

    if (data.user) {
      // 创建用户profile
      await this.createUserProfile(data.user.id, email, userData.full_name, userData.role)
    }

    return {
      user: data.user,
      error
    }
  }

  // 用户登录
  static async signIn(email: string, password: string): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    return {
      user: data.user,
      error
    }
  }

  // 用户登出
  static async signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  // 获取当前用户
  static async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }

  // 创建用户profile
  private static async createUserProfile(userId: string, email: string, fullName: string, role: 'candidate' | 'recruiter') {
    const { error } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          email,
          full_name: fullName,
          role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('创建用户profile失败:', error)
      throw error
    }
  }

  // 重置密码
  static async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    return { error }
  }

  // 更新密码
  static async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    return { error }
  }
}

// 监听认证状态变化
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback)
}

export default AuthService