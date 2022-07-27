import { Router } from 'express';

import { deploymentsRouter } from './deployments';
import { environmentsRouter } from './environments';

const mainRouter = Router({ mergeParams: true });

mainRouter.use('/deployments', deploymentsRouter);
mainRouter.use('/environments', environmentsRouter);

export const router = mainRouter;
