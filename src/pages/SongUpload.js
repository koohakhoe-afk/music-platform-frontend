import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

function SongUpload() {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    price: "",
    description: ""
  });
  const [audioFile, setAudioFile] = useState(null);
  const navigate = useNavigate(); // ✅ 추가

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = e => setAudioFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    let audioUrl = '';
    try {
      if (audioFile) {
        const fd = new FormData();
        fd.append('audio', audioFile);
        const res = await fetch('http://localhost:5000/api/upload/audio', {
          method: 'POST',
          body: fd
        });
        const data = await res.json();
        audioUrl = data.url;
      }

      await fetch('http://localhost:5000/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, audioUrl })
      });

      alert('등록 완료!');
      navigate('/'); // ✅ 등록 후 메인 페이지로 이동

    } catch (err) {
      console.error(err);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '40px auto' }}>
      <CardContent>
        <Typography variant="h5">음원 등록하기</Typography>
        <form onSubmit={handleSubmit}>
          <TextField name="title" label="노래 제목" required fullWidth margin="normal" value={form.title} onChange={handleChange} />
          <TextField name="artist" label="가수" required fullWidth margin="normal" value={form.artist} onChange={handleChange} />
          <TextField name="price" label="가격" type="number" required fullWidth margin="normal" value={form.price} onChange={handleChange} />
          <TextField name="description" label="설명" fullWidth margin="normal" value={form.description} onChange={handleChange} />
          <input type="file" accept="audio/*" onChange={handleFileChange} style={{ margin: '10px 0' }} />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            음원 등록
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SongUpload;
