import { Router } from 'express';

import {
  deleteDeployment,
  getDeployments,
  getEnvironments,
} from '../controllers';

const _router = Router();

_router.get('/environments', getEnvironments);
_router.get('/deployments', getDeployments);
_router.delete('/deployments/:deployment_id', deleteDeployment);

export const router = _router;
