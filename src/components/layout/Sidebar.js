import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box,
  Typography,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

// 图标
import HomeIcon from '@mui/icons-material/Home';
import MicIcon from '@mui/icons-material/Mic';
import StorageIcon from '@mui/icons-material/Storage';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    borderRight: '1px solid',
    borderColor: theme.palette.mode === 'light' 
      ? 'rgba(0, 0, 0, 0.08)' 
      : 'rgba(255, 255, 255, 0.08)',
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: '4px 8px',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: active 
      ? theme.palette.primary.dark 
      : theme.palette.mode === 'light' 
        ? 'rgba(0, 0, 0, 0.04)' 
        : 'rgba(255, 255, 255, 0.04)',
  },
  '& .MuiListItemIcon-root': {
    color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  }
}));

const menuItems = [
  { text: '首页', icon: <HomeIcon />, path: '/' },
  { text: '音色克隆', icon: <EmojiEmotionsIcon />, path: '/voice-clone' },
  { text: '模型管理', icon: <MicIcon />, path: '/model-management' },
  { text: '情感对话', icon: <ChatIcon />, path: '/chat' },
  // { text: '学习辅导', icon: <SchoolIcon />, path: '/education' },
  // { text: '故事与音乐', icon: <MusicNoteIcon />, path: '/stories' },
];

const secondaryMenuItems = [
  { text: '关于我们', icon: <InfoIcon />, path: '/about' },
  { text: '帮助中心', icon: <HelpIcon />, path: '/help' },
  { text: '家长指南', icon: <MenuBookIcon />, path: '/parent-guide' },
];

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: theme.spacing(2),
      }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.main
          }}
        >
          星伴
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {menuItems.map((item) => (
          <StyledListItem 
            button 
            key={item.text}
            active={location.pathname === item.path ? 1 : 0}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
      
      <Divider sx={{ mt: 'auto' }} />
      
      <List>
        {secondaryMenuItems.map((item) => (
          <StyledListItem 
            button 
            key={item.text}
            active={location.pathname === item.path ? 1 : 0}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
