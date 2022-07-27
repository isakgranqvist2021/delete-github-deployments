import express from 'express';

import { inactivateAndDeleteByEnvironment } from './controllers';

const app = express();

app.use(express.json());

app.get('/start', inactivateAndDeleteByEnvironment);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
