import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';

// 图标
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import DevicesIcon from '@mui/icons-material/Devices';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Help = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false);
  
  // 处理手风琴展开/收起
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  // 处理搜索
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // FAQ数据
  const faqCategories = [
    {
      category: '基本使用',
      icon: <HelpOutlineIcon />,
      questions: [
        {
          question: '什么是星伴情感机器人？',
          answer: '星伴情感机器人是一款专为留守儿童设计的AI伙伴，通过语音交互和情感分析技术，为孩子提供情感陪伴、学习辅导、故事讲述等服务，帮助缓解孤独感，促进心理健康发展。'
        },
        {
          question: '如何开始使用星伴情感机器人？',
          answer: '首先，您需要在首页点击"开始陪伴"按钮，然后根据指引完成简单的注册和设置。您可以为孩子创建个性化的语音伙伴，设置兴趣爱好和学习需求，系统会根据这些信息提供定制化的陪伴服务。'
        },
        {
          question: '星伴情感机器人适合哪些年龄段的孩子？',
          answer: '星伴情感机器人主要面向6-14岁的留守儿童，但我们的内容和交互方式会根据孩子的年龄和认知水平进行智能调整，确保提供适合的陪伴和支持。'
        },
        {
          question: '使用星伴情感机器人需要付费吗？',
          answer: '星伴情感机器人的基础功能完全免费，包括日常对话、情感陪伴和基础学习辅导。我们通过公益基金和企业赞助维持运营，确保每个留守儿童都能获得免费的情感支持。部分高级功能可能需要付费，但我们为贫困地区的孩子提供免费使用的机会。'
        }
      ]
    },
    {
      category: '功能介绍',
      icon: <DevicesIcon />,
      questions: [
        {
          question: '情感陪伴功能是如何工作的？',
          answer: '情感陪伴功能通过先进的情感分析技术，识别孩子的情绪状态，提供相应的安慰、鼓励和支持。系统会记录孩子的情绪变化，帮助他们表达和管理情绪，同时为监护人提供孩子情绪健康的报告。'
        },
        {
          question: '语音伙伴功能有哪些特点？',
          answer: '语音伙伴功能允许孩子创建个性化的AI伙伴，可以选择不同的声音、性格和兴趣爱好。这个AI伙伴会根据孩子的喜好进行对话，讲故事，玩游戏，甚至可以模仿家人的语音风格，增强情感连接。'
        },
        {
          question: '智能对话系统能理解方言吗？',
          answer: '是的，我们的智能对话系统支持多种中国方言，包括四川话、东北话、广东话等。系统会不断学习和适应孩子的语言习惯，确保沟通顺畅自然。'
        },
        {
          question: '学习辅导功能包括哪些内容？',
          answer: '学习辅导功能涵盖小学和初中阶段的主要学科，包括语文、数学、英语等。系统会根据孩子的学习进度和难点，提供个性化的辅导和练习，激发学习兴趣，培养良好的学习习惯。'
        },
        {
          question: '故事与音乐功能有哪些内容？',
          answer: '故事与音乐功能提供丰富的儿童故事、童话、寓言以及适合不同年龄段的音乐作品。内容经过专业儿童教育专家筛选，健康积极，有助于培养孩子的想象力、创造力和审美能力。'
        }
      ]
    },
    {
      category: '隐私与安全',
      icon: <SecurityIcon />,
      questions: [
        {
          question: '星伴情感机器人如何保护儿童隐私？',
          answer: '我们严格遵守儿童隐私保护法规，所有收集的数据仅用于改善服务质量，不会分享给第三方。系统采用端到端加密技术，确保对话内容的安全性。家长或监护人可以随时查看和删除孩子的使用记录。'
        },
        {
          question: '如何确保内容的安全性和适宜性？',
          answer: '所有内容经过多重筛选和审核，确保适合儿童使用。我们的AI系统配备了先进的内容过滤技术，能够识别和阻止不适宜的话题和信息。同时，我们有专业的儿童心理学家团队定期评估和优化内容。'
        },
        {
          question: '家长如何监控孩子的使用情况？',
          answer: '我们提供家长监控面板，家长可以查看孩子的使用时间、对话内容、情绪变化等信息，及时了解孩子的状况。同时，系统会定期生成孩子的情感健康报告，帮助家长更好地关注孩子的心理健康。'
        }
      ]
    },
    {
      category: '技术支持',
      icon: <SettingsIcon />,
      questions: [
        {
          question: '系统支持哪些设备使用？',
          answer: '星伴情感机器人支持多种设备，包括智能手机、平板电脑、电脑和智能音箱。我们的网页版适配各种屏幕尺寸，移动端提供iOS和Android应用，确保孩子可以随时随地获得陪伴。'
        },
        {
          question: '如何解决网络连接问题？',
          answer: '我们的系统设计考虑到农村地区网络条件可能不稳定的情况，支持离线使用部分基础功能。当网络恢复后，系统会自动同步数据。如果遇到持续的网络问题，可以尝试切换网络环境或联系我们的技术支持团队。'
        },
        {
          question: '遇到技术问题如何获取帮助？',
          answer: '您可以通过以下方式获取技术支持：1) 在应用内的"帮助中心"提交问题；2) 发送邮件至support@starbotai.com；3) 拨打我们的客服热线400-123-4567（周一至周五 9:00-18:00）。我们的技术团队会在24小时内回复您的问题。'
        }
      ]
    }
  ];
  
  // 使用指南数据
  const guides = [
    {
      title: '情感陪伴',
      icon: <EmojiEmotionsIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      steps: [
        '点击首页的"情感陪伴"或侧边栏的相应选项',
        '选择或创建孩子的个人档案',
        '系统会根据孩子的情绪状态开始对话',
        '鼓励孩子表达自己的感受和想法',
        '系统会提供适当的回应和支持'
      ]
    },
    {
      title: '语音伙伴',
      icon: <MicIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      steps: [
        '进入"语音伙伴"页面',
        '点击"创建新伙伴"按钮',
        '选择伙伴的声音、性格和兴趣',
        '为伙伴取一个名字',
        '开始与您的个性化语音伙伴交流'
      ]
    },
    {
      title: '智能对话',
      icon: <ChatIcon sx={{ fontSize: 40, color: '#FF7043' }} />,
      steps: [
        '进入"智能对话"页面',
        '选择已创建的语音伙伴',
        '选择文字对话或语音对话模式',
        '开始与AI伙伴进行交流',
        '可以询问问题、请求讲故事或玩游戏'
      ]
    },
    {
      title: '学习辅导',
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      steps: [
        '进入"学习辅导"页面',
        '选择学科和年级',
        '系统会提供相应的学习内容和练习',
        '孩子可以提问或请求解释',
        '系统会根据孩子的回答提供个性化指导'
      ]
    }
  ];

  // 过滤FAQ
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
              item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Container maxWidth="lg">
      {/* 标题部分 */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          帮助中心
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto' }}
        >
          欢迎来到星伴情感机器人帮助中心，这里提供了详细的使用指南和常见问题解答，
          帮助您更好地使用我们的服务。
        </Typography>
      </Box>
      
      {/* 搜索框 */}
      <Box 
        component={Paper} 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 6, 
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <TextField
          fullWidth
          placeholder="搜索常见问题..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>
      
      {/* 使用指南 */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          使用指南
        </Typography>
        
        <Grid container spacing={3}>
          {guides.map((guide, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'light' 
                      ? 'rgba(0, 0, 0, 0.08)' 
                      : 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {guide.icon}
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          ml: 1,
                          fontWeight: 'bold'
                        }}
                      >
                        {guide.title}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List>
                      {guide.steps.map((step, stepIndex) => (
                        <ListItem key={stepIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleOutlineIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={step} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* 常见问题 */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          常见问题
        </Typography>
        
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category, categoryIndex) => (
            <Box key={categoryIndex} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  mr: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText
                }}>
                  {category.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ fontWeight: 'bold' }}
                >
                  {category.category}
                </Typography>
              </Box>
              
              {category.questions.map((faq, faqIndex) => (
                <Accordion 
                  key={faqIndex}
                  expanded={expanded === `${categoryIndex}-${faqIndex}`}
                  onChange={handleChange(`${categoryIndex}-${faqIndex}`)}
                  elevation={0}
                  sx={{ 
                    mb: 1,
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'light' 
                      ? 'rgba(0, 0, 0, 0.08)' 
                      : 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px !important',
                    '&:before': {
                      display: 'none',
                    },
                    overflow: 'hidden'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      backgroundColor: expanded === `${categoryIndex}-${faqIndex}` 
                        ? theme.palette.mode === 'light' 
                          ? 'rgba(98, 0, 238, 0.05)' 
                          : 'rgba(98, 0, 238, 0.15)'
                        : 'transparent',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))
        ) : (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 6,
              bgcolor: theme.palette.mode === 'light' 
                ? 'rgba(0, 0, 0, 0.02)' 
                : 'rgba(255, 255, 255, 0.02)',
              borderRadius: 4
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              没有找到相关问题
            </Typography>
            <Typography variant="body2" color="text.secondary">
              请尝试使用其他关键词，或直接联系我们获取帮助
            </Typography>
          </Box>
        )}
      </Box>
      
      {/* 联系支持 */}
      <Box sx={{ mb: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 4,
            backgroundColor: theme.palette.mode === 'light' 
              ? 'rgba(98, 0, 238, 0.05)' 
              : 'rgba(98, 0, 238, 0.15)',
            textAlign: 'center'
          }}
        >
          <ContactSupportIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            还有其他问题？
          </Typography>
          <Typography variant="body1" paragraph>
            如果您没有找到需要的答案，欢迎联系我们的客服团队，我们将竭诚为您服务。
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary">
              在线客服
            </Button>
            <Button variant="outlined" color="primary">
              发送邮件
            </Button>
            <Button variant="outlined" color="primary">
              400-123-4567
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Help;
