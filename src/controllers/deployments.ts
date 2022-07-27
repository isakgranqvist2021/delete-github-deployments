import { Request, Response } from 'express';
import { Octokit } from 'octokit';

import { config } from '../config';

const { auth, owner, repo } = config;

export const getDeployments = async (req: Request, res: Response) => {
  try {
    const octokit = new Octokit({ auth });

    const result = await octokit.request(
      `GET /repos/${owner}/${repo}/deployments`,
      { owner, repo },
    );

    res.json({
      error: null,
      statusCode: 200,
      data: result.data,
    });
  } catch (err: any) {
    res.json({
      error: err.message,
      statusCode: err.status,
      data: null,
    });
  }
};

export const deleteDeployment = async (req: Request, res: Response) => {
  try {
    const { deployment_id } = req.params;

    const octokit = new Octokit({ auth });

    const result = await octokit.request(
      `DELETE /repos/${owner}/${repo}/deployments/${Number(deployment_id)}`,
    );

    res.json({
      error: null,
      statusCode: 200,
      data: result.data,
    });
  } catch (err: any) {
    res.json({
      error: err.message,
      statusCode: err.status,
      data: null,
    });
  }
};
