import { Request, Response } from 'express';
import { Octokit } from 'octokit';

import { config } from '../config';

const { auth, owner, repo } = config;

export const getEnvironments = async (req: Request, res: Response) => {
  try {
    const octokit = new Octokit({ auth });

    const result = await octokit.request(
      `GET /repos/${owner}/${repo}/environments`,
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
