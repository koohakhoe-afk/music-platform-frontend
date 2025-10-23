import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (isLogin && data.token) localStorage.setItem('token', data.token);
    alert(data.message || data.error);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: '40px auto' }}>
      <CardContent>
        <Typography variant="h5">{isLogin ? '로그인' : '회원가입'}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="아이디"
            variant="outlined"
            margin="normal"
            fullWidth
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            name="password"
            type="password"
            label="비밀번호"
            variant="outlined"
            margin="normal"
            fullWidth
            value={form.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLogin ? '로그인' : '회원가입'}
          </Button>
        </form>
        <Button onClick={() => setIsLogin(!isLogin)} fullWidth sx={{ mt: 2 }}>
          {isLogin ? '회원가입으로' : '로그인으로'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default Auth;