# API代理部署说明

## 跨域问题解决方案

将n8n的调用从URL直接调用改为API调用确实可以解决跨域问题。具体实现如下：

### 1. 开发环境配置

在 `vite.config.ts` 中配置了代理：

```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://yjw123456.app.n8n.cloud',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '/webhook')
    }
  }
}
```

这样配置后：
- 前端调用 `/api/ai-chat` 
- Vite开发服务器自动转发到 `https://yjw123456.app.n8n.cloud/webhook/ai-chat`
- 避免了浏览器的跨域限制

### 2. 生产环境部署

生产环境需要根据部署平台配置API代理：

#### Vercel部署
在 `vercel.json` 中添加重写规则：

```json
{
  "rewrites": [
    {
      "source": "/api/ai-chat",
      "destination": "/api/ai-chat.js"
    }
  ]
}
```

#### 其他平台部署
需要配置相应的反向代理规则，将 `/api/ai-chat` 请求转发到n8n服务。

### 3. 修改后的前端代码

前端现在调用本地API端点：

```javascript
const localApiUrl = '/api/ai-chat'
```

### 4. 跨域问题解决原理

- **问题**：浏览器直接访问外部n8n URL会产生跨域请求
- **解决方案**：通过本地API代理转发请求
- **优势**：
  - 前端与后端同源，无跨域问题
  - 可以在代理层添加认证、缓存等逻辑
  - 更好的错误处理和日志记录

### 5. 测试方法

1. 启动开发服务器：`npm run dev`
2. 访问应用并测试聊天功能
3. 检查浏览器控制台，确认请求发送到 `/api/ai-chat`
4. 确认响应正常返回

### 6. 注意事项

- 确保n8n服务正常运行
- 生产环境需要正确配置代理规则
- 考虑添加请求频率限制和错误重试机制