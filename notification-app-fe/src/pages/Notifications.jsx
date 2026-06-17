import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Pagination } from '@mui/material';
import { fetchNotifications } from '../api/api';
import { Log } from 'logging-middleware';

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState([]);
  const [page, setPage] = useState(1);
  const [read, setRead] = useState(new Set());

  useEffect(() => {
    fetchNotifications(page, 10).then(data => {
      setNotifs(data);
      Log("frontend", "info", "NotificationsPage", `Loaded page ${page}`);
    });
  }, [page]);

  const markRead = (id) => {
    setRead(new Set([...read, id]));
    Log("frontend", "info", "NotificationsPage", `Marked ${id} as read`);
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>All Notifications</Typography>
      {notifs.map(n => (
        <Card 
          key={n.ID} 
          sx={{ mb: 2, borderLeft: read.has(n.ID) ? 'none' : '4px solid #90caf9', cursor: 'pointer' }}
          onClick={() => markRead(n.ID)}
        >
          <CardContent>
            <Typography variant="h6">{n.Type}</Typography>
            <Typography variant="body1">{n.Message}</Typography>
            <Typography variant="caption" color="text.secondary">{n.Timestamp}</Typography>
          </CardContent>
        </Card>
      ))}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination count={10} page={page} onChange={(e, v) => setPage(v)} color="primary" />
      </Box>
    </Box>
  );
}
