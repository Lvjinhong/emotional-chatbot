import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  IconButton, 
  Avatar, 
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tooltip,
  CircularProgress,
  useTheme,
  Tabs,
  Tab,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Slider,
  Collapse
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

// 图标
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

const MessageContainer = styled(Box)(({ theme, sender }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  flexDirection: sender === 'user' ? 'row-reverse' : 'row',
}));

const MessageBubble = styled(Paper)(({ theme, sender }) => ({
  padding: theme.spacing(2),
  maxWidth: '70%',
  borderRadius: sender === 'user' 
    ? '18px 18px 4px 18px' 
    : '18px 18px 18px 4px',
  backgroundColor: sender === 'user' 
    ? theme.palette.primary.main 
    : theme.palette.mode === 'light' 
      ? theme.palette.grey[100] 
      : theme.palette.grey[800],
  color: sender === 'user' 
    ? theme.palette.primary.contrastText 
    : theme.palette.text.primary,
  position: 'relative',
}));

const MessageAvatar = styled(Avatar)(({ theme, sender }) => ({
  margin: sender === 'user' 
    ? theme.spacing(0, 0, 0, 2) 
    : theme.spacing(0, 2, 0, 0),
  backgroundColor: sender === 'user' 
    ? theme.palette.secondary.main 
    : theme.palette.primary.main,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 320,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 320,
    boxSizing: 'border-box',
    padding: theme.spacing(2),
  },
}));

// 模拟模型数据
const models = [
  { id: 1, name: '默认语音模型', type: '标准' },
  { id: 2, name: '播音员模型', type: '高级' },
  { id: 3, name: '女声助手模型', type: '专业' },
  { id: 4, name: '男声助手模型', type: '标准' },
];

// 模拟对话历史
const chatHistories = [
  { id: 1, title: '关于天气的对话', date: '2025-04-15', messageCount: 8 },
  { id: 2, title: '讲个故事', date: '2025-04-14', messageCount: 12 },
  { id: 3, title: '音乐推荐', date: '2025-04-12', messageCount: 6 },
];

const ChatInterface = () => {
  const theme = useTheme();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    responseLength: 50,
    temperature: 70,
    speakingRate: 1.0,
    voicePitch: 0,
  });

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 处理标签切换
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // 处理文本输入
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // 处理发送消息
  const handleSendMessage = () => {
    if (inputText.trim() === '' && !isRecording) return;
    
    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      text: isRecording ? '[语音消息]' : inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      type: isRecording ? 'voice' : 'text',
    };
    
    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    // 模拟API响应延迟
    setTimeout(() => {
      // 添加机器人响应
      const botResponse = {
        id: Date.now() + 1,
        text: getRandomResponse(),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        type: 'text',
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // 处理录音
  const handleRecording = () => {
    if (isRecording) {
      // 停止录音并发送
      setIsRecording(false);
      handleSendMessage();
    } else {
      // 开始录音
      setIsRecording(true);
    }
  };

  // 处理按键事件
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  // 清空对话
  const handleClearChat = () => {
    setMessages([]);
  };

  // 切换语音开关
  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  // 切换高级设置
  const handleAdvancedSettingsToggle = () => {
    setAdvancedSettingsOpen(!advancedSettingsOpen);
  };

  // 更新设置
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };

  // 获取随机响应（模拟）
  const getRandomResponse = () => {
    const responses = [
      "您好！我是您的AI语音助手。我可以回答问题、提供信息或者只是聊天。请问有什么可以帮助您的吗？",
      "很高兴与您交流。我的语音模型是基于您选择的声音特征训练的。您可以随时调整我的语音设置，使其更符合您的喜好。",
      "我注意到您正在使用文字与我交流。如果您想体验语音交互，可以点击麦克风按钮开始录音，我会用语音回复您。",
      "这是一个有趣的话题！我可以提供更多相关信息，或者我们可以探讨其他您感兴趣的主题。",
      "感谢您的提问。根据我的理解，这个问题有多个方面需要考虑。首先，我们可以从基础概念开始讨论...",
      "我理解您的问题，让我思考一下...这个问题涉及到几个关键点。从技术角度来看，我们需要考虑...",
      "您提出了一个很好的观点！从另一个角度看，我们也可以考虑...",
      "这是一个复杂的问题，让我尝试简明扼要地回答。首先...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <Container maxWidth="md" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
          }}
        >
          模型对话
        </Typography>
        
        <Box>
          <Tooltip title="历史记录">
            <IconButton 
              onClick={() => setHistoryOpen(true)}
              color="primary"
            >
              <HistoryIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="设置">
            <IconButton 
              onClick={() => setSettingsOpen(true)}
              color="primary"
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel>选择语音模型</InputLabel>
          <Select
            value={selectedModel}
            label="选择语音模型"
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {models.map((model) => (
              <MenuItem key={model.id} value={model.id}>
                {model.name} ({model.type})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab 
            icon={<TextFormatIcon />} 
            label="文字对话" 
            iconPosition="start"
          />
          <Tab 
            icon={<RecordVoiceOverIcon />} 
            label="语音对话" 
            iconPosition="start"
          />
        </Tabs>
      </Box>
      
      <Paper 
        elevation={0}
        sx={{ 
          flexGrow: 1, 
          mb: 2, 
          p: 2,
          overflowY: 'auto',
          bgcolor: theme.palette.mode === 'light' 
            ? 'rgba(0, 0, 0, 0.02)' 
            : 'rgba(255, 255, 255, 0.02)',
          borderRadius: 2,
          height: 'calc(100vh - 320px)',
        }}
      >
        {messages.length === 0 ? (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%',
              opacity: 0.7
            }}
          >
            <SmartToyIcon sx={{ fontSize: 60, mb: 2, color: theme.palette.primary.main }} />
            <Typography variant="h6" gutterBottom>
              开始与您的语音模型对话
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              输入文字或点击麦克风按钮开始语音对话
            </Typography>
          </Box>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageContainer sender={message.sender}>
                  <MessageBubble sender={message.sender} elevation={1}>
                    <Typography variant="body1">
                      {message.text}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block', 
                        mt: 1,
                        textAlign: 'right',
                        opacity: 0.7
                      }}
                    >
                      {message.timestamp}
                    </Typography>
                    {message.sender === 'bot' && voiceEnabled && (
                      <IconButton 
                        size="small" 
                        sx={{ 
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          opacity: 0.7
                        }}
                      >
                        <VolumeUpIcon fontSize="small" />
                      </IconButton>
                    )}
                  </MessageBubble>
                  <MessageAvatar sender={message.sender}>
                    {message.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                  </MessageAvatar>
                </MessageContainer>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 7, mt: 2 }}>
            <CircularProgress size={20} sx={{ mr: 2 }} />
            <Typography variant="body2" color="text.secondary">
              正在思考...
            </Typography>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Paper>
      
      <Paper 
        elevation={0}
        sx={{ 
          p: 2,
          borderRadius: 2,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder={tabValue === 0 ? "输入消息..." : "语音输入已启用，点击麦克风按钮开始..."}
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={tabValue === 1 || isRecording}
            variant="outlined"
            sx={{ mr: 1 }}
          />
          {tabValue === 0 ? (
            <IconButton 
              color="primary" 
              onClick={handleSendMessage}
              disabled={inputText.trim() === ''}
            >
              <SendIcon />
            </IconButton>
          ) : (
            <IconButton 
              color={isRecording ? "error" : "primary"} 
              onClick={handleRecording}
            >
              {isRecording ? <StopIcon /> : <MicIcon />}
            </IconButton>
          )}
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mt: 1,
          px: 1
        }}>
          <Box>
            <Tooltip title={voiceEnabled ? "关闭语音" : "开启语音"}>
              <IconButton 
                size="small" 
                onClick={handleVoiceToggle}
                color={voiceEnabled ? "primary" : "default"}
              >
                {voiceEnabled ? <VolumeUpIcon fontSize="small" /> : <VolumeMuteIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
          <Button 
            size="small" 
            startIcon={<DeleteIcon />}
            onClick={handleClearChat}
            disabled={messages.length === 0}
          >
            清空对话
          </Button>
        </Box>
      </Paper>
      
      {/* 设置抽屉 */}
      <StyledDrawer
        anchor="right"
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      >
        <Typography variant="h6" gutterBottom>
          对话设置
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom>
          基本设置
        </Typography>
        
        <FormControlLabel
          control={
            <Switch 
              checked={voiceEnabled} 
              onChange={handleVoiceToggle}
              color="primary"
            />
          }
          label="语音输出"
          sx={{ mb: 2 }}
        />
        
        <Typography variant="body2" gutterBottom>
          响应长度
        </Typography>
        <Slider
          value={settings.responseLength}
          onChange={(e, newValue) => handleSettingChange('responseLength', newValue)}
          aria-labelledby="response-length-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={100}
          sx={{ mb: 3 }}
        />
        
        <Typography variant="body2" gutterBottom>
          创造性 (温度)
        </Typography>
        <Slider
          value={settings.temperature}
          onChange={(e, newValue) => handleSettingChange('temperature', newValue)}
          aria-labelledby="temperature-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={100}
          sx={{ mb: 3 }}
        />
        
        <Box sx={{ mb: 2 }}>
          <Button
            fullWidth
            onClick={handleAdvancedSettingsToggle}
            endIcon={advancedSettingsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            高级语音设置
          </Button>
          
          <Collapse in={advancedSettingsOpen}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                语速 ({settings.speakingRate}x)
              </Typography>
              <Slider
                value={settings.speakingRate * 100}
                onChange={(e, newValue) => handleSettingChange('speakingRate', newValue / 100)}
                aria-labelledby="speaking-rate-slider"
                valueLabelDisplay="auto"
                step={10}
                min={50}
                max={200}
                sx={{ mb: 3 }}
              />
              
              <Typography variant="body2" gutterBottom>
                音调调整
              </Typography>
              <Slider
                value={settings.voicePitch}
                onChange={(e, newValue) => handleSettingChange('voicePitch', newValue)}
                aria-labelledby="voice-pitch-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={-10}
                max={10}
                sx={{ mb: 3 }}
              />
            </Box>
          </Collapse>
        </Box>
        
        <Box sx={{ mt: 'auto' }}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => setSettingsOpen(false)}
          >
            保存设置
          </Button>
        </Box>
      </StyledDrawer>
      
      {/* 历史记录抽屉 */}
      <StyledDrawer
        anchor="right"
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
      >
        <Typography variant="h6" gutterBottom>
          对话历史
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {chatHistories.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              暂无对话历史
            </Typography>
          </Box>
        ) : (
          <List>
            {chatHistories.map((history) => (
              <ListItem 
                key={history.id}
                button
                sx={{ 
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'light' 
                      ? 'rgba(0, 0, 0, 0.04)' 
                      : 'rgba(255, 255, 255, 0.04)',
                  }
                }}
              >
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={history.title}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" component="span" color="text.secondary">
                        {history.date}
                      </Typography>
                      <Chip 
                        label={`${history.messageCount} 条消息`}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        
        <Box sx={{ mt: 'auto' }}>
          <Button 
            fullWidth 
            variant="outlined" 
            onClick={() => setHistoryOpen(false)}
          >
            关闭
          </Button>
        </Box>
      </StyledDrawer>
    </Container>
  );
};

export default ChatInterface;
