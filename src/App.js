import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import MyTabs from './MyTabs';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },

    background: {
      default: '#06244e',
    },
    header:{
      default:"#673AB7"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <MyTabs />
      </div>
    </ThemeProvider>
  );
}

export default App;
