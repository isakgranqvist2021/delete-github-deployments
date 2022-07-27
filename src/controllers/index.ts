import { Request, Response } from 'express';

import {
  deleteDeploymentById,
  getAllDeployments,
  setDeploymentStatusById,
} from '../services';

const validateBody = (body: any): string | null => {
  if (!body.auth) {
    return 'Missing key "auth"';
  }

  if (!body.owner) {
    return 'Missing key "owner"';
  }

  if (!body.repo) {
    return 'Missing key "repo"';
  }

  return null;
};

export const inactivateAndDeleteByEnvironment = async (
  req: Request,
  res: Response,
) => {
  const error = validateBody(req.body);

  if (error) {
    return res.json({
      error,
      statusCode: 400,
      data: null,
    });
  }

  const deployments = await getAllDeployments(req.body);

  if (!deployments?.length) {
    return res.json({
      error: 'No deployments found',
      statusCode: 404,
      data: null,
    });
  }

  const ids = await Promise.all(
    deployments
      .filter((deployment: any) => deployment.environment !== 'production')
      .map(async (deployment: any) => {
        const deployment_id = deployment.id;

        await setDeploymentStatusById({
          ...req.body,
          state: 'inactive',
          deployment_id,
        });

        await deleteDeploymentById({
          ...req.body,
          deployment_id,
        });

        return deployment.id;
      }),
  );

  return res.json({
    error: null,
    statusCode: 200,
    data: ids,
  });
};
