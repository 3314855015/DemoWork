import { supabase } from './supabase'

export class StorageService {
  private static BUCKET_NAME = 'resumes'

  // 上传简历文件
  static async uploadResume(file: File, userId: string): Promise<{ filePath: string; error: any }> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .upload(filePath, file)

    return { filePath, error }
  }

  // 获取简历文件URL
  static getResumeUrl(filePath: string): string {
    const { data } = supabase.storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(filePath)
    
    return data.publicUrl
  }

  // 删除简历文件
  static async deleteResume(filePath: string): Promise<{ error: any }> {
    const { error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .remove([filePath])

    return { error }
  }

  // 上传公司logo
  static async uploadCompanyLogo(file: File, companyId: string): Promise<{ filePath: string; error: any }> {
    const fileExt = file.name.split('.').pop()
    const fileName = `companies/${companyId}/logo.${fileExt}`
    const filePath = `${fileName}`

    const { error } = await supabase.storage
      .from('company-logos')
      .upload(filePath, file)

    return { filePath, error }
  }

  // 获取公司logo URL
  static getCompanyLogoUrl(filePath: string): string {
    const { data } = supabase.storage
      .from('company-logos')
      .getPublicUrl(filePath)
    
    return data.publicUrl
  }
}

export default StorageService