import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Creating a context to handle color mode (light/dark)
export const ColorModeContext = createContext();

// Component that provides color mode context and applies the Material-UI theme
function ToggleColorMode({ children }) {
  const [mode, setMode] = useState('dark');

  // Function to toggle between light and dark modes
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Memoize the theme object to prevent unnecessary recalculations on re-renders
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]); // Only re-create theme when mode changes

  // Memoize the context value to avoid unnecessary re-renders of consumers
  const contextValue = useMemo(() => ({
    mode,
    setMode,
    toggleColorMode,
  }), [mode, setMode, toggleColorMode]);

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;
