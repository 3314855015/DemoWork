import { supabase } from './supabase'

export class AIService {
  private static openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY

  // 生成文本嵌入向量
  static async generateEmbedding(text: string): Promise<number[]> {
    if (!this.openaiApiKey) {
      throw new Error('OpenAI API密钥未配置')
    }

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: text,
        model: 'text-embedding-ada-002'
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API请求失败: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data[0].embedding
  }

  // 优化简历内容
  static async optimizeResume(resumeContent: string, jobDescription: string): Promise<string> {
    const prompt = `
      请优化以下简历内容，使其更符合目标职位的要求。
      
      目标职位描述：
      ${jobDescription}
      
      原始简历内容：
      ${resumeContent}
      
      请提供优化建议，包括：
      1. 关键词优化
      2. 技能突出
      3. 经验描述改进
      4. 格式建议
      
      请用中文回复。
    `

    return await this.generateText(prompt)
  }

  // 生成职位匹配分析
  static async generateJobMatchAnalysis(resumeContent: string, jobDescription: string): Promise<string> {
    const prompt = `
      分析以下简历与目标职位的匹配度：
      
      简历内容：
      ${resumeContent}
      
      目标职位：
      ${jobDescription}
      
      请提供：
      1. 匹配度评分（0-100分）
      2. 优势分析
      3. 改进建议
      4. 潜在问题
      
      请用中文回复。
    `

    return await this.generateText(prompt)
  }

  // 生成AI消息
  static async generateAIMessage(context: {
    messageType: 'initial_contact' | 'follow_up' | 'rejection'
    senderRole: 'candidate' | 'recruiter'
    jobTitle?: string
    candidateName?: string
    companyName?: string
  }): Promise<string> {
    const prompt = `
      生成一条${context.messageType === 'initial_contact' ? '初次联系' : context.messageType === 'follow_up' ? '跟进' : '拒绝'}消息。
      
      发送者：${context.senderRole === 'candidate' ? '求职者' : '招聘方'}
      ${context.jobTitle ? `职位名称：${context.jobTitle}` : ''}
      ${context.candidateName ? `候选人姓名：${context.candidateName}` : ''}
      ${context.companyName ? `公司名称：${context.companyName}` : ''}
      
      请生成专业、礼貌的中文消息。
    `

    return await this.generateText(prompt)
  }

  // 通用文本生成
  private static async generateText(prompt: string): Promise<string> {
    if (!this.openaiApiKey) {
      throw new Error('OpenAI API密钥未配置')
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的职业顾问助手，帮助求职者和招聘方进行有效的沟通和匹配。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API请求失败: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  // 向量相似度搜索 - 简历匹配职位
  static async matchResumesWithJob(jobDescription: string, limit: number = 10): Promise<any[]> {
    const embedding = await this.generateEmbedding(jobDescription)
    
    const { data, error } = await supabase.rpc('match_resumes', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: limit
    })

    if (error) throw error
    return data || []
  }

  // 向量相似度搜索 - 职位匹配简历
  static async matchJobsWithResume(resumeContent: string, limit: number = 10): Promise<any[]> {
    const embedding = await this.generateEmbedding(resumeContent)
    
    const { data, error } = await supabase.rpc('match_jobs', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: limit
    })

    if (error) throw error
    return data || []
  }
}

export default AIService