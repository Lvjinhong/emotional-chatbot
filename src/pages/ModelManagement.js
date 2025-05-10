import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  IconButton, 
  Avatar, 
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
  Menu,
  MenuItem,
  useTheme,
  Tooltip,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// 图标
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  }
}));

const ModelAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(2),
}));

// 模拟模型数据
const generateMockModels = () => {
  const types = ['标准', '高级', '专业'];
  const names = [
    '默认语音', '播音员', '女声助手', '男声助手', 
    '情感语音', '儿童语音', '老年语音', '外语口音',
    '机器人语音', '广播语音', '配音演员', '游戏角色'
  ];
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `${names[i % names.length]}模型`,
    type: types[i % types.length],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    quality: Math.floor(Math.random() * 50) + 50,
    favorite: i % 5 === 0,
    usageCount: Math.floor(Math.random() * 100),
    size: (Math.random() * 10 + 1).toFixed(1) + ' MB',
  }));
};

const ModelManagement = () => {
  const theme = useTheme();
  const [models, setModels] = useState(generateMockModels());
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  
  // 处理搜索
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // 处理标签切换
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // 打开删除对话框
  const handleDeleteClick = (model) => {
    setSelectedModel(model);
    setDeleteDialogOpen(true);
    setAnchorEl(null);
  };
  
  // 确认删除模型
  const handleDeleteConfirm = () => {
    setModels(models.filter(model => model.id !== selectedModel.id));
    setDeleteDialogOpen(false);
    setSelectedModel(null);
  };
  
  // 打开编辑对话框
  const handleEditClick = (model) => {
    setSelectedModel(model);
    setEditName(model.name);
    setEditDialogOpen(true);
    setAnchorEl(null);
  };
  
  // 确认编辑模型
  const handleEditConfirm = () => {
    setModels(models.map(model => 
      model.id === selectedModel.id 
        ? { ...model, name: editName } 
        : model
    ));
    setEditDialogOpen(false);
    setSelectedModel(null);
  };
  
  // 切换收藏状态
  const handleToggleFavorite = (id) => {
    setModels(models.map(model => 
      model.id === id 
        ? { ...model, favorite: !model.favorite } 
        : model
    ));
  };
  
  // 打开菜单
  const handleMenuOpen = (event, model) => {
    setAnchorEl(event.currentTarget);
    setSelectedModel(model);
  };
  
  // 关闭菜单
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // 打开排序菜单
  const handleSortMenuOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  
  // 关闭排序菜单
  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };
  
  // 打开筛选菜单
  const handleFilterMenuOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  
  // 关闭筛选菜单
  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };
  
  // 筛选模型
  const filteredModels = models.filter(model => {
    // 搜索筛选
    if (searchTerm && !model.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // 标签筛选
    if (tabValue === 1 && !model.favorite) {
      return false;
    }
    
    return true;
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 2, 
            fontWeight: 'bold',
          }}
        >
          模型管理
        </Typography>
        <Typography variant="body1" color="text.secondary">
          管理您创建的所有语音模型，支持编辑、删除和分享功能。
        </Typography>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={8}>
            <TextField
              fullWidth
              placeholder="搜索模型..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SortIcon />}
              onClick={handleSortMenuOpen}
              size="medium"
            >
              排序
            </Button>
            <Menu
              anchorEl={sortAnchorEl}
              open={Boolean(sortAnchorEl)}
              onClose={handleSortMenuClose}
            >
              <MenuItem onClick={handleSortMenuClose}>名称 (A-Z)</MenuItem>
              <MenuItem onClick={handleSortMenuClose}>名称 (Z-A)</MenuItem>
              <MenuItem onClick={handleSortMenuClose}>最新创建</MenuItem>
              <MenuItem onClick={handleSortMenuClose}>最早创建</MenuItem>
              <MenuItem onClick={handleSortMenuClose}>使用次数</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleFilterMenuOpen}
              size="medium"
            >
              筛选
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterMenuClose}
            >
              <MenuItem onClick={handleFilterMenuClose}>所有类型</MenuItem>
              <MenuItem onClick={handleFilterMenuClose}>标准模型</MenuItem>
              <MenuItem onClick={handleFilterMenuClose}>高级模型</MenuItem>
              <MenuItem onClick={handleFilterMenuClose}>专业模型</MenuItem>
              <Divider />
              <MenuItem onClick={handleFilterMenuClose}>高质量 (&gt;80%)</MenuItem>
              <MenuItem onClick={handleFilterMenuClose}>中质量 (50-80%)</MenuItem>
              <MenuItem onClick={handleFilterMenuClose}>低质量 (&lt;50%)</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="所有模型" />
          <Tab label="收藏模型" />
        </Tabs>
      </Box>
      
      <Grid 
        container 
        spacing={3}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {filteredModels.length === 0 ? (
          <Grid item xs={12}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                bgcolor: theme.palette.mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.03)' 
                  : 'rgba(255, 255, 255, 0.03)',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                没有找到模型
              </Typography>
              <Typography variant="body2" color="text.secondary">
                尝试使用不同的搜索条件或创建新的模型
              </Typography>
            </Box>
          </Grid>
        ) : (
          filteredModels.map((model) => (
            <Grid item xs={12} sm={6} md={4} key={model.id}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <ModelAvatar>
                      <PersonIcon fontSize="large" />
                    </ModelAvatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" component="h2" noWrap>
                          {model.name}
                        </Typography>
                        <Box>
                          <IconButton 
                            size="small" 
                            onClick={() => handleToggleFavorite(model.id)}
                            color={model.favorite ? "primary" : "default"}
                          >
                            {model.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          </IconButton>
                          <IconButton 
                            size="small"
                            onClick={(e) => handleMenuOpen(e, model)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Chip 
                          label={model.type} 
                          size="small" 
                          sx={{ mr: 1 }}
                          color={
                            model.type === '标准' ? 'default' : 
                            model.type === '高级' ? 'primary' : 
                            'secondary'
                          }
                        />
                        <Typography variant="body2" color="text.secondary">
                          {model.createdAt}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      质量
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ flexGrow: 1, mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={model.quality} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: theme.palette.mode === 'light' 
                              ? 'rgba(0, 0, 0, 0.08)' 
                              : 'rgba(255, 255, 255, 0.08)',
                          }}
                          color={
                            model.quality >= 80 ? 'success' : 
                            model.quality >= 50 ? 'primary' : 
                            'warning'
                          }
                        />
                      </Box>
                      <Typography variant="body2">
                        {model.quality}%
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      使用次数: {model.usageCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      大小: {model.size}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    startIcon={<PlayArrowIcon />}
                    onClick={() => window.location.href = `/chat?model=${model.id}`}
                  >
                    开始对话
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(model)}
                  >
                    编辑
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))
        )}
      </Grid>
      
      {/* 删除确认对话框 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            您确定要删除模型 "{selectedModel?.name}" 吗？此操作无法撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            删除
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* 编辑对话框 */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      >
        <DialogTitle>编辑模型</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="模型名称"
            type="text"
            fullWidth
            variant="outlined"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>取消</Button>
          <Button onClick={handleEditConfirm} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* 更多选项菜单 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEditClick(selectedModel)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          编辑
        </MenuItem>
        <MenuItem onClick={() => window.location.href = `/chat?model=${selectedModel?.id}`}>
          <PlayArrowIcon fontSize="small" sx={{ mr: 1 }} />
          开始对话
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ShareIcon fontSize="small" sx={{ mr: 1 }} />
          分享
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <CloudDownloadIcon fontSize="small" sx={{ mr: 1 }} />
          导出
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleDeleteClick(selectedModel)} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          删除
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default ModelManagement;
