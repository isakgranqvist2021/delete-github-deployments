import fetch from 'node-fetch';

const baseUrl = 'https://api.github.com';

interface Config {
  auth: string;
  owner: string;
  repo: string;
}

interface Deployment {
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

export const getAllDeployments = async (
  config: Config,
): Promise<Deployment[] | null> => {
  try {
    const { owner, repo, auth } = config;

    const response = await fetch(
      `${baseUrl}/repos/${owner}/${repo}/deployments?per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${auth}`,
        },
      },
    );

    return await response.json();
  } catch {
    return null;
  }
};

export const setDeploymentStatusById = async (
  config: Config & {
    deployment_id: string;
    state:
      | 'error'
      | 'failure'
      | 'inactive'
      | 'in_progress'
      | 'queued'
      | 'pending';
  },
): Promise<boolean> => {
  try {
    const { owner, repo, auth, state, deployment_id } = config;

    await fetch(
      `${baseUrl}/repos/${owner}/${repo}/deployments/${deployment_id}/statuses`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${auth}`,
        },
        body: JSON.stringify({ state }),
      },
    );

    return true;
  } catch {
    return false;
  }
};

export const deleteDeploymentById = async (
  config: Config & {
    deployment_id: string;
  },
): Promise<boolean> => {
  try {
    const { owner, repo, auth, deployment_id } = config;

    await fetch(
      `${baseUrl}/repos/${owner}/${repo}/deployments/${deployment_id}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${auth}`,
        },
      },
    );

    return true;
  } catch {
    return false;
  }
};
