import { Request, Response } from 'express';
import { Octokit } from 'octokit';

export const getEnvironments = async (req: Request, res: Response) => {
  try {
    const { auth, owner, repo } = req;

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
