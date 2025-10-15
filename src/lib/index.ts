// 统一导出所有Supabase相关模块
export { supabase } from './supabase'
export type { Database } from './database.types'
export { AuthService, onAuthStateChange } from './auth'
export { StorageService } from './storage'
export { AIService } from './ai-service'
export { DBOperations } from './db-operations'