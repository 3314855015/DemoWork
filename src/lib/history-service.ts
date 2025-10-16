import { supabase } from './supabase'
import type { Database } from './database.types'
import { AIService } from './ai-service'

type Tables = Database['public']['Tables']

export class HistoryService {
  // 获取所有历史时期
  static async getHistoricalPeriods() {
    const { data, error } = await supabase
      .from('historical_periods')
      .select('*')
      .order('start_year', { ascending: true })

    return { data, error }
  }

  // 获取热门历史人物
  static async getPopularFigures(limit: number = 10) {
    const { data, error } = await supabase
      .from('historical_figures')
      .select(`
        *,
        historical_periods (*)
      `)
      .order('popularity_score', { ascending: false })
      .limit(limit)

    return { data, error }
  }

  // 根据时期获取历史人物
  static async getFiguresByPeriod(periodId: string) {
    const { data, error } = await supabase
      .from('historical_figures')
      .select(`
        *,
        historical_periods (*)
      `)
      .eq('period_id', periodId)
      .order('popularity_score', { ascending: false })

    return { data, error }
  }

  // 搜索历史人物
  static async searchFigures(query: string, filters: any = {}) {
    let queryBuilder = supabase
      .from('historical_figures')
      .select(`
        *,
        historical_periods (*)
      `)

    if (query) {
      queryBuilder = queryBuilder.textSearch('name', query)
    }

    if (filters.periodId) {
      queryBuilder = queryBuilder.eq('period_id', filters.periodId)
    }

    if (filters.nationality) {
      queryBuilder = queryBuilder.ilike('nationality', `%${filters.nationality}%`)
    }

    const { data, error } = await queryBuilder
      .order('popularity_score', { ascending: false })

    return { data, error }
  }

  // AI 向量搜索历史人物
  static async searchFiguresByAI(query: string, limit: number = 10) {
    try {
      const embedding = await AIService.generateEmbedding(query)
      
      const { data, error } = await supabase.rpc('match_figures', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: limit
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      // 如果AI搜索失败，回退到普通搜索
      return await this.searchFigures(query)
    }
  }

  // 获取人物详情
  static async getFigureDetails(figureId: string) {
    const { data, error } = await supabase
      .from('historical_figures')
      .select(`
        *,
        historical_periods (*),
        figure_relationships!figure_relationships_figure_id_fkey (
          related_figure_id,
          relationship_type,
          description,
          historical_figures!figure_relationships_related_figure_id_fkey (
            name,
            image_url
          )
        )
      `)
      .eq('id', figureId)
      .single()

    return { data, error }
  }

  // 获取相关人物
  static async getRelatedFigures(figureId: string) {
    const { data, error } = await supabase
      .from('figure_relationships')
      .select(`
        relationship_type,
        description,
        historical_figures!figure_relationships_related_figure_id_fkey (
          id,
          name,
          image_url,
          occupation
        )
      `)
      .eq('figure_id', figureId)

    return { data, error }
  }

  // 用户收藏操作
  static async addToFavorites(userId: string, figureId: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .insert([{ user_id: userId, figure_id: figureId }])
      .select()
      .single()

    return { data, error }
  }

  static async removeFromFavorites(userId: string, figureId: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('figure_id', figureId)

    return { data, error }
  }

  static async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .select(`
        *,
        historical_figures (*, historical_periods (*))
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return { data, error }
  }

  static async isFigureFavorited(userId: string, figureId: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('figure_id', figureId)
      .single()

    return { isFavorited: !!data, error }
  }

  // 记录搜索历史
  static async recordSearchHistory(userId: string, query: string, resultsCount: number) {
    const { data, error } = await supabase
      .from('search_history')
      .insert([{ user_id: userId, query, results_count: resultsCount }])

    return { data, error }
  }

  static async getUserSearchHistory(userId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('search_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    return { data, error }
  }

  // 更新人物热度
  static async incrementPopularity(figureId: string) {
    try {
      // 首先获取当前热度值
      const { data: figureData, error: fetchError } = await supabase
        .from('historical_figures')
        .select('popularity_score')
        .eq('id', figureId)
        .single()

      if (fetchError) throw fetchError

      // 更新热度值（增加1）
      const { data, error } = await supabase
        .from('historical_figures')
        .update({ 
          popularity_score: (figureData?.popularity_score || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', figureId)
        .select()

      return { data, error }
    } catch (error) {
      console.error('更新人物热度失败:', error)
      return { data: null, error }
    }
  }

  // 获取时间线数据
  static async getTimelineData() {
    const { data, error } = await supabase
      .from('historical_periods')
      .select(`
        *,
        historical_figures (
          id,
          name,
          birth_year,
          death_year,
          image_url,
          occupation
        )
      `)
      .order('start_year', { ascending: true })

    return { data, error }
  }

  // 实时订阅人物更新
  static subscribeToFigureChanges(callback: (payload: any) => void) {
    return supabase
      .channel('figure-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'historical_figures'
        },
        callback
      )
      .subscribe()
  }

  // 实时订阅收藏更新
  static subscribeToFavorites(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`favorites-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_favorites',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }
}

export default HistoryService