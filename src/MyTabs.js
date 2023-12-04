import React from 'react';
import { Tabs, Tab, Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function MyTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resetTab = () => {
    setValue(0); // Resets to the first tab
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={resetTab}
          >
            <HomeIcon />
          </IconButton>
          {/* Flex container to center the title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Emotion Detection
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Visualize Dataset" />
        <Tab label="Performance Metrics" />
        <Tab label="Emotion Detection" />
        <Tab label="Analysis & Results" />
      </Tabs>
      {value === 0 && <Box p={3}>Content for Tab 1</Box>}
      {value === 1 && <Box p={3}>Content for Tab 2</Box>}
      {value === 2 && <Box p={3}>Content for Tab 3</Box>}
      {value === 3 && <Box p={3}>Content for Tab 4</Box>}
    </Box>
  );
}

export default MyTabs;
