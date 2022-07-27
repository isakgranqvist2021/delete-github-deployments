import { Request, Response } from 'express';

import {
  deleteDeployment,
  getAllDeployments,
  inactivateDeployment,
} from '../services';

export const inactivateAndDeleteByEnvironment = async (
  req: Request,
  res: Response,
) => {
  const { auth, owner, repo } = req;

  const deployments = await getAllDeployments(auth, owner, repo);

  await Promise.all(
    deployments
      .filter((deployment: any) => deployment.environment !== 'production')
      .map(async (deployment: any) => {
        await inactivateDeployment(auth, owner, repo, deployment.id);
        await deleteDeployment(auth, owner, repo, deployment.id);

        console.log(`Deleted ${deployment.id}`);
        return;
      }),
  );

  res.json({
    error: null,
    statusCode: 200,
    data: null,
  });
};
