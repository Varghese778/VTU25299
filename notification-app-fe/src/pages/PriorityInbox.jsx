import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { fetchNotifications } from '../api/api';
import { Log } from 'logging-middleware';

export default function PriorityInbox() {
  const [notifs, setNotifs] = useState([]);
  const [type, setType] = useState("");
  const [read, setRead] = useState(new Set());

  useEffect(() => {
    fetchNotifications(1, 100, type).then(data => {
      const typeWeights = { "Placement": 300, "Result": 200, "Event": 100 };
      const scored = data.map(n => {
        const timeMs = new Date(n.Timestamp.replace(" ", "T")).getTime();
        return { ...n, score: (typeWeights[n.Type] || 0) * 1e13 + timeMs };
      });
      scored.sort((a, b) => b.score - a.score);
      setNotifs(scored.slice(0, 10));
      Log("frontend", "info", "PriorityInbox", `Loaded top 10 priority type: ${type || 'all'}`);
    });
  }, [type]);

  const markRead = (id) => {
    setRead(new Set([...read, id]));
    Log("frontend", "info", "PriorityInbox", `Marked ${id} as read`);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Priority Inbox</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={type} label="Filter" onChange={(e) => setType(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {notifs.map(n => (
        <Card 
          key={n.ID} 
          sx={{ mb: 2, borderLeft: read.has(n.ID) ? 'none' : '4px solid #f48fb1', cursor: 'pointer' }}
          onClick={() => markRead(n.ID)}
        >
          <CardContent>
            <Typography variant="h6">{n.Type}</Typography>
            <Typography variant="body1">{n.Message}</Typography>
            <Typography variant="caption" color="text.secondary">{n.Timestamp}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
