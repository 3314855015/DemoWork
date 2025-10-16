<template>
  <div class="figure-detail-page">
    <main class="main-content" v-if="figure">
      <!-- 返回按钮 -->
      <div class="container">
        <button @click="$router.back()" class="back-btn">
          <i class="fas fa-arrow-left"></i>
          返回
        </button>
      </div>

      <!-- 人物详情头部 -->
      <section class="figure-header">
        <div class="container">
          <div class="header-content">
            <div class="figure-image">
              <img 
                :src="figure.image_url || '/placeholder-figure.jpg'" 
                :alt="figure.name"
                @error="handleImageError"
              />
            </div>
            
            <div class="figure-info">
              <h1 class="figure-name">{{ figure.name }}</h1>
              
              <div class="figure-meta">
                <div class="meta-item">
                  <i class="fas fa-clock"></i>
                  <span>{{ formatYears(figure.birth_year, figure.death_year) }}</span>
                </div>
                
                <div class="meta-item" v-if="figure.nationality">
                  <i class="fas fa-globe"></i>
                  <span>{{ figure.nationality }}</span>
                </div>
                
                <div class="meta-item" v-if="figure.historical_periods">
                  <i class="fas fa-landmark"></i>
                  <span>{{ figure.historical_periods.name }}</span>
                </div>
              </div>

              <div class="occupation-tags" v-if="figure.occupation && figure.occupation.length">
                <span 
                  v-for="occupation in figure.occupation" 
                  :key="occupation"
                  class="occupation-tag"
                >
                  {{ occupation }}
                </span>
              </div>

              <div class="header-actions">
                <button 
                  v-if="authStore.user"
                  @click="toggleFavorite"
                  class="favorite-btn"
                  :class="{ 'favorited': isFavorited }"
                >
                  <i class="fas" :class="isFavorited ? 'fa-heart' : 'fa-heart-o'"></i>
                  {{ isFavorited ? '已收藏' : '收藏' }}
                </button>
                
                <button class="share-btn">
                  <i class="fas fa-share"></i>
                  分享
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 人物内容 -->
      <section class="figure-content">
        <div class="container">
          <div class="content-grid">
            <!-- 主要信息 -->
            <div class="main-info">
              <!-- 生平简介 -->
              <div class="info-section">
                <h2 class="section-title">生平简介</h2>
                <div class="biography-content">
                  <p>{{ figure.biography }}</p>
                </div>
              </div>

              <!-- 主要成就 -->
              <div class="info-section" v-if="figure.achievements">
                <h2 class="section-title">主要成就</h2>
                <div class="achievements-content">
                  <p>{{ figure.achievements }}</p>
                </div>
              </div>
            </div>

            <!-- 侧边栏 -->
            <div class="sidebar">
              <!-- 相关人物 -->
              <div class="sidebar-section" v-if="relatedFigures.length > 0">
                <h3 class="sidebar-title">相关人物</h3>
                <div class="related-figures">
                  <div 
                    v-for="related in relatedFigures" 
                    :key="related.id"
                    class="related-figure"
                    @click="viewRelatedFigure(related)"
                  >
                    <img 
                      :src="related.image_url || '/placeholder-figure.jpg'" 
                      :alt="related.name"
                      class="related-image"
                    />
                    <div class="related-info">
                      <h4>{{ related.name }}</h4>
                      <p>{{ related.relationship_type }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 时期信息 -->
              <div class="sidebar-section" v-if="figure.historical_periods">
                <h3 class="sidebar-title">历史时期</h3>
                <div class="period-info">
                  <h4>{{ figure.historical_periods.name }}</h4>
                  <p>{{ figure.historical_periods.description }}</p>
                  <div class="period-years">
                    {{ formatYears(figure.historical_periods.start_year, figure.historical_periods.end_year) }}
                  </div>
                </div>
              </div>

              <!-- 统计信息 -->
              <div class="sidebar-section">
                <h3 class="sidebar-title">统计信息</h3>
                <div class="stats">
                  <div class="stat-item">
                    <span class="stat-label">热度</span>
                    <span class="stat-value">{{ figure.popularity_score }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 加载状态 -->
    <div v-else-if="isLoading" class="loading-container">
      <LoadingSpinner />
      <p>加载人物详情中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-container">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>加载失败</h3>
      <p>{{ error }}</p>
      <button @click="$router.back()" class="back-btn">返回列表</button>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHistoryStore } from '@/stores/history'
import { useAuthStore } from '@/stores/auth'
import AppFooter from '@/components/AppFooter.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import type { Database } from '@/lib/database.types'

type Figure = Database['public']['Tables']['historical_figures']['Row'] & {
  historical_periods: Database['public']['Tables']['historical_periods']['Row'] | null
  figure_relationships?: any[]
}

const route = useRoute()
const router = useRouter()
const historyStore = useHistoryStore()
const authStore = useAuthStore()

const figure = ref<Figure | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const relatedFigures = ref<any[]>([])

const isFavorited = computed(() => {
  if (!authStore.user) return false
  return historyStore.favorites.some(fig => fig.id === figure.value?.id)
})

// 格式化年份显示
const formatYears = (startYear: number | null, endYear: number | null) => {
  if (!startYear && !endYear) return '时间未知'
  
  const formatYear = (year: number | null) => {
    if (!year) return ''
    return year < 0 ? `${Math.abs(year)} 公元前` : `${year} 年`
  }
  
  const start = formatYear(startYear)
  const end = formatYear(endYear)
  
  if (start && end) return `${start} - ${end}`
  if (start) return `始于 ${start}`
  if (end) return `终于 ${end}`
  return '时间未知'
}

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder-figure.jpg'
}

// 切换收藏
const toggleFavorite = async () => {
  if (!authStore.user || !figure.value) return
  
  await historyStore.toggleFavorite(authStore.user.id, figure.value.id)
}

// 查看相关人物
const viewRelatedFigure = (relatedFigure: any) => {
  router.push(`/figure/${relatedFigure.id}`)
}

// 加载人物详情
const loadFigureDetails = async () => {
  const figureId = route.params.id as string
  if (!figureId) {
    error.value = '人物ID无效'
    isLoading.value = false
    return
  }

  try {
    await historyStore.loadFigureDetails(figureId)
    figure.value = historyStore.currentFigure
    
    if (!figure.value) {
      error.value = '人物不存在'
      return
    }

    // 加载相关人物（这里简化处理，实际应该从API获取）
    if (figure.value.figure_relationships) {
      relatedFigures.value = figure.value.figure_relationships.map(rel => ({
        ...rel.historical_figures,
        relationship_type: rel.relationship_type
      }))
    }
  } catch (err) {
    error.value = '加载人物详情失败'
    console.error('加载人物详情失败:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadFigureDetails()
})
</script>

<style scoped>
.figure-detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 返回按钮 */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 2rem 0;
}

.back-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

/* 人物头部 */
.figure-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
}

.header-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  align-items: center;
}

.figure-image {
  width: 300px;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.figure-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.figure-info {
  padding: 1rem 0;
}

.figure-name {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.figure-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.occupation-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.occupation-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.favorite-btn, .share-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.favorite-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.favorite-btn.favorited {
  background: #e74c3c;
}

.favorite-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.favorite-btn.favorited:hover {
  background: #c0392b;
}

.share-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
}

.share-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* 内容区域 */
.figure-content {
  padding: 4rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

/* 主要信息 */
.main-info {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.info-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.biography-content p,
.achievements-content p {
  line-height: 1.8;
  color: #4a5568;
  font-size: 1.1rem;
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

/* 相关人物 */
.related-figures {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-figure {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.related-figure:hover {
  background: #f7fafc;
}

.related-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.related-info h4 {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  color: #2d3748;
}

.related-info p {
  margin: 0;
  color: #718096;
  font-size: 0.9rem;
}

/* 时期信息 */
.period-info h4 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-weight: 600;
}

.period-info p {
  margin: 0 0 1rem 0;
  color: #718096;
  line-height: 1.5;
}

.period-years {
  color: #4299e1;
  font-weight: 500;
}

/* 统计信息 */
.stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  color: #718096;
}

.stat-value {
  font-weight: 600;
  color: #2d3748;
}

/* 加载和错误状态 */
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 4rem 2rem;
  text-align: center;
}

.error-container i {
  font-size: 4rem;
  color: #e74c3c;
  margin-bottom: 1rem;
}

.error-container h3 {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
}

.error-container p {
  color: #718096;
  margin-bottom: 2rem;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .header-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .figure-image {
    margin: 0 auto;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .figure-name {
    font-size: 2rem;
  }
  
  .figure-meta {
    justify-content: center;
  }
  
  .header-actions {
    justify-content: center;
  }
  
  .figure-image {
    width: 250px;
    height: 300px;
  }
}

@media (max-width: 480px) {
  .figure-header {
    padding: 2rem 0;
  }
  
  .figure-name {
    font-size: 1.75rem;
  }
  
  .header-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .figure-content {
    padding: 2rem 0;
  }
  
  .info-section {
    padding: 1.5rem;
  }
}
</style>