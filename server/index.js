const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5008;

// 中间件
app.use(cors());
app.use(express.json());

// 存储会话历史
const sessions = new Map();

// 聊天API代理
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    let messages = sessions.get(sessionId) || [];
    messages.push({ role: 'user', content: message });
    
    const requestBody = {
      app_code: process.env.LINK_AI_APP_CODE,
      messages: messages,
      stream: false
    };

    const response = await axios.post(
      process.env.LINK_AI_API_URL,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LINK_AI_API_KEY}`
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    messages.push({ role: 'assistant', content: aiResponse });
    sessions.set(sessionId, messages);

    res.json({
      response: aiResponse,
      sessionId: sessionId
    });
  } catch (error) {
    console.error('Error calling Link AI API (non-stream):', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

// 流式聊天API代理
app.post('/api/chat/stream', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    let messages = sessions.get(sessionId) || [];
    messages.push({ role: 'user', content: message });
    
    const requestBody = {
      app_code: process.env.LINK_AI_APP_CODE,
      messages: messages,
      stream: true
    };

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const response = await axios.post(
      process.env.LINK_AI_API_URL,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LINK_AI_API_KEY}`
        },
        responseType: 'stream'
      }
    );

    let fullResponse = '';
    let historySaved = false;
    let apiSentDoneSignal = false; // Track if the upstream API has sent its [DONE] marker

    response.data.on('data', (chunk) => {
      if (apiSentDoneSignal) {
        // If API already signalled [DONE], ignore further data from this stream
        return;
      }

      const chunkStr = chunk.toString();
      const lines = chunkStr.split('\n');

      for (const line of lines) {
        if (apiSentDoneSignal && line.trim() !== '') {
            // If [DONE] was processed from a previous line in this chunk, ignore subsequent non-empty lines
            continue;
        }
        if (!line.trim()) continue;

        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6).trim();

          if (dataStr === '[DONE]') {
            apiSentDoneSignal = true; // Mark that API has finished sending content
            if (!historySaved) {
                messages.push({ role: 'assistant', content: fullResponse });
                sessions.set(sessionId, messages);
                historySaved = true;
            }
            res.write('data: [DONE]\n\n'); // Signal our client
            // Continue to next line, in case of trailing empty lines or other non-data in chunk.
            // The apiSentDoneSignal flag will prevent further content processing.
            continue;
          }

          // If apiSentDoneSignal is true (set by a previous line in this chunk), do not process content.
          if (apiSentDoneSignal) continue;

          if (dataStr) { 
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.choices && parsed.choices.length > 0 && parsed.choices[0].delta) {
                const delta = parsed.choices[0].delta;
                if (typeof delta.content === 'string') {
                  const contentPiece = delta.content;
                  fullResponse += contentPiece;
                  res.write(`data: ${JSON.stringify({ content: contentPiece, sessionId: sessionId })}\n\n`);
                }
              }
            } catch (e) {
              console.error(`Error parsing JSON from stream: '${dataStr}'`, e);
            }
          }
        }
      }
    });

    response.data.on('end', () => {
      if (!apiSentDoneSignal) { // If API stream ended without sending [DONE]
        if (fullResponse && !historySaved) {
          messages.push({ role: 'assistant', content: fullResponse });
          sessions.set(sessionId, messages);
          // historySaved = true; // Not strictly needed as we are about to send [DONE] and end
        }
        res.write('data: [DONE]\n\n'); // Ensure client gets a DONE signal
      }
      if (!res.writableEnded) {
        res.end();
      }
    });
    
    response.data.on('error', (streamError) => {
      console.error('Stream error from API:', streamError);
      if (fullResponse && !historySaved) {
        // Attempt to save partial response if error occurs and history wasn't saved
        messages.push({ role: 'assistant', content: fullResponse });
        sessions.set(sessionId, messages);
      }
      if (!res.headersSent) {
        res.status(500).json({ error: 'Stream error from AI provider' });
      } else if (!res.writableEnded) {
        try {
            res.write(`event: error\ndata: ${JSON.stringify({ message: 'Upstream API stream error' })}\n\n`);
        } catch (e) {
            console.error('Error writing error event to stream:', e);
        } finally {
            if (!res.writableEnded) res.end();
        }
      }
    });
  } catch (error) {
    console.error('Error setting up Link AI stream:', error.response ? error.response.data : error.message);
    if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to setup stream with AI' });
    } else if (!res.writableEnded) {
        res.end();
    }
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 