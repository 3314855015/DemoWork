# Vue 脚手架项目

这是一个基于 **Vue 3 + TypeScript + Vite** 构建的现代化脚手架项目，遵循 Vue.js 最佳实践，提供完整的开发解决方案。

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
│   │   └── LoadingSpinner.vue # 加载指示器
│   ├── views/              # 页面组件
│   │   ├── Home.vue           # 首页
│   │   ├── Counter.vue        # 计数器页面
│   │   └── About.vue          # 关于页面
│   ├── stores/             # Pinia 状态管理
│   │   ├── app.ts             # 应用全局状态
│   │   └── counter.ts         # 计数器状态
│   ├── router/             # 路由配置
│   │   └── index.ts           # 路由定义和守卫
│   ├── App.vue             # 根组件
│   ├── main.ts             # 应用入口
│   └── style.css           # 全局样式
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

### 安装依赖

```bash
npm install
```

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

## 🚀 扩展建议

1. **测试集成**: 添加 Vitest 单元测试
2. **UI 库**: 集成 Element Plus 或 Ant Design Vue
3. **状态持久化**: 添加 localStorage 支持
4. **国际化**: 集成 Vue I18n
5. **PWA**: 添加 Service Worker 支持
6. **部署**: 配置 CI/CD 流水线

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