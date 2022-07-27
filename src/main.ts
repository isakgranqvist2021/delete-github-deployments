import express from 'express';

import { inactivateAndDeleteByEnvironment } from './controllers';
import { parseHeaders } from './middleware';

const app = express();

app.use(express.json());

app.use('*', parseHeaders);

app.get('/start', inactivateAndDeleteByEnvironment);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
