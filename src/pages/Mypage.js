import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function Mypage() {
  const [userInfo, setUserInfo] = useState({});
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // 실제로는 서버에서 토큰으로 구매내역/유저정보 조회
    setUserInfo({ username: '테스트유저', email: 'test@example.com' });
    setPurchases([
      { title: '노래1', artist: '가수1', price: 1000 },
      { title: '노래2', artist: '가수2', price: 2000 }
    ]);
  }, []);

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>마이페이지</Typography>
      <Card sx={{ maxWidth: 400, mx: 'auto', my: 2 }}>
        <CardContent>
          <Typography variant="h6">내 정보</Typography>
          <Typography>아이디: {userInfo.username}</Typography>
          <Typography>이메일: {userInfo.email}</Typography>
        </CardContent>
      </Card>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>구매내역</Typography>
      {purchases.map((p, i) => (
        <Card sx={{ maxWidth: 400, mx: 'auto', my: 1 }} key={i}>
          <CardContent>
            <Typography>{p.title} - {p.artist}</Typography>
            <Typography>가격: {p.price}원</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Mypage;