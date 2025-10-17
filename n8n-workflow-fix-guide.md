# n8n工作流数据格式修复指南

## 问题描述
当前n8n返回的数据格式不正确：
- `response`字段显示为`[object Object]`而不是实际AI回复内容
- `sessionId`字段为空

## 根本原因
这是因为n8n工作流中数据引用路径配置错误。AI模型节点的输出需要正确引用到Respond to Webhook节点。

## 修复步骤

### 1. 检查AI模型节点的输出结构
在AI模型节点中，确保正确配置了输出字段：

**AI模型节点配置：**
- 模型：选择适当的AI模型（如GPT-4、Claude等）
- 系统提示：设置适当的系统提示
- 用户消息：引用Webhook节点的输入数据

### 2. 正确配置Respond to Webhook节点

**当前错误配置：**
```json
{
  "response": "{{$json}}",
  "status": "success",
  "timestamp": "{{$now}}",
  "sessionId": "{{$json.sessionId}}"
}
```

**正确配置：**
```json
{
  "response": "{{$json.ai_response}}",  // 引用AI模型节点的实际输出
  "status": "success",
  "timestamp": "{{$now}}",
  "sessionId": "{{$json.sessionId || $executionId}}"  // 使用执行ID作为会话ID
}
```

### 3. 具体配置示例

**Webhook节点配置：**
- 方法：POST
- 路径：/ai-chat

**AI模型节点配置：**
- 输入数据：`{{$json.input}}`（来自Webhook节点的用户输入）
- 输出字段映射：
  - `ai_response`: `{{$json.choices[0].message.content}}` 或模型的实际输出路径
  - `sessionId`: `{{$executionId}}`

**Respond to Webhook节点配置：**
```json
{
  "response": "{{$json.ai_response}}",
  "status": "success",
  "timestamp": "{{$now}}",
  "sessionId": "{{$json.sessionId}}"
}
```

### 4. 调试技巧

1. **使用Debug模式**：在n8n工作流中启用调试模式，查看每个节点的实际输出
2. **检查数据路径**：确保引用路径正确，如`{{$json.字段名}}`
3. **测试单个节点**：单独测试AI模型节点，确认其输出格式

### 5. 完整的工作流JSON配置

```json
{
  "name": "AI Chat Workflow",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "httpMethod": "POST",
        "path": "ai-chat"
      }
    },
    {
      "name": "AI Model",
      "type": "n8n-nodes-base.aiLanguageModel",
      "parameters": {
        "model": "gpt-4",
        "prompt": "{{$json.input}}",
        "systemMessage": "你是一个有用的AI助手"
      }
    },
    {
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "parameters": {
        "responseMode": "responseNode",
        "responseData": {
          "response": "{{$json.choices[0].message.content}}",
          "status": "success",
          "timestamp": "{{$now}}",
          "sessionId": "{{$executionId}}"
        }
      }
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "AI Model"
          }
        ]
      ]
    },
    "AI Model": {
      "main": [
        [
          {
            "node": "Respond to Webhook"
          }
        ]
      ]
    }
  }
}
```

## 验证修复

修复后，n8n应该返回正确的数据格式：
```json
{
  "response": "秦始皇统一六国的意义在于...",
  "status": "success",
  "timestamp": "2025-10-17T05:30:00.000Z",
  "sessionId": "execution-123456"
}
```

如果问题仍然存在，请检查：
1. AI模型节点的实际输出结构
2. 数据引用路径是否正确
3. 工作流连接是否正确