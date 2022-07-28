import fetch from 'node-fetch';

const baseUrl = 'https://api.github.com';

export interface Config {
  access_token: string;
  github_username: string;
  github_repository: string;
}

export interface Deployment {
  url: string;
  id: string;
  node_id: string;
  sha: string;
  ref: string;
  task: string;
  original_environment: string;
  environment: string;
  description: string;
  created_at: string;
  updated_at: string;
  transient_environment: boolean;
  production_environment: boolean;
}

type State =
  | 'error'
  | 'failure'
  | 'inactive'
  | 'in_progress'
  | 'queued'
  | 'pending';

export const getAllDeployments = async (
  config: Config,
): Promise<Deployment[] | null> => {
  try {
    const { github_username, github_repository, access_token } = config;

    const response = await fetch(
      `${baseUrl}/repos/${github_username}/${github_repository}/deployments`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${access_token}`,
        },
      },
    );

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const setDeploymentStatusById = async (
  config: Config & { deployment_id: string; state: State },
): Promise<boolean> => {
  try {
    const {
      github_username,
      github_repository,
      access_token,
      state,
      deployment_id,
    } = config;

    await fetch(
      `${baseUrl}/repos/${github_username}/${github_repository}/deployments/${deployment_id}/statuses`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${access_token}`,
        },
        body: JSON.stringify({ state }),
      },
    );

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteDeploymentById = async (
  config: Config & {
    deployment_id: string;
  },
): Promise<boolean> => {
  try {
    const { github_username, github_repository, access_token, deployment_id } =
      config;

    await fetch(
      `${baseUrl}/repos/${github_username}/${github_repository}/deployments/${deployment_id}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${access_token}`,
        },
      },
    );

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
