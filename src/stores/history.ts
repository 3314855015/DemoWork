import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import HistoryService from '@/lib/history-service'
import type { Database } from '@/lib/database.types'

type Figure = Database['public']['Tables']['historical_figures']['Row'] & {
  historical_periods: Database['public']['Tables']['historical_periods']['Row'] | null
}

type Period = Database['public']['Tables']['historical_periods']['Row']

export const useHistoryStore = defineStore('history', () => {
  // 状态
  const figures = ref<Figure[]>([])
  const periods = ref<Period[]>([])
  const currentFigure = ref<Figure | null>(null)
  const searchResults = ref<Figure[]>([])
  const favorites = ref<Figure[]>([])
  const isLoading = ref(false)
  const searchQuery = ref('')
  const selectedPeriod = ref<string>('')
  const searchHistory = ref<any[]>([])

  // 计算属性
  const popularFigures = computed(() => figures.value.slice(0, 6))
  const timelineData = computed(() => {
    return periods.value.map(period => ({
      ...period,
      figures: figures.value.filter(figure => figure.period_id === period.id)
    }))
  })

  // 动作
  const loadPopularFigures = async () => {
    isLoading.value = true
    try {
      const { data, error } = await HistoryService.getPopularFigures(20)
      if (error) throw error
      figures.value = data || []
    } catch (error) {
      console.error('加载热门人物失败:', error)
    } finally {
      isLoading.value = false
    }
  }

  const loadPeriods = async () => {
    try {
      const { data, error } = await HistoryService.getHistoricalPeriods()
      if (error) throw error
      periods.value = data || []
    } catch (error) {
      console.error('加载历史时期失败:', error)
    }
  }

  const searchFigures = async (query: string = searchQuery.value) => {
    if (!query.trim()) {
      searchResults.value = []
      return
    }

    isLoading.value = true
    try {
      const filters: any = {}
      if (selectedPeriod.value) {
        filters.periodId = selectedPeriod.value
      }

      const { data, error } = await HistoryService.searchFigures(query, filters)
      if (error) throw error
      searchResults.value = data || []

      // 记录搜索历史（如果有用户登录）
      // await HistoryService.recordSearchHistory(userId, query, data?.length || 0)
    } catch (error) {
      console.error('搜索失败:', error)
    } finally {
      isLoading.value = false
    }
  }

  const searchFiguresByAI = async (query: string) => {
    isLoading.value = true
    try {
      const { data, error } = await HistoryService.searchFiguresByAI(query)
      if (error) throw error
      searchResults.value = data || []
    } catch (error) {
      console.error('AI搜索失败:', error)
      // 回退到普通搜索
      await searchFigures(query)
    } finally {
      isLoading.value = false
    }
  }

  const loadFigureDetails = async (figureId: string) => {
    isLoading.value = true
    try {
      const { data, error } = await HistoryService.getFigureDetails(figureId)
      if (error) throw error
      currentFigure.value = data

      // 增加热度
      await HistoryService.incrementPopularity(figureId)
    } catch (error) {
      console.error('加载人物详情失败:', error)
    } finally {
      isLoading.value = false
    }
  }

  const loadFavorites = async (userId: string) => {
    try {
      const { data, error } = await HistoryService.getUserFavorites(userId)
      if (error) throw error
      favorites.value = data?.map(item => item.historical_figures) || []
    } catch (error) {
      console.error('加载收藏失败:', error)
    }
  }

  const toggleFavorite = async (userId: string, figureId: string) => {
    try {
      const { isFavorited } = await HistoryService.isFigureFavorited(userId, figureId)
      
      if (isFavorited) {
        await HistoryService.removeFromFavorites(userId, figureId)
        favorites.value = favorites.value.filter(fig => fig.id !== figureId)
      } else {
        await HistoryService.addToFavorites(userId, figureId)
        // 重新加载收藏列表
        await loadFavorites(userId)
      }
    } catch (error) {
      console.error('操作收藏失败:', error)
    }
  }

  const loadFiguresByPeriod = async (periodId: string) => {
    isLoading.value = true
    try {
      const { data, error } = await HistoryService.getFiguresByPeriod(periodId)
      if (error) throw error
      figures.value = data || []
    } catch (error) {
      console.error('加载时期人物失败:', error)
    } finally {
      isLoading.value = false
    }
  }

  const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = []
    selectedPeriod.value = ''
  }

  // 初始化
  const initialize = async () => {
    await Promise.all([
      loadPopularFigures(),
      loadPeriods()
    ])
  }

  return {
    // 状态
    figures,
    periods,
    currentFigure,
    searchResults,
    favorites,
    isLoading,
    searchQuery,
    selectedPeriod,
    searchHistory,

    // 计算属性
    popularFigures,
    timelineData,

    // 动作
    loadPopularFigures,
    loadPeriods,
    searchFigures,
    searchFiguresByAI,
    loadFigureDetails,
    loadFavorites,
    toggleFavorite,
    loadFiguresByPeriod,
    clearSearch,
    initialize
  }
})