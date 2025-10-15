<template>
  <div class="figure-card" @click="$emit('click', figure)">
    <div class="figure-image">
      <img 
        :src="figure.image_url || '/placeholder-figure.jpg'" 
        :alt="figure.name"
        @error="handleImageError"
      >
      <button 
        v-if="showFavorite && userId" 
        class="favorite-btn"
        @click.stop="toggleFavorite"
        :class="{ 'favorited': isFavorited }"
      >
        <i class="fas" :class="isFavorited ? 'fa-heart' : 'fa-heart-o'"></i>
      </button>
    </div>
    
    <div class="figure-content">
      <h3 class="figure-name">{{ figure.name }}</h3>
      
      <div class="figure-meta">
        <span class="period">{{ periodName }}</span>
        <span class="years" v-if="figure.birth_year || figure.death_year">
          {{ figure.birth_year }} - {{ figure.death_year }}
        </span>
      </div>
      
      <p class="figure-occupation" v-if="figure.occupation && figure.occupation.length">
        {{ figure.occupation.join(' · ') }}
      </p>
      
      <p class="figure-achievements" v-if="figure.achievements">
        {{ truncateText(figure.achievements, 100) }}
      </p>
      
      <div class="figure-actions">
        <button class="btn-primary" @click.stop="$emit('view-details', figure)">
          查看详情
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHistoryStore } from '@/stores/history'
import type { Database } from '@/lib/database.types'

type Figure = Database['public']['Tables']['historical_figures']['Row'] & {
  historical_periods: Database['public']['Tables']['historical_periods']['Row'] | null
}

interface Props {
  figure: Figure
  showFavorite?: boolean
  userId?: string
}

const props = withDefaults(defineProps<Props>(), {
  showFavorite: true
})

const emit = defineEmits<{
  click: [figure: Figure]
  viewDetails: [figure: Figure]
}>()

const historyStore = useHistoryStore()
const imageError = ref(false)

const periodName = computed(() => 
  props.figure.historical_periods?.name || '未知时期'
)

const isFavorited = computed(() => {
  if (!props.userId) return false
  return historyStore.favorites.some(fig => fig.id === props.figure.id)
})

const handleImageError = () => {
  imageError.value = true
}

const toggleFavorite = async () => {
  if (!props.userId) return
  await historyStore.toggleFavorite(props.userId, props.figure.id)
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
</script>

<style scoped>
.figure-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.figure-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.figure-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.figure-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.figure-card:hover .figure-image img {
  transform: scale(1.05);
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  background: white;
  transform: scale(1.1);
}

.favorite-btn.favorited {
  color: #e74c3c;
}

.figure-content {
  padding: 1.5rem;
}

.figure-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.figure-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #718096;
}

.period {
  background: #edf2f7;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.years {
  font-style: italic;
}

.figure-occupation {
  color: #4a5568;
  font-weight: 500;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.figure-achievements {
  color: #718096;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.figure-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-primary {
  background: #4299e1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;
}

.btn-primary:hover {
  background: #3182ce;
}

@media (max-width: 768px) {
  .figure-content {
    padding: 1rem;
  }
  
  .figure-name {
    font-size: 1.125rem;
  }
  
  .figure-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>