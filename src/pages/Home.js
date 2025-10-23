import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import SongList from './SongList';

function Home() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🎵 음원 판매 플랫폼
          </Typography>
          <Button color="inherit" href="/mypage">마이페이지</Button>
          <Button color="inherit" href="/upload">음원 등록</Button>
          <Button color="inherit" href="/auth">로그인</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 4 }}>
        <SongList />
      </Box>
    </div>
  );
}

export default Home;