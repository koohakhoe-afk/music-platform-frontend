import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SongUpload() {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    price: "",
    description: ""
  });
  const [audioFile, setAudioFile] = useState(null);
  const navigate = useNavigate();

  // 환경에 따라 API URL 자동 설정 (로컬 vs 배포)
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://your-backend-domain.vercel.app"; // ✅ 여기에 실제 백엔드 주소 입력

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setAudioFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let audioUrl = '';

      // 1️⃣ 음원 파일 업로드
      if (audioFile) {
        const fd = new FormData();
        fd.append('audio', audioFile);

        const uploadRes = await fetch(`${API_BASE}/api/upload/audio`, {
          method: 'POST',
          body: fd,
        });

        if (!uploadRes.ok) throw new Error('음원 업로드 실패');

        const uploadData = await uploadRes.json();
        audioUrl = uploadData.url;
      }

      // 2️⃣ 음원 정보 등록
      const songRes = await fetch(`${API_BASE}/api/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, audioUrl }),
      });

      if (!songRes.ok) throw new Error('음원 등록 실패');

      alert('음원 등록이 완료되었습니다! 🎵');
      navigate('/'); // ✅ 등록 완료 후 메인으로 이동

    } catch (error) {
      console.error('업로드 에러:', error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '40px auto', padding: '16px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          음원 등록하기
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="노래 제목"
            required
            fullWidth
            margin="normal"
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            name="artist"
            label="가수"
            required
            fullWidth
            margin="normal"
            value={form.artist}
            onChange={handleChange}
          />
          <TextField
            name="price"
            label="가격"
            type="number"
            required
            fullWidth
            margin="normal"
            value={form.price}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="설명"
            fullWidth
            margin="normal"
            value={form.description}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            style={{ margin: '10px 0' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            음원 등록
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SongUpload;

