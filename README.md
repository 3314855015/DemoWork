# 历史人物展示平台

基于 Vue 3 + TypeScript + Vite + Supabase 构建的现代化历史人物展示平台。

## ✨ 特性

- 🎯 **TypeScript** - 完整的类型安全支持
- ⚡️ **Vue 3** - 使用最新的 Composition API 和 `<script setup>` 语法糖
- 🚀 **Vite** - 极速的开发构建工具，支持热重载
- 🛣️ **Vue Router 4** - 官方路由管理器，支持路由守卫和懒加载
- 🗃️ **Pinia** - 现代化状态管理库，替代 Vuex
- 🎨 **响应式设计** - 适配各种屏幕尺寸
- 🌙 **主题切换** - 支持浅色/深色主题
- 📱 **移动端友好** - 完整的移动端适配
- 🔧 **开发工具** - ESLint、TypeScript 检查等
- 🗄️ **Supabase** - 实时数据库和用户认证
- 🔍 **智能搜索** - 向量相似度搜索功能
- 💾 **数据管理** - 完整的历史人物数据系统

## 🏗️ 项目架构

### 目录结构

```
poem/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 可复用组件
│   │   ├── AppHeader.vue      # 应用头部导航
│   │   ├── AppFooter.vue      # 应用页脚
│   │   ├── FeatureCard.vue    # 功能卡片组件
│   │   ├── CounterDisplay.vue # 计数器显示组件
│   │   ├── CounterControls.vue # 计数器控制组件
│   │   ├── MessageInput.vue   # 消息输入组件
│   │   ├── PageTitle.vue      # 页面标题组件
│   │   ├── WelcomeSection.vue # 欢迎区域组件
│   │   ├── LoadingSpinner.vue # 加载指示器
│   │   └── FigureCard.vue     # 历史人物卡片组件
│   ├── views/              # 页面组件
│   │   ├── Home.vue           # 首页
│   │   ├── Counter.vue        # 计数器页面
│   │   ├── About.vue          # 关于页面
│   │   ├── History.vue        # 历史人物页面
│   │   └── FigureDetail.vue   # 人物详情页面
│   ├── stores/             # Pinia 状态管理
│   │   ├── app.ts             # 应用全局状态
│   │   ├── counter.ts         # 计数器状态
│   │   └── history.ts         # 历史人物状态
│   ├── lib/                # 工具函数和配置
│   │   ├── supabase.ts        # Supabase 客户端配置
│   │   ├── database.types.ts   # 数据库类型定义
│   │   ├── history-service.ts  # 历史人物服务
│   │   └── ai-service.ts       # AI 服务
│   ├── router/             # 路由配置
│   │   └── index.ts           # 路由定义和守卫
│   ├── App.vue             # 根组件
│   ├── main.ts             # 应用入口
│   └── style.css           # 全局样式
├── supabase/              # 数据库配置
│   ├── migrations/          # 数据库迁移文件
│   └── seed_data.sql        # 示例数据
├── index.html              # HTML 模板
├── package.json            # 项目配置和依赖
├── tsconfig.json           # TypeScript 配置
├── tsconfig.node.json      # Node.js TypeScript 配置
├── vite.config.js          # Vite 构建配置
├── env.d.ts                # 环境类型声明
└── README.md               # 项目文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0
- Supabase 账户

### 安装依赖

```bash
npm install
```

### 环境配置

复制 `.env.example` 为 `.env` 并配置你的 Supabase 信息：
```bash
cp .env.example .env
```

编辑 `.env` 文件：
```env
VITE_SUPABASE_URL=你的 Supabase 项目 URL
VITE_SUPABASE_ANON_KEY=你的 Supabase Anon Key
```

### 数据库设置

1. 在 Supabase 控制台创建新项目
2. 执行 `supabase/migrations/001_create_historical_figures.sql` 创建表结构
3. 执行 `supabase/seed_data.sql` 插入示例数据

### 启动开发服务器

```bash
npm run dev
```

项目将在 http://localhost:3000 启动，支持热重载开发。

### 类型检查

```bash
npm run type-check
```

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产构建

```bash
npm run preview
```

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

## 📚 功能说明

### 🏠 首页 (Home)
- **用途**: 应用的主入口页面，展示项目特性和导航
- **功能**: 
  - 欢迎区域显示
  - 功能卡片导航
  - 主题切换演示
- **组件**: `WelcomeSection`、`FeatureCard`

### 🔢 计数器页面 (Counter)
- **用途**: 演示状态管理和组件通信
- **功能**:
  - 计数器增减操作
  - 实时计算双倍值
  - 奇偶数判断
  - 消息输入和统计
- **状态管理**: 使用 Pinia 管理计数器状态
- **组件**: `CounterDisplay`、`CounterControls`、`MessageInput`

### 📚 历史人物页面 (History)
- **用途**: 展示历史人物列表和搜索功能
- **功能**:
  - 历史人物列表展示
  - 智能搜索和筛选
  - 分类浏览
  - 收藏功能
- **状态管理**: 使用 Pinia 管理历史人物状态
- **组件**: `FigureCard`、搜索组件

### 👤 人物详情页面 (FigureDetail)
- **用途**: 展示单个历史人物的详细信息
- **功能**:
  - 完整人物信息展示
  - 相关人物推荐
  - 用户收藏管理
  - 分享功能
- **数据**: 从 Supabase 实时获取数据

### 📖 关于页面 (About)
- **用途**: 展示项目技术栈、架构和特性
- **功能**:
  - 技术栈介绍
  - 项目结构说明
  - 特性列表展示
- **组件**: `PageTitle`

### 🧭 导航系统
- **路由管理**: Vue Router 4 with TypeScript
- **路由守卫**: 自动设置页面标题
- **懒加载**: 所有页面组件支持按需加载
- **导航栏**: 响应式设计，支持移动端菜单

### 🎨 主题系统
- **状态管理**: Pinia store 管理主题状态
- **主题切换**: 支持浅色/深色主题
- **响应式**: 所有组件适配不同主题
- **持久化**: 主题选择可扩展为本地存储

### 🗄️ 数据管理系统
- **Supabase 集成**: 实时数据库和用户认证
- **类型安全**: 自动生成的数据库类型定义
- **向量搜索**: 支持智能相似度搜索
- **用户收藏**: 完整的用户收藏功能
- **数据关系**: 人物关系网络展示

### 🔍 搜索功能
- **关键词搜索**: 传统文本搜索
- **向量搜索**: AI驱动的语义搜索
- **多条件筛选**: 按时期、职业等筛选
- **实时结果**: 搜索结果即时更新

## 🛠️ 开发指南

### 组件开发规范

1. **组件命名**: 使用 PascalCase 命名
2. **文件组织**: 按功能模块组织文件
3. **类型定义**: 使用 TypeScript 接口定义 Props 和 Emits
4. **代码注释**: 每个组件和函数都有详细注释
5. **样式作用域**: 使用 `scoped` 样式避免污染

### 状态管理最佳实践

1. **Store 组织**: 按功能模块分离 store
2. **Composition API**: 使用 `setup()` 语法定义 store
3. **类型安全**: 完整的 TypeScript 支持
4. **计算属性**: 合理使用 computed 优化性能

### 路由配置

```typescript
// 路由定义示例
{
  path: '/counter',
  name: 'Counter',
  component: () => import('@/views/Counter.vue'),
  meta: {
    title: '计数器演示'
  }
}
```

### 组件通信模式

1. **Props Down**: 父组件向子组件传递数据
2. **Events Up**: 子组件通过事件向父组件通信
3. **Store**: 跨组件状态共享使用 Pinia
4. **Provide/Inject**: 深层组件通信

## 🔧 配置说明

### TypeScript 配置
- 严格类型检查
- 路径别名 `@/*` 指向 `src/*`
- Vue 文件类型声明

### Vite 配置
- 路径别名配置
- 插件集成
- 开发服务器配置

### 构建优化
- 代码分割
- 资源压缩
- Tree Shaking

## 🎯 最佳实践

1. **组件设计**
   - 单一职责原则
   - 可复用性考虑
   - 合理的组件拆分

2. **状态管理**
   - 最小化状态
   - 合理使用计算属性
   - 避免不必要的响应式

3. **性能优化**
   - 路由懒加载
   - 组件按需导入
   - 合理使用 v-memo

4. **代码质量**
   - TypeScript 类型检查
   - 详细的代码注释
   - 统一的代码风格

## 🚀 部署指南

### Vercel 部署
1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 配置环境变量：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. 部署并测试功能

### Supabase 配置
确保启用以下功能：
- **行级安全策略 (RLS)**: 保护数据安全
- **用户认证**: 支持用户注册登录
- **存储桶权限**: 图片上传和访问控制
- **向量扩展**: 启用 `vector` 扩展支持智能搜索

### 数据库迁移
1. 在 Supabase SQL 编辑器中执行迁移文件
2. 插入示例数据测试功能
3. 配置适当的 RLS 策略
4. 测试 API 接口

## 🚀 扩展建议

1. **测试集成**: 添加 Vitest 单元测试
2. **UI 库**: 集成 Element Plus 或 Ant Design Vue
3. **状态持久化**: 添加 localStorage 支持
4. **国际化**: 集成 Vue I18n
5. **PWA**: 添加 Service Worker 支持
6. **AI 增强**: 集成更多 AI 功能
7. **社交功能**: 添加评论和分享功能
8. **数据分析**: 用户行为分析

## 📄 技术栈详情

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.3+ | 前端框架 |
| TypeScript | 5.0+ | 类型系统 |
| Vite | 4.0+ | 构建工具 |
| Vue Router | 4.2+ | 路由管理 |
| Pinia | 2.1+ | 状态管理 |
| Vue TSC | 1.8+ | 类型检查 |

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📞 支持与反馈

如有问题或建议，请创建 Issue 或联系开发团队。

---

**项目状态**: ✅ 生产就绪  
**最后更新**: 2024年10月
**维护者**: Vue 开发团队