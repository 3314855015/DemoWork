<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

interface Props {
  content: string
}

const props = defineProps<Props>()

// 配置marked选项
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false
})

const renderedContent = computed(() => {
  try {
    // 简单的Markdown渲染
    let content = props.content
      .replace(/### (.*?)(?=\n|$)/g, '<h3 class="markdown-h3">$1</h3>')
      .replace(/## (.*?)(?=\n|$)/g, '<h2 class="markdown-h2">$1</h2>')
      .replace(/# (.*?)(?=\n|$)/g, '<h1 class="markdown-h1">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="markdown-code">$1</code>')
      .replace(/\n/g, '<br>')
      .replace(/- (.*?)(?=\n|$)/g, '<li class="markdown-li">$1</li>')
      .replace(/(<li.*?<\/li>)/g, '<ul class="markdown-ul">$1</ul>')
    
    // 处理数字列表
    content = content.replace(/(\d+)\. (.*?)(?=\n|$)/g, '<li class="markdown-li">$2</li>')
    content = content.replace(/(<li class="markdown-li">.*?<\/li>)/g, '<ol class="markdown-ol">$1</ol>')
    
    return content
  } catch (error) {
    console.error('Markdown渲染错误:', error)
    return props.content
  }
})
</script>

<style scoped>
.markdown-content {
  line-height: 1.6;
  word-wrap: break-word;
}

.markdown-content :deep(.markdown-h1) {
  font-size: 1.5em;
  font-weight: 700;
  margin: 1em 0 0.5em 0;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.3em;
}

.markdown-content :deep(.markdown-h2) {
  font-size: 1.3em;
  font-weight: 600;
  margin: 1.2em 0 0.5em 0;
  color: #4a5568;
}

.markdown-content :deep(.markdown-h3) {
  font-size: 1.1em;
  font-weight: 600;
  margin: 1em 0 0.3em 0;
  color: #718096;
}

.markdown-content :deep(.markdown-code) {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-content :deep(.markdown-ul),
.markdown-content :deep(.markdown-ol) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.markdown-content :deep(.markdown-li) {
  margin: 0.3em 0;
  line-height: 1.5;
}

.markdown-content :deep(strong) {
  font-weight: 600;
  color: #2d3748;
}

.markdown-content :deep(em) {
  font-style: italic;
  color: #4a5568;
}

/* 深色主题适配 */
.dark-theme .markdown-content :deep(.markdown-h1) {
  color: #f7fafc;
  border-bottom-color: #4a5568;
}

.dark-theme .markdown-content :deep(.markdown-h2) {
  color: #e2e8f0;
}

.dark-theme .markdown-content :deep(.markdown-h3) {
  color: #cbd5e0;
}

.dark-theme .markdown-content :deep(.markdown-code) {
  background: rgba(255, 255, 255, 0.1);
  color: #f7fafc;
}

.dark-theme .markdown-content :deep(strong) {
  color: #f7fafc;
}

.dark-theme .markdown-content :deep(em) {
  color: #e2e8f0;
}
</style>