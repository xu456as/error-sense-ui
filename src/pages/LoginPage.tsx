import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [email, setEmail] = useState('developer@errsense.io');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await login(email, password);
      navigate('/developer-report');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        p: 2,
        background:
          'radial-gradient(circle at top left, rgba(255,183,3,0.26), transparent 30%), linear-gradient(135deg, #f4f7fb 0%, #d9eaf4 100%)',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 1024,
          overflow: 'hidden',
          border: '1px solid rgba(16, 42, 67, 0.08)',
          borderRadius: 6,
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <Box
            sx={{
              flex: 1,
              p: { xs: 4, md: 6 },
              color: 'white',
              background: 'linear-gradient(160deg, #0b4f6c 0%, #12344d 80%)',
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              ErrSense
            </Typography>
            <Typography sx={{ maxWidth: 420, mb: 3, color: 'rgba(255, 255, 255, 0.78)' }}>
              Track recurring failures, align root cause analysis, and keep reviewers focused on
              what still matters before production.
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body2">Developer and reviewer workflows in one console.</Typography>
              <Typography variant="body2">Local development backed by WireMock APIs.</Typography>
              <Typography variant="body2">Editable reviewer decisions ready for integration.</Typography>
            </Stack>
          </Box>
          <Box sx={{ flex: 1, p: { xs: 4, md: 6 } }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Sign in
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Use the mock login API to retrieve a token and enter the local workspace.
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {error ? <Alert severity="error">{error}</Alert> : null}
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
                />
                <Button type="submit" variant="contained" size="large" disabled={submitting}>
                  {submitting ? 'Signing in...' : 'Enter dashboard'}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
