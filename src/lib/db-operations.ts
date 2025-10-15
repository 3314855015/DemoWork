import { supabase } from './supabase'
import type { Database } from './database.types'

type Tables = Database['public']['Tables']

export class DBOperations {
  // 用户相关操作
  static async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    return { data, error }
  }

  static async updateUserProfile(userId: string, updates: Partial<Tables['profiles']['Update']>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    return { data, error }
  }

  // 公司相关操作
  static async createCompany(companyData: Tables['companies']['Insert']) {
    const { data, error } = await supabase
      .from('companies')
      .insert([companyData])
      .select()
      .single()

    return { data, error }
  }

  static async getCompany(companyId: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single()

    return { data, error }
  }

  static async getUserCompanies(userId: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('created_by', userId)

    return { data, error }
  }

  // 职位发布相关操作
  static async createJobPosting(jobData: Tables['job_postings']['Insert']) {
    const { data, error } = await supabase
      .from('job_postings')
      .insert([jobData])
      .select()
      .single()

    return { data, error }
  }

  static async getJobPosting(jobId: string) {
    const { data, error } = await supabase
      .from('job_postings')
      .select(`
        *,
        companies (*)
      `)
      .eq('id', jobId)
      .single()

    return { data, error }
  }

  static async getActiveJobPostings(limit: number = 20, page: number = 0) {
    const from = page * limit
    const to = from + limit - 1

    const { data, error } = await supabase
      .from('job_postings')
      .select(`
        *,
        companies (*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(from, to)

    return { data, error }
  }

  static async searchJobPostings(query: string, filters: any = {}) {
    let queryBuilder = supabase
      .from('job_postings')
      .select(`
        *,
        companies (*)
      `)
      .eq('is_active', true)

    if (query) {
      queryBuilder = queryBuilder.textSearch('title', query)
    }

    if (filters.location) {
      queryBuilder = queryBuilder.ilike('location', `%${filters.location}%`)
    }

    if (filters.employment_type) {
      queryBuilder = queryBuilder.eq('employment_type', filters.employment_type)
    }

    const { data, error } = await queryBuilder
      .order('created_at', { ascending: false })

    return { data, error }
  }

  // 简历相关操作
  static async createResume(resumeData: Tables['resumes']['Insert']) {
    const { data, error } = await supabase
      .from('resumes')
      .insert([resumeData])
      .select()
      .single()

    return { data, error }
  }

  static async getUserResumes(userId: string) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return { data, error }
  }

  static async updateResumeEmbedding(resumeId: string, embedding: number[]) {
    const { data, error } = await supabase
      .from('resumes')
      .update({ vector_embedding: embedding })
      .eq('id', resumeId)

    return { data, error }
  }

  // 申请相关操作
  static async createApplication(applicationData: Tables['applications']['Insert']) {
    const { data, error } = await supabase
      .from('applications')
      .insert([applicationData])
      .select(`
        *,
        job_postings (*, companies (*)),
        resumes (*)
      `)
      .single()

    return { data, error }
  }

  static async getUserApplications(userId: string, role: 'candidate' | 'recruiter') {
    let queryBuilder = supabase
      .from('applications')
      .select(`
        *,
        job_postings (*, companies (*)),
        resumes (*)
      `)

    if (role === 'candidate') {
      queryBuilder = queryBuilder.eq('candidate_id', userId)
    } else {
      queryBuilder = queryBuilder.eq('job_postings.company_id', userId)
    }

    const { data, error } = await queryBuilder
      .order('created_at', { ascending: false })

    return { data, error }
  }

  static async updateApplicationStatus(applicationId: string, status: Tables['applications']['Update']['status']) {
    const { data, error } = await supabase
      .from('applications')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', applicationId)

    return { data, error }
  }

  // 消息相关操作
  static async sendMessage(messageData: Tables['messages']['Insert']) {
    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select()
      .single()

    return { data, error }
  }

  static async getApplicationMessages(applicationId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: true })

    return { data, error }
  }

  // 实时订阅
  static subscribeToTableChanges(table: string, callback: (payload: any) => void) {
    return supabase
      .channel('table-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table
        },
        callback
      )
      .subscribe()
  }

  static subscribeToApplicationMessages(applicationId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`application-${applicationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `application_id=eq.${applicationId}`
        },
        callback
      )
      .subscribe()
  }
}

export default DBOperations