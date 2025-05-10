import React from 'react';
import { 
  Paper, 
  BottomNavigation, 
  BottomNavigationAction,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

// 图标
import HomeIcon from '@mui/icons-material/Home';
import MicIcon from '@mui/icons-material/Mic';
import StorageIcon from '@mui/icons-material/Storage';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(8px)',
  backgroundColor: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.8)' 
    : 'rgba(18, 18, 18, 0.8)',
  transition: 'all 0.3s',
  height: 64,
}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  transition: 'all 0.3s',
}));

const navItems = [
  { label: '首页', icon: <HomeIcon />, path: '/' },
  { label: '音色克隆', icon: <EmojiEmotionsIcon />, path: '/voice-clone' },
  { label: '模型管理', icon: <MicIcon />, path: '/model-management' },
  { label: '情感对话', icon: <ChatIcon />, path: '/chat' },
];

const MobileNav = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentValue = () => {
    const index = navItems.findIndex(item => item.path === location.pathname);
    return index >= 0 ? index : 0;
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <StyledBottomNavigation
        value={getCurrentValue()}
        onChange={(event, newValue) => {
          navigate(navItems[newValue].path);
        }}
      >
        {navItems.map((item, index) => (
          <StyledBottomNavigationAction 
            key={item.label} 
            label={item.label} 
            icon={item.icon} 
          />
        ))}
      </StyledBottomNavigation>
    </Paper>
  );
};

export default MobileNav;
