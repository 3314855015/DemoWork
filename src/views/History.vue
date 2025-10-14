<template>
  <div class="history-page">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <i class="fas fa-crown text-indigo-600 text-xl"></i>
          <span class="text-lg font-bold text-gray-800">历史名人志</span>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <RouterLink to="/" class="text-gray-600 hover:text-indigo-600 transition-colors">返回首页</RouterLink>
          <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors">人物分类</a>
          <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors">热门人物</a>
          <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors">时间线</a>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <button class="!rounded-button whitespace-nowrap text-sm px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors">
            登录 / 注册
          </button>
          <button class="!rounded-button whitespace-nowrap p-2 text-gray-600 hover:text-indigo-600 transition-colors">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section 
      class="relative pt-24 pb-20 px-6 bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://ai-public.mastergo.com/ai/img_res/54538934ec7490cfeda8cc840ab8c951.jpg');"
    >
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      <div class="relative max-w-4xl mx-auto text-center py-20">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">探索历史名人</h1>
        <p class="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          发现那些改变世界的人物故事，穿越时空感受伟大灵魂的力量与智慧
        </p>
        <button class="!rounded-button whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-medium transition-colors">
          开始探索
        </button>
      </div>
    </section>

    <!-- Featured Figures Section -->
    <section class="py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">特色人物推荐</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Figure Card 1 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform">
            <div class="h-48 overflow-hidden">
              <img 
                src="https://ai-public.mastergo.com/ai/img_res/748cd4bf534805709361e0d0e72fd2be.jpg" 
                alt="孔子" 
                class="w-full h-full object-cover object-top"
              >
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-2">孔子</h3>
              <p class="text-gray-600 mb-4">
                春秋时期思想家、教育家，儒家学派创始人，被誉为"至圣先师"
              </p>
              <button class="!rounded-button whitespace-nowrap text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                了解更多
                <i class="fas fa-arrow-right ml-2 text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Figure Card 2 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform">
            <div class="h-48 overflow-hidden">
              <img 
                src="https://ai-public.mastergo.com/ai/img_res/d81dfd0b13aac92300582fd1493e5e35.jpg" 
                alt="达芬奇" 
                class="w-full h-full object-cover object-top"
              >
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-2">列奥纳多·达·芬奇</h3>
              <p class="text-gray-600 mb-4">
                文艺复兴时期博学家，画家、发明家、工程师，代表作《蒙娜丽莎》
              </p>
              <button class="!rounded-button whitespace-nowrap text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                了解更多
                <i class="fas fa-arrow-right ml-2 text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Figure Card 3 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform">
            <div class="h-48 overflow-hidden">
              <img 
                src="https://ai-public.mastergo.com/ai/img_res/aced606e406c9cf3bb146a2dfa65d6f7.jpg" 
                alt="居里夫人" 
                class="w-full h-full object-cover object-top"
              >
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-2">玛丽·居里</h3>
              <p class="text-gray-600 mb-4">
                物理学家、化学家，放射性研究先驱，首位获得诺贝尔奖的女性
              </p>
              <button class="!rounded-button whitespace-nowrap text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                了解更多
                <i class="fas fa-arrow-right ml-2 text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Preview Section -->
    <section class="py-16 bg-gray-100 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">历史时期概览</h2>
        <div class="flex flex-wrap justify-center gap-8">
          <!-- Timeline Item 1 -->
          <div class="bg-white rounded-xl shadow-md p-6 w-64 text-center cursor-pointer hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-landmark text-indigo-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">古代文明</h3>
            <p class="text-gray-600">
              公元前 3000 年 - 公元 476 年
            </p>
          </div>

          <!-- Timeline Item 2 -->
          <div class="bg-white rounded-xl shadow-md p-6 w-64 text-center cursor-pointer hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-chess-rook text-indigo-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">中世纪</h3>
            <p class="text-gray-600">
              公元 476 年 - 1453 年
            </p>
          </div>

          <!-- Timeline Item 3 -->
          <div class="bg-white rounded-xl shadow-md p-6 w-64 text-center cursor-pointer hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-industry text-indigo-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">近现代</h3>
            <p class="text-gray-600">
              公元 1453 年 - 至今
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12 px-6 mt-auto">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-xl font-bold mb-4">历史名人志</h3>
          <p class="text-gray-300">
            致力于记录和传播历史上杰出人物的生平事迹，传承人类文明的智慧结晶。
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-bold mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">人物分类</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">热门人物</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">时间线</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">关于我们</a></li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-xl font-bold mb-4">关注我们</h3>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
              <i class="fab fa-weibo"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
              <i class="fab fa-weixin"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
              <i class="fab fa-bilibili"></i>
            </a>
          </div>
          <p class="mt-4 text-gray-300">
            © 2023 历史名人志. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

/**
 * 历史人物页面组件
 * 展示历史名人信息和时间线
 */
</script>

<style scoped>
.history-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 自定义样式 */
.rounded-button {
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  outline: none;
}

@media (max-width: 768px) {
  .history-page {
    padding-top: 70px;
  }
}
</style>