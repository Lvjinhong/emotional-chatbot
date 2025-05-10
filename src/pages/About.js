import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Avatar,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';

// 图标
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LinkIcon from '@mui/icons-material/Link';

const About = () => {
  const theme = useTheme();
  
  // 团队成员数据
  const teamMembers = [
    {
      name: '张明',
      role: '创始人 & CEO',
      bio: '前Google AI研究员，拥有10年人工智能领域经验，致力于将AI技术应用于社会公益事业。',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: '李婷',
      role: '儿童心理学专家',
      bio: '儿童心理学博士，曾在多家儿童福利机构工作，专注于留守儿童心理健康研究。',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: '王强',
      role: '技术总监',
      bio: '人工智能与自然语言处理专家，曾领导多个大型AI项目，拥有丰富的语音识别和合成经验。',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: '赵雪',
      role: '教育顾问',
      bio: '资深教育工作者，曾在农村学校任教多年，深入了解留守儿童的教育需求和心理状况。',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ];
  
  // 合作伙伴数据
  const partners = [
    {
      name: '中国儿童福利基金会',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      description: '致力于为中国贫困和弱势儿童提供援助和支持的非营利组织。'
    },
    {
      name: '希望工程',
      logo: 'https://images.unsplash.com/photo-1560252829-804f1aedf1be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      description: '专注于改善中国农村教育条件，帮助贫困地区儿童接受教育的公益项目。'
    },
    {
      name: '教育部关爱留守儿童项目',
      logo: 'https://images.unsplash.com/photo-1577896852618-3b98bb03f47a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      description: '由教育部发起的全国性项目，旨在为留守儿童提供全方位的关爱和支持。'
    }
  ];

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
          关于我们
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto' }}
        >
          星伴情感机器人致力于为留守儿童提供情感陪伴和心理支持，
          通过AI技术架起亲情的桥梁，让每个孩子都能感受到温暖和关爱。
        </Typography>
      </Box>
      
      {/* 使命愿景部分 */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: 4,
                backgroundColor: theme.palette.mode === 'light' 
                  ? 'rgba(98, 0, 238, 0.05)' 
                  : 'rgba(98, 0, 238, 0.15)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FavoriteIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                  我们的使命
                </Typography>
              </Box>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                在中国，有超过6000万留守儿童，他们因父母外出务工而无法得到足够的陪伴和关爱。
                这些孩子往往面临情感缺失、心理孤独等问题，影响他们的健康成长。
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                星伴情感机器人的使命是通过AI技术，为留守儿童提供情感支持和心理陪伴，
                帮助他们建立健康的情感连接，缓解孤独感，促进心理健康发展。
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mt: 'auto' }}>
                我们相信，科技的力量可以跨越地理的限制，让爱和关怀传递到每一个需要的角落。
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: 4,
                backgroundColor: theme.palette.mode === 'light' 
                  ? 'rgba(3, 218, 198, 0.05)' 
                  : 'rgba(3, 218, 198, 0.15)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PsychologyIcon sx={{ fontSize: 40, color: theme.palette.secondary.main, mr: 2 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                  我们的愿景
                </Typography>
              </Box>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                我们期望打造一个没有情感孤岛的世界，让每一个留守儿童都能获得持续的关爱和支持，
                健康快乐地成长。
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                通过不断创新和完善我们的AI情感陪伴技术，我们希望能够：
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    为100万留守儿童提供情感陪伴服务
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    与5000所农村学校建立合作关系
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    培训10000名志愿者参与到关爱留守儿童的工作中
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mt: 'auto' }}>
                我们坚信，每一个孩子都值得被爱，被理解，被支持。
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
      
      {/* 我们的价值观 */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
        >
          我们的价值观
        </Typography>
        
        <Grid container spacing={3}>
          {[
            {
              icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
              title: '爱与关怀',
              description: '我们相信爱是最强大的力量，每一个孩子都应该得到无条件的关爱和支持。'
            },
            {
              icon: <SchoolIcon sx={{ fontSize: 40 }} />,
              title: '教育赋能',
              description: '我们致力于通过教育和陪伴，帮助留守儿童发展自信和能力，为未来做好准备。'
            },
            {
              icon: <GroupsIcon sx={{ fontSize: 40 }} />,
              title: '社区参与',
              description: '我们鼓励和促进社区参与，共同构建关爱留守儿童的支持网络。'
            }
          ].map((value, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    height: '100%',
                    borderRadius: 4,
                    backgroundColor: theme.palette.background.paper,
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'light' 
                      ? 'rgba(0, 0, 0, 0.08)' 
                      : 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      bgcolor: theme.palette.primary.main,
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    {value.icon}
                  </Avatar>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {value.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {value.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* 团队介绍 */}
      {/* <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
        >
          我们的团队
        </Typography>
        
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'light' 
                      ? 'rgba(0, 0, 0, 0.08)' 
                      : 'rgba(255, 255, 255, 0.08)',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={member.avatar}
                    alt={member.name}
                  />
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="primary" 
                      gutterBottom
                    >
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box> */}
      
      {/* 合作伙伴 */}
      {/* <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
        >
          合作伙伴
        </Typography>
        
        <Grid container spacing={3}>
          {partners.map((partner, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    borderRadius: 4,
                    backgroundColor: theme.palette.background.paper,
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'light' 
                      ? 'rgba(0, 0, 0, 0.08)' 
                      : 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      borderRadius: '50%',
                      overflow: 'hidden',
                      mb: 2,
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'light' 
                        ? 'rgba(0, 0, 0, 0.08)' 
                        : 'rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', textAlign: 'center' }}
                  >
                    {partner.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ textAlign: 'center' }}
                  >
                    {partner.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
       */}
      {/* 联系我们 */}
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
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            联系我们
          </Typography>
          <Typography variant="body1" paragraph>
            如果您对我们的项目感兴趣，或者希望成为我们的合作伙伴，欢迎联系我们。
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<LinkIcon />}
            sx={{ mt: 2 }}
          >
            了解更多合作方式
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
