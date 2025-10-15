# Supabase 配置说明

## 项目概述

本项目使用 Supabase 作为后端服务，提供完整的认证、数据库、存储和实时功能。

## 环境配置

### 1. 创建环境变量文件

复制 `.env.example` 为 `.env` 并填写实际配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# Supabase配置
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI配置（用于AI功能）
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 2. 获取 Supabase 配置

1. 访问 [Supabase官网](https://supabase.com) 并创建项目
2. 在项目设置中获取：
   - Project URL
   - anon public key

### 3. 安装依赖

```bash
npm install
```

## 数据库设置

### 1. 表结构

项目需要以下核心数据表：

- `profiles` - 用户基本信息
- `companies` - 公司信息  
- `job_postings` - 职位发布
- `resumes` - 简历信息（支持向量嵌入）
- `applications` - 职位申请记录
- `messages` - 消息记录
- `knowledge_base_chunks` - 知识库向量数据

### 2. 向量搜索功能

启用 pgvector 扩展以支持 AI 相似度搜索：

```sql
-- 在 Supabase SQL 编辑器中执行
create extension if not exists vector;
```

### 3. 存储桶设置

创建以下存储桶：
- `resumes` - 存储简历文件
- `company-logos` - 存储公司logo

## 功能模块

### 认证模块 (`src/lib/auth.ts`)
- 用户注册/登录/登出
- 密码重置
- 认证状态管理

### 存储模块 (`src/lib/storage.ts`)
- 文件上传/下载
- 简历和logo管理

### AI 服务 (`src/lib/ai-service.ts`)
- 文本嵌入生成
- 简历优化
- 职位匹配分析
- AI消息生成

### 数据库操作 (`src/lib/db-operations.ts`)
- CRUD 操作封装
- 实时订阅
- 复杂查询

### Store 集成 (`src/stores/auth.ts`)
- Pinia 状态管理
- 响应式认证状态

## 使用示例

### 用户认证

```typescript
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// 注册
await authStore.signUp('user@example.com', 'password', {
  full_name: '张三',
  role: 'candidate'
})

// 登录
await authStore.signIn('user@example.com', 'password')

// 登出
await authStore.signOut()
```

### 数据库操作

```typescript
import { DBOperations } from '@/lib/db-operations'

// 创建职位
const job = await DBOperations.createJobPosting({
  company_id: 'company-uuid',
  title: '前端工程师',
  description: '职位描述...',
  requirements: ['Vue', 'TypeScript'],
  employment_type: 'full-time'
})

// 搜索职位
const jobs = await DBOperations.searchJobPostings('前端', {
  location: '北京',
  employment_type: 'full-time'
})
```

### AI 功能

```typescript
import { AIService } from '@/lib/ai-service'

// 优化简历
const optimizedResume = await AIService.optimizeResume(
  resumeContent,
  jobDescription
)

// 职位匹配
const matchedJobs = await AIService.matchJobsWithResume(resumeContent)
```

## 安全配置

### 1. RLS (行级安全策略)

确保为所有表启用 RLS 并配置适当的策略：

```sql
-- 示例：profiles 表策略
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的profile
CREATE POLICY "用户只能查看自己的profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- 用户只能更新自己的profile  
CREATE POLICY "用户只能更新自己的profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 2. 存储策略

为存储桶配置安全策略：

```sql
-- resumes 存储桶策略
CREATE POLICY "用户只能访问自己的简历" ON storage.objects
  FOR ALL USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 部署说明

### Vercel 部署

1. 在 Vercel 项目中配置环境变量
2. 确保构建命令正确：
   ```json
   {
     "buildCommand": "npm run build"
   }
   ```

### 本地开发

```bash
# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 构建生产版本
npm run build
```

## 故障排除

### 常见问题

1. **环境变量未加载**
   - 检查 `.env` 文件是否存在且格式正确
   - 确保变量名以 `VITE_` 开头

2. **认证错误**
   - 验证 Supabase URL 和密钥是否正确
   - 检查 RLS 策略配置

3. **向量搜索失败**
   - 确认 pgvector 扩展已启用
   - 检查嵌入向量维度匹配

### 调试技巧

```typescript
// 启用详细日志
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true
  }
})
```

## 扩展建议

1. **性能优化**
   - 实现数据分页
   - 添加缓存层
   - 优化向量搜索参数

2. **功能扩展**
   - 添加邮件通知
   - 实现支付集成
   - 扩展 AI 功能

3. **监控告警**
   - 集成错误监控
   - 设置性能指标
   - 配置日志收集