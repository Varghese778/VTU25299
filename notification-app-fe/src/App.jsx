import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import NotificationsPage from './pages/Notifications';
import PriorityInbox from './pages/PriorityInbox';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    background: { default: '#121212', paper: '#1e1e1e' }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Notifications
            </Typography>
            <Button color="inherit" component={Link} to="/">Inbox</Button>
            <Button color="primary" component={Link} to="/priority">Priority</Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<NotificationsPage />} />
            <Route path="/priority" element={<PriorityInbox />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;