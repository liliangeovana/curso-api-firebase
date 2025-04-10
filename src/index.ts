import express from 'express';
import { routes } from './routes/index';

const app = express();
routes(app);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});