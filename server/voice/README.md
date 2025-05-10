# 语音克隆及对话模块

本模块提供语音克隆和语音对话功能，包括语音识别、文本对话和语音合成。

## 功能特性

- 语音克隆：创建、管理、删除自定义音色
- 语音识别：将语音转换为文本
- 文本对话：与 Link AI 大语言模型进行对话
- 语音合成：将文本转换为语音

## 安装依赖

首先，安装所需的 Python 依赖:

```bash
cd server
pip install -r requirements.txt
```

或者使用 npm 脚本:

```bash
cd server
npm run setup:voice
```

## 环境变量配置

创建 `.env` 文件，并设置以下环境变量:

```
# LinkAI API 设置
LINK_AI_API_URL=你的LinkAI API地址
LINK_AI_API_KEY=你的LinkAI API密钥
LINK_AI_APP_CODE=你的LinkAI应用代码

# 语音服务端口
VOICE_SERVER_PORT=5009
```

## 启动服务

启动语音服务:

```bash
cd server
python voice_server.py
```

或者使用 npm 脚本:

```bash
cd server
npm run voice
```

## API 端点

### 音色管理

- `GET /api/voices` - 获取所有音色
- `GET /api/voices/{voice_id}` - 获取特定音色详情
- `POST /api/voices` - 创建新音色 (表单参数: name, description, audio_file)
- `DELETE /api/voices/{voice_id}` - 删除音色

### 对话

- `POST /api/dialogue/text` - 文本对话 (JSON 参数: message, session_id, voice_id)
- `POST /api/dialogue/voice` - 语音对话 (表单参数: session_id, voice_id, audio_file)

## 示例用法

### 创建新音色

```bash
curl -X POST "http://localhost:5009/api/voices" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "name=我的声音" \
  -F "description=我的第一个克隆声音" \
  -F "audio_file=@/path/to/audio/sample.wav"
```

### 文本对话

```bash
curl -X POST "http://localhost:5009/api/dialogue/text" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"message":"你好，今天天气如何？", "voice_id":"your_voice_id", "session_id":"optional_session_id"}'
```

### 语音对话

```bash
curl -X POST "http://localhost:5009/api/dialogue/voice" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "voice_id=your_voice_id" \
  -F "session_id=optional_session_id" \
  -F "audio_file=@/path/to/audio/input.wav"
``` 