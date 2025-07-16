import React from 'react';
import { getAllShortUrls } from '../utils/storage';
import {
  Typography, Card, CardContent, List, ListItem, Divider
} from '@mui/material';

export default function UrlStatisticsPage() {
  const urls = getAllShortUrls();

  return (
    <>
      <Typography variant="h4" gutterBottom>Shortened URL Statistics</Typography>
      {urls.length === 0 && <Typography>No shortened URLs yet.</Typography>}
      {urls.map((item, index) => (
        <Card key={index} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">
              <a href={`/${item.shortCode}`}>{window.location.origin}/{item.shortCode}</a>
            </Typography>
            <Typography>Original: {item.url}</Typography>
            <Typography>Created: {new Date(item.created).toLocaleString()}</Typography>
            <Typography>Expires: {new Date(item.expiry).toLocaleString()}</Typography>
            <Typography>Total Clicks: {item.clicks.length}</Typography>
            <Divider sx={{ my: 1 }} />
            <List dense>
              {item.clicks.map((click, i) => (
                <ListItem key={i}>
                  • {new Date(click.timestamp).toLocaleString()} | Referrer: {click.referrer || 'Direct'}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
