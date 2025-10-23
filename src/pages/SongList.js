import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function SongList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/songs')
      .then(res => res.json())
      .then(data => setSongs(data));
  }, []);

  const payWithIamport = song => {
    const { IMP } = window;
    IMP.init('아임포트가맹점식별코드'); // 실제 코드로 교체
    IMP.request_pay({
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      name: song.title,
      amount: song.price,
      buyer_email: 'test@example.com',
      buyer_name: '테스트유저',
    }, rsp => {
      if (rsp.success) {
        alert('결제 성공!');
        // 결제 내역 서버 저장 등 추가 구현 필요
      } else {
        alert('결제 실패!');
      }
    });
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        음원 목록
      </Typography>
      {songs.map(song => (
        <Card sx={{ margin: 2, maxWidth: 500, mx: 'auto' }} key={song._id}>
          <CardContent>
            <Typography variant="h6">{song.title} - {song.artist}</Typography>
            <audio controls src={song.audioUrl} style={{ width: '100%', margin: '10px 0' }}></audio>
            <Typography>{song.description}</Typography>
            <Button variant="contained" color="primary" onClick={() => payWithIamport(song)}>
              구매하기 ({song.price}원)
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default SongList;