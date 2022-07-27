import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { Octokit } from 'octokit';

const baseUrl = 'https://api.github.com';

export const getDeployments = async (req: Request, res: Response) => {
  try {
    const { auth, owner, repo } = req;

    const response = await fetch(
      `${baseUrl}/repos/${owner}/${repo}/deployments?per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${auth}`,
        },
      },
    );

    const result: any = await response.json();

    res.json({
      error: null,
      statusCode: 200,
      data: result.map((item: any) => ({
        id: item.id,
        environment: item.environment,
      })),
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
    const { auth, owner, repo } = req;
    const { deployment_id } = req.params;

    const octokit = new Octokit({ auth });

    const result = await octokit.request(
      `DELETE /repos/${owner}/${repo}/deployments/${deployment_id}`,
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

export const inactivateDeployment = async (req: Request, res: Response) => {
  try {
    const { auth, owner, repo } = req;
    const { deployment_id } = req.params;

    const octokit = new Octokit({ auth });

    const result = await octokit.request(
      `POST /repos/${owner}/${repo}/deployments/${deployment_id}/statuses`,
      {
        owner,
        repo,
        deployment_id: Number(deployment_id),
        environment: 'testing',
        state: 'inactive',
      },
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

export const inactivateAndDeleteByEnvironment = async (
  req: Request,
  res: Response,
) => {
  console.log('Start');

  const { auth, owner, repo } = req;

  const octokit = new Octokit({ auth });

  const response = await fetch(
    `${baseUrl}/repos/${owner}/${repo}/deployments?per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${auth}`,
      },
    },
  );

  const result: any = await response.json();

  const promises = result
    .filter((item: any) => item.environment !== 'production')
    .map(async (item: any) => {
      await octokit.request(
        `POST /repos/${owner}/${repo}/deployments/${item.id}/statuses`,
        {
          owner,
          repo,
          deployment_id: Number(item.id),
          environment: 'testing',
          state: 'inactive',
        },
      );

      await octokit.request(
        `DELETE /repos/${owner}/${repo}/deployments/${item.id}`,
      );

      console.log(`Deleted ${item.id}`);
      return;
    });

  await Promise.all(promises);

  res.json({
    error: null,
    statusCode: 200,
    data: null,
  });
};
