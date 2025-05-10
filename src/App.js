import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import { ThemeContext } from './context/ThemeContext';

// 导入页面组件
import Home from './pages/Home';
import VoiceClone from './pages/VoiceClone';
import ModelManagement from './pages/ModelManagement';
import ChatInterface from './pages/ChatInterface';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Help from './pages/Help';

// 导入布局组件
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import MobileNav from './components/layout/MobileNav';

function App() {
  const { mode } = useContext(ThemeContext);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary',
    }}>
      {/* 桌面端侧边栏 */}
      {!isMobile && (
        <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      )}
      
      {/* 主内容区域 */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        width: isMobile ? '100%' : `calc(100% - ${sidebarOpen ? '240px' : '0px'})`,
        ml: isMobile ? 0 : (sidebarOpen ? '240px' : 0),
        transition: 'margin 0.3s, width 0.3s',
      }}>
        {/* 顶部导航栏 */}
        <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        
        {/* 路由内容 */}
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/voice-clone" element={<VoiceClone />} />
            <Route path="/model-management" element={<ModelManagement />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
      
      {/* 移动端底部导航 */}
      {isMobile && <MobileNav />}
    </Box>
  );
}

export default App;
