<template>
  <div class="history-page">
    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">探索历史名人</h1>
          <p class="hero-subtitle">
            发现那些改变世界的人物故事，穿越时空感受伟大灵魂的力量与智慧
          </p>
          
          <!-- 搜索框 -->
          <div class="search-container">
            <div class="search-box">
              <i class="fas fa-search search-icon"></i>
              <input
                v-model="historyStore.searchQuery"
                @input="handleSearch"
                type="text"
                placeholder="搜索历史人物..."
                class="search-input"
              />
              <select v-model="historyStore.selectedPeriod" @change="handleSearch" class="period-filter">
                <option value="">全部时期</option>
                <option v-for="period in historyStore.periods" :key="period.id" :value="period.id">
                  {{ period.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- 加载状态 -->
      <div v-if="historyStore.isLoading" class="loading-section">
        <LoadingSpinner />
        <p>加载中...</p>
      </div>

      <!-- 搜索结果 -->
      <section v-else-if="historyStore.searchResults.length > 0" class="search-results-section">
        <div class="container">
          <h2 class="section-title">搜索结果 ({{ historyStore.searchResults.length }})</h2>
          <div class="figures-grid">
            <FigureCard
              v-for="figure in historyStore.searchResults"
              :key="figure.id"
              :figure="figure"
              @view-details="viewFigureDetails"
            />
          </div>
        </div>
      </section>

      <!-- 热门人物 -->
      <section v-else class="popular-figures-section">
        <div class="container">
          <h2 class="section-title">热门历史人物</h2>
          <div class="figures-grid">
            <FigureCard
              v-for="figure in historyStore.popularFigures"
              :key="figure.id"
              :figure="figure"
              @view-details="viewFigureDetails"
            />
          </div>
        </div>
      </section>

      <!-- 历史时期 -->
      <section class="periods-section">
        <div class="container">
          <h2 class="section-title">历史时期概览</h2>
          <div class="periods-grid">
            <div
              v-for="period in historyStore.periods"
              :key="period.id"
              class="period-card"
              @click="viewPeriodFigures(period.id)"
            >
              <div class="period-icon">
                <i :class="getPeriodIcon(period.name)"></i>
              </div>
              <h3 class="period-name">{{ period.name }}</h3>
              <p class="period-years">
                {{ formatYears(period.start_year, period.end_year) }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 应用页脚 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useHistoryStore } from '@/stores/history'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import FigureCard from '@/components/FigureCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

/**
 * 历史人物页面组件
 * 展示历史名人信息和时间线，支持搜索和筛选
 */

const router = useRouter()
const historyStore = useHistoryStore()

// 处理搜索（防抖）
let searchTimeout: NodeJS.Timeout
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (historyStore.searchQuery.trim()) {
      historyStore.searchFigures()
    } else {
      historyStore.searchResults = []
    }
  }, 500)
}

// 查看人物详情
const viewFigureDetails = (figure: any) => {
  router.push(`/figure/${figure.id}`)
}

// 查看时期人物
const viewPeriodFigures = (periodId: string) => {
  historyStore.selectedPeriod = periodId
  historyStore.searchQuery = ''
  historyStore.loadFiguresByPeriod(periodId)
}

// 获取时期图标
const getPeriodIcon = (periodName: string) => {
  const icons: { [key: string]: string } = {
    '古代文明': 'fas fa-landmark',
    '中世纪': 'fas fa-chess-rook',
    '文艺复兴': 'fas fa-palette',
    '近现代': 'fas fa-industry',
    '当代': 'fas fa-globe'
  }
  return icons[periodName] || 'fas fa-history'
}

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

// 监听搜索查询变化
watch(() => historyStore.searchQuery, handleSearch)

// 初始化数据
onMounted(async () => {
  await historyStore.initialize()
})
</script>

<style scoped>
.history-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* Hero Section */
.hero-section {
  position: relative;
  background-image: url('https://ai-public.mastergo.com/ai/img_res/54538934ec7490cfeda8cc840ab8c951.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 120px 2rem 80px;
  text-align: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  z-index: 1;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.6;
}

/* 搜索框样式 */
.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.search-icon {
  color: #6b7280;
  margin: 0 1rem;
  align-self: center;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.75rem 0;
}

.period-filter {
  border: none;
  border-left: 1px solid #e5e7eb;
  padding: 0 1rem;
  background: white;
  outline: none;
  cursor: pointer;
}

/* 容器样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 章节样式 */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1f2937;
}

/* 加载状态 */
.loading-section {
  text-align: center;
  padding: 4rem 0;
  color: #6b7280;
}

/* 网格布局 */
.figures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.periods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

/* 时期卡片 */
.period-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.period-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.period-icon {
  width: 80px;
  height: 80px;
  background: #e0f2fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.period-icon i {
  font-size: 2rem;
  color: #0284c7;
}

.period-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.period-years {
  color: #6b7280;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .search-box {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .period-filter {
    border-left: none;
    border-top: 1px solid #e5e7eb;
  }
  
  .figures-grid {
    grid-template-columns: 1fr;
  }
  
  .periods-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 100px 1rem 60px;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>