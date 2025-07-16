import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShortUrl, logClick } from '../utils/storage';
import { log } from '../../../middleware/log';

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const entry = getShortUrl(shortcode);

    if (entry) {
      const now = new Date();
      const expiry = new Date(entry.expiry);

      if (now < expiry) {
        logClick(shortcode, {
          timestamp: now.toISOString(),
          referrer: document.referrer,
          location: 'unknown'
        });
        log('frontend', 'info', 'page', `Redirecting to ${entry.url}`);
        window.location.href = entry.url;
      } else {
        alert('This link has expired.');
        navigate('/');
      }
    } else {
      alert('Shortcode not found.');
      navigate('/');
    }
  }, [shortcode, navigate]);

  return null;
}
