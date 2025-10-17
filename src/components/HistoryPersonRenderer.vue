<template>
  <div class="history-person-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  content: string
}

const props = defineProps<Props>()

const renderedContent = computed(() => {
  try {
    let content = props.content
    
    // 处理历史人物信息的特殊格式
    content = content
      // 处理基本信息表格格式（如：**姓名**：诸葛亮）
      .replace(/\*\*([^:]+):\*\*\s*(.+)/g, '<div class="info-row"><span class="info-label">$1：</span><span class="info-value">$2</span></div>')
      
      // 处理标题
      .replace(/^# (.+)$/gm, '<div class="section-title">$1</div>')
      .replace(/^## (.+)$/gm, '<div class="subsection-title">$1</div>')
      .replace(/^### (.+)$/gm, '<div class="subsubsection-title">$1</div>')
      
      // 处理列表项
      .replace(/^- (.+)$/gm, '<div class="list-item">• $1</div>')
      .replace(/^(\d+)\. (.+)$/gm, '<div class="list-item"><span class="list-number">$1.</span> $2</div>')
      
      // 处理加粗文本
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      
      // 处理斜体文本
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      
      // 处理引用
      .replace(/^> (.+)$/gm, '<div class="quote">$1</div>')
      
      // 处理换行
      .replace(/\n/g, '<br>')
      
      // 处理分割线
      .replace(/^-{3,}$/gm, '<hr class="divider">')
    
    return content
  } catch (error) {
    console.error('历史人物信息渲染错误:', error)
    return props.content
  }
})
</script>

<style scoped>
.history-person-content {
  line-height: 1.7;
  word-wrap: break-word;
  font-size: 0.95rem;
}

.history-person-content :deep(.section-title) {
  font-size: 1.4em;
  font-weight: 700;
  margin: 1.2em 0 0.6em 0;
  color: #2d3748;
  border-bottom: 3px solid #667eea;
  padding-bottom: 0.4em;
  text-align: center;
}

.history-person-content :deep(.subsection-title) {
  font-size: 1.2em;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  color: #4a5568;
  border-left: 4px solid #764ba2;
  padding-left: 0.8em;
}

.history-person-content :deep(.subsubsection-title) {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0.8em 0 0.4em 0;
  color: #718096;
}

.history-person-content :deep(.info-row) {
  display: flex;
  margin: 0.5em 0;
  padding: 0.6em;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
  border-left: 3px solid #667eea;
}

.history-person-content :deep(.info-label) {
  font-weight: 600;
  color: #4a5568;
  min-width: 80px;
  margin-right: 1em;
}

.history-person-content :deep(.info-value) {
  color: #2d3748;
  flex: 1;
}

.history-person-content :deep(.list-item) {
  margin: 0.4em 0;
  padding: 0.3em 0;
  line-height: 1.6;
}

.history-person-content :deep(.list-number) {
  font-weight: 600;
  color: #667eea;
  margin-right: 0.5em;
}

.history-person-content :deep(.quote) {
  background: rgba(118, 75, 162, 0.05);
  border-left: 4px solid #764ba2;
  padding: 0.8em 1em;
  margin: 1em 0;
  border-radius: 4px;
  font-style: italic;
  color: #4a5568;
}

.history-person-content :deep(.divider) {
  border: none;
  border-top: 2px solid #e2e8f0;
  margin: 1.5em 0;
}

.history-person-content :deep(strong) {
  font-weight: 600;
  color: #2d3748;
  background: linear-gradient(120deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.history-person-content :deep(em) {
  font-style: italic;
  color: #718096;
}

/* 深色主题适配 */
.dark-theme .history-person-content :deep(.section-title) {
  color: #f7fafc;
  border-bottom-color: #818cf8;
}

.dark-theme .history-person-content :deep(.subsection-title) {
  color: #e2e8f0;
  border-left-color: #a78bfa;
}

.dark-theme .history-person-content :deep(.subsubsection-title) {
  color: #cbd5e0;
}

.dark-theme .history-person-content :deep(.info-row) {
  background: rgba(129, 140, 248, 0.1);
  border-left-color: #818cf8;
}

.dark-theme .history-person-content :deep(.info-label) {
  color: #e2e8f0;
}

.dark-theme .history-person-content :deep(.info-value) {
  color: #f7fafc;
}

.dark-theme .history-person-content :deep(.list-number) {
  color: #818cf8;
}

.dark-theme .history-person-content :deep(.quote) {
  background: rgba(167, 139, 250, 0.1);
  border-left-color: #a78bfa;
  color: #e2e8f0;
}

.dark-theme .history-person-content :deep(.divider) {
  border-top-color: #4a5568;
}

.dark-theme .history-person-content :deep(strong) {
  color: #f7fafc;
}

.dark-theme .history-person-content :deep(em) {
  color: #cbd5e0;
}
</style>