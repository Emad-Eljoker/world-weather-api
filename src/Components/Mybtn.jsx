import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function Mybtn() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <Typography variant="h1" component="h2">
مرحبا 
</Typography>
    </Stack>
  );
}