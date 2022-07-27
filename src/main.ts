import express from 'express';

import { router } from './routers';

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
