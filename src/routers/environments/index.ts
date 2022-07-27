import { Router } from 'express';

import { getEnvironments } from '../../controllers';

const router = Router();

router.get('/', getEnvironments);

export const environmentsRouter = router;
