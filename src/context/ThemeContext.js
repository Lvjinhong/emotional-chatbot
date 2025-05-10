import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// 创建主题上下文
export const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#6200EE', // 主色
            light: '#B085F5',
            dark: '#3700B3',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: '#03DAC6', // 辅助色
            light: '#66FFF9',
            dark: '#00A896',
            contrastText: '#000000',
          },
          success: {
            main: '#4CAF50', // 成功色
          },
          warning: {
            main: '#FF9800', // 警告色
          },
          error: {
            main: '#F44336', // 错误色
          },
          background: {
            default: mode === 'light' ? '#F5F5F5' : '#121212',
            paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
          },
        },
        typography: {
          fontFamily: "'Roboto', 'Open Sans', sans-serif",
          h1: {
            fontWeight: 500,
            fontSize: '2.5rem',
          },
          h2: {
            fontWeight: 500,
            fontSize: '2rem',
          },
          h3: {
            fontWeight: 500,
            fontSize: '1.75rem',
          },
          h4: {
            fontWeight: 500,
            fontSize: '1.5rem',
          },
          h5: {
            fontWeight: 500,
            fontSize: '1.25rem',
          },
          h6: {
            fontWeight: 500,
            fontSize: '1rem',
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                transition: 'all 0.3s ease',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: mode === 'light' 
                  ? '0px 2px 8px rgba(0, 0, 0, 0.1)' 
                  : '0px 2px 8px rgba(0, 0, 0, 0.3)',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
