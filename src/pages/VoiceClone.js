import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button, 
  Stepper, 
  Step, 
  StepLabel,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Card,
  CardContent,
  IconButton,
  Divider,
  useTheme,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// 图标
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MicIcon from '@mui/icons-material/Mic';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TuneIcon from '@mui/icons-material/Tune';
import SaveIcon from '@mui/icons-material/Save';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  border: '2px dashed',
  borderColor: theme.palette.mode === 'light' 
    ? 'rgba(0, 0, 0, 0.1)' 
    : 'rgba(255, 255, 255, 0.1)',
  backgroundColor: theme.palette.mode === 'light' 
    ? 'rgba(0, 0, 0, 0.01)' 
    : 'rgba(255, 255, 255, 0.01)',
  minHeight: 200,
  cursor: 'pointer',
  transition: 'all 0.3s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(98, 0, 238, 0.04)' 
      : 'rgba(98, 0, 238, 0.08)',
  }
}));

const AudioCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  }
}));

const steps = ['上传音频', '调整参数', '生成模型'];

const VoiceClone = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [audioFiles, setAudioFiles] = useState([]);
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(null);
  const [modelName, setModelName] = useState('');
  const [modelType, setModelType] = useState('standard');
  const [quality, setQuality] = useState(50);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // 处理文件上传
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const audioFiles = files.filter(file => file.type.startsWith('audio/'));
    
    if (audioFiles.length === 0) {
      setError('请上传有效的音频文件');
      return;
    }
    
    setError(null);
    
    const newAudioFiles = audioFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      duration: '00:00',
      url: URL.createObjectURL(file),
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
    }));
    
    setAudioFiles([...audioFiles, ...newAudioFiles]);
  };

  // 模拟录音功能
  const handleRecording = () => {
    if (recording) {
      // 停止录音逻辑
      setRecording(false);
      
      // 模拟添加录音文件
      const newRecording = {
        id: Date.now() + Math.random(),
        file: null,
        name: `录音_${new Date().toLocaleTimeString()}`,
        duration: '00:30',
        url: null, // 实际应用中这里应该是录音的Blob URL
        size: '0.5 MB'
      };
      
      setAudioFiles([...audioFiles, newRecording]);
    } else {
      // 开始录音逻辑
      setRecording(true);
    }
  };

  // 播放/暂停音频
  const togglePlayAudio = (id) => {
    if (playing === id) {
      setPlaying(null);
    } else {
      setPlaying(id);
    }
  };

  // 删除音频文件
  const deleteAudio = (id) => {
    setAudioFiles(audioFiles.filter(audio => audio.id !== id));
  };

  // 处理下一步
  const handleNext = () => {
    if (activeStep === 0 && audioFiles.length === 0) {
      setError('请至少上传一个音频文件');
      return;
    }
    
    if (activeStep === 1 && !modelName.trim()) {
      setError('请输入模型名称');
      return;
    }
    
    setError(null);
    
    if (activeStep === steps.length - 1) {
      // 提交生成模型
      setLoading(true);
      
      // 模拟API调用
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 3000);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // 处理上一步
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // 重置表单
  const handleReset = () => {
    setActiveStep(0);
    setAudioFiles([]);
    setModelName('');
    setModelType('standard');
    setQuality(50);
    setSuccess(false);
    setError(null);
  };

  return (
    <Container maxWidth="md">
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        音色克隆
      </Typography>
      
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
        sx={{ mb: 4 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      
      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <CheckCircleIcon 
              color="success" 
              sx={{ fontSize: 80, mb: 2 }} 
            />
            <Typography variant="h5" gutterBottom>
              恭喜！您的语音模型已成功创建
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              您可以在"模型管理"页面查看和使用您的新模型，或者在"模型对话"页面开始与您的模型交流。
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button 
                variant="outlined" 
                onClick={handleReset}
              >
                创建新模型
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => window.location.href = '/model-management'}
              >
                查看我的模型
              </Button>
            </Box>
          </Paper>
        </motion.div>
      ) : (
        <Box>
          {activeStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <UploadBox 
                    component="label"
                    htmlFor="audio-file-upload"
                  >
                    <CloudUploadIcon 
                      sx={{ 
                        fontSize: 48, 
                        mb: 2,
                        color: theme.palette.primary.main
                      }} 
                    />
                    <Typography variant="h6" gutterBottom>
                      上传音频文件
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      支持 MP3, WAV, OGG 格式，单个文件不超过 10MB
                      <br />
                      建议上传 3-5 个不同的音频样本，每个样本时长 5-30 秒
                    </Typography>
                    <VisuallyHiddenInput
                      id="audio-file-upload"
                      type="file"
                      accept="audio/*"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </UploadBox>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      或者
                    </Typography>
                  </Divider>
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      mb: 4
                    }}
                  >
                    <Button
                      variant={recording ? "contained" : "outlined"}
                      color={recording ? "error" : "primary"}
                      startIcon={<MicIcon />}
                      onClick={handleRecording}
                    >
                      {recording ? "停止录音" : "开始录音"}
                    </Button>
                  </Box>
                </Grid>
                
                {audioFiles.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      已上传的音频 ({audioFiles.length})
                    </Typography>
                    
                    <Box>
                      {audioFiles.map((audio) => (
                        <AudioCard key={audio.id}>
                          <CardContent sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton 
                                color="primary"
                                onClick={() => togglePlayAudio(audio.id)}
                              >
                                {playing === audio.id ? <PauseIcon /> : <PlayArrowIcon />}
                              </IconButton>
                              <Box sx={{ ml: 2 }}>
                                <Typography variant="subtitle1">
                                  {audio.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {audio.duration} | {audio.size}
                                </Typography>
                              </Box>
                            </Box>
                            <IconButton 
                              color="error"
                              onClick={() => deleteAudio(audio.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardContent>
                        </AudioCard>
                      ))}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </motion.div>
          )}
          
          {activeStep === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  模型设置
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="模型名称"
                      variant="outlined"
                      fullWidth
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>模型类型</InputLabel>
                      <Select
                        value={modelType}
                        label="模型类型"
                        onChange={(e) => setModelType(e.target.value)}
                      >
                        <MenuItem value="standard">标准模型</MenuItem>
                        <MenuItem value="premium">高级模型</MenuItem>
                        <MenuItem value="professional">专业模型</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ px: 2 }}>
                      <Typography gutterBottom>
                        模型质量 ({quality}%)
                      </Typography>
                      <Slider
                        value={quality}
                        onChange={(e, newValue) => setQuality(newValue)}
                        aria-labelledby="quality-slider"
                        valueLabelDisplay="auto"
                        marks={[
                          { value: 0, label: '低' },
                          { value: 50, label: '中' },
                          { value: 100, label: '高' },
                        ]}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      p: 2,
                      bgcolor: theme.palette.mode === 'light' 
                        ? 'rgba(0, 0, 0, 0.03)' 
                        : 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 1
                    }}>
                      <TuneIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                      <Box>
                        <Typography variant="subtitle1">
                          高级设置
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          模型类型和质量设置将影响生成速度和结果质量。高级模型需要更多的处理时间，但能提供更自然的语音效果。
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          )}
          
          {activeStep === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  确认信息
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      模型名称
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {modelName}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      模型类型
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {modelType === 'standard' && '标准模型'}
                      {modelType === 'premium' && '高级模型'}
                      {modelType === 'professional' && '专业模型'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      模型质量
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {quality}%
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      音频样本数量
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {audioFiles.length} 个文件
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: theme.palette.mode === 'light' 
                        ? 'rgba(0, 0, 0, 0.03)' 
                        : 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 1,
                      mb: 2
                    }}>
                      <Typography variant="body2" color="text.secondary">
                        点击"生成模型"按钮开始处理您的音频文件并创建语音模型。处理时间取决于您的音频样本数量和选择的模型质量，通常需要 1-5 分钟。
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              上一步
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              startIcon={activeStep === steps.length - 1 ? <SaveIcon /> : null}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                activeStep === steps.length - 1 ? '生成模型' : '下一步'
              )}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default VoiceClone;
