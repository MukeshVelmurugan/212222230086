import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
} from '@mui/material';

import UrlShortenerPage from './pages/UrlShortenerPage';
import UrlStatisticsPage from './pages/UrlStatisticsPage';
import RedirectHandler from './pages/RedirectHandler';

export default function App() {
  return (
    <Router>
      <CssBaseline />

      <AppBar
        position="static"
        sx={{
          backgroundColor: '#0d47a1',
          width: '100vw',
        }}
      >
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
            🔗 URL Shortener
          </Typography>
          <Button component={Link} to="/" color="inherit" sx={{ mx: 1 }}>
            Home
          </Button>
          <Button component={Link} to="/stats" color="inherit" sx={{ mx: 1 }}>
            Stats
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: 'calc(100vh - 54px - 60px)',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e3f2fd',
          px: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1000,
            backgroundColor: '#ffffff',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            mx: 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<UrlShortenerPage />} />
            <Route path="/stats" element={<UrlStatisticsPage />} />
            <Route path="/:shortcode" element={<RedirectHandler />} />
          </Routes>
        </Box>
      </Box>

      <Box
        textAlign="center"
        sx={{
          padding: 2,
          backgroundColor: '#0d47a1',
          color: '#ffffff',
          width: '100vw',
        }}
      >
        <Typography variant="body2">
          URL Shortener by Mukesh 🚀
        </Typography>
      </Box>
    </Router>
  );
}
