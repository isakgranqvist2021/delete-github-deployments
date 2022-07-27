import { Router } from 'express';

import {
  deleteDeployment,
  getDeployments,
  inactivateAndDeleteByEnvironment,
  inactivateDeployment,
} from '../../controllers';

const router = Router();

router.delete('/:deployment_id', deleteDeployment);
router.get('/', getDeployments);
router.get('/delete', inactivateAndDeleteByEnvironment);
router.put('/inactivate/:deployment_id', inactivateDeployment);

export const deploymentsRouter = router;
