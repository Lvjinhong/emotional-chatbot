import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Container,
  useTheme,
  Paper,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 图标
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import SchoolIcon from '@mui/icons-material/School';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// 动画配置
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const features = [
    {
      title: '情感音色克隆',
      description: '通过AI技术提供24小时情感支持，倾听孩子的心声，缓解孤独感，建立信任关系。',
      icon: <EmojiEmotionsIcon sx={{ fontSize: 40 }} />,
      path: '/voice-clone',
      color: theme.palette.primary.main,
      image: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: '语音模型管理',
      description: '创建个性化的语音伙伴，让孩子拥有一个可以随时交流的朋友，分享日常生活和心情。',
      icon: <MicIcon sx={{ fontSize: 40 }} />,
      path: '/model-management',
      color: theme.palette.secondary.main,
      image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: '智能对话',
      description: '与AI伙伴进行有趣的对话，不仅能解答问题，还能讲故事、玩游戏，丰富孩子的精神世界。',
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      path: '/chat',
      color: '#FF7043',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    // {
    //   title: '学习辅导',
    //   description: '提供个性化的学习辅导，帮助孩子解决学习中的困难，培养良好的学习习惯。',
    //   icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    //   path: '/education',
    //   color: '#4CAF50',
    //   image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    // },
    // {
    //   title: '故事与音乐',
    //   description: '提供丰富的儿童故事和音乐资源，培养孩子的想象力和创造力，让孩子的生活更加丰富多彩。',
    //   icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
    //   path: '/stories',
    //   color: '#9C27B0',
    //   image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    // }
  ];

  return (
    <Container maxWidth="lg">
      {/* 顶部横幅 */}
      <MotionBox
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          height: { xs: 300, md: 400 },
          mb: 6,
          backgroundImage: 'linear-gradient(135deg, #6200EE 0%, #03DAC6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }} />
        
        <Box sx={{ 
          position: 'relative', 
          textAlign: 'center',
          p: 3,
          maxWidth: 800
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: '#fff',
              mb: 2
            }}
          >
            星伴情感机器人
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4
            }}
          >
            为留守儿童带来温暖陪伴，用AI技术架起情感的桥梁
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: '#fff',
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
            onClick={() => navigate('/voice-clone')}
            endIcon={<ArrowForwardIcon />}
          >
            开始陪伴
          </Button>
        </Box>
      </MotionBox>
      
      {/* 功能卡片 */}
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          mb: 4, 
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        我们的服务
      </Typography>
      
      <Grid 
        container 
        spacing={4}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MotionCard 
              variants={itemVariants}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={feature.image}
                alt={feature.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    color: feature.color
                  }}
                >
                  {feature.icon}
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      ml: 1,
                      fontWeight: 'bold'
                    }}
                  >
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {feature.description}
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => navigate(feature.path)}
                  endIcon={<ArrowForwardIcon />}
                >
                  了解更多
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
      
      {/* 使命宣言 */}
      <Box 
        component={Paper} 
        elevation={0}
        sx={{ 
          mt: 8, 
          mb: 6, 
          p: 4, 
          borderRadius: 4,
          backgroundColor: theme.palette.mode === 'light' 
            ? 'rgba(98, 0, 238, 0.05)' 
            : 'rgba(98, 0, 238, 0.15)',
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 2, 
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          我们的使命
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            textAlign: 'center',
            maxWidth: 800,
            mx: 'auto',
            fontSize: '1.1rem',
            lineHeight: 1.8
          }}
        >
          在中国，有超过6000万留守儿童，他们因父母外出务工而无法得到足够的陪伴和关爱。
          星伴情感机器人致力于通过AI技术，为这些孩子提供情感支持和心理陪伴，
          帮助他们健康成长，让每一个留守儿童都能感受到温暖和关爱。
        </Typography>
      </Box>
      
      {/* 底部统计数据 */}
      {/* <Box sx={{ mt: 8, mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 4, 
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          我们的影响
        </Typography>
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          spacing={4}
          justifyContent="center"
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {[
            { label: '服务儿童', value: '50,000+' },
            { label: '覆盖学校', value: '1,200+' },
            { label: '互动次数', value: '5,000,000+' }
          ].map((stat, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                minWidth: 200,
                border: '1px solid',
                borderColor: theme.palette.mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.08)' 
                  : 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <Typography 
                variant="h3" 
                component="p" 
                sx={{ 
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                  mb: 1
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box> */}
    </Container>
  );
};

export default Home;
