import React, { useState } from 'react';
import {
  Typography, TextField, Button, Grid, Alert
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { saveShortUrl } from '../utils/storage';
import { log } from '../../../middleware/log';

export default function UrlShortenerPage() {
  const [inputs, setInputs] = useState([{ url: '', code: '', validity: '' }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const handleAdd = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', code: '', validity: '' }]);
    }
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidCode = (code) => /^[a-zA-Z0-9]{3,12}$/.test(code);

  const handleSubmit = async () => {
    setError('');
    setSuccess(false);
    const codes = new Set();

    for (let { url, code, validity } of inputs) {
      if (!isValidURL(url)) {
        setError('Invalid URL format.');
        return;
      }

      const shortCode = code || uuidv4().slice(0, 6);
      if (code && !isValidCode(code)) {
        setError('Custom code must be alphanumeric and 3–12 characters.');
        return;
      }

      if (codes.has(shortCode)) {
        setError('Duplicate shortcode detected.');
        return;
      }

      codes.add(shortCode);

      const now = new Date();
      const expiresAt = new Date(now.getTime() + (parseInt(validity) || 30) * 60000);

      const data = {
        shortCode,
        url,
        created: now.toISOString(),
        expiry: expiresAt.toISOString(),
        clicks: []
      };

      saveShortUrl(data);
      await log('frontend', 'info', 'component', `Shortened URL: ${shortCode}`);
    }

    setSuccess(true);
    setInputs([{ url: '', code: '', validity: '' }]);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>

      {inputs.map((input, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Long URL" value={input.url}
              onChange={(e) => handleChange(index, 'url', e.target.value)}
              required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth label="Custom Code (optional)" value={input.code}
              onChange={(e) => handleChange(index, 'code', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth label="Validity (minutes)" value={input.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)} />
          </Grid>
        </Grid>
      ))}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Short URLs created successfully!</Alert>}

      <Button variant="outlined" onClick={handleAdd} disabled={inputs.length >= 5}>
        Add Another URL
      </Button>
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>
        Shorten
      </Button>
    </>
  );
}
