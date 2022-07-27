import fetch from 'node-fetch';

const baseUrl = 'https://api.github.com';

export const getAllDeployments = async (
  auth: string,
  owner: string,
  repo: string,
) => {
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
};

export const inactivateDeployment = async (
  auth: string,
  owner: string,
  repo: string,
  deployment_id: string,
) => {
  const response = await fetch(
    `${baseUrl}/repos/${owner}/${repo}/deployments/${deployment_id}/statuses`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${auth}`,
      },
      body: JSON.stringify({
        environment: 'testing',
        state: 'inactive',
      }),
    },
  );

  return await response.json();
};

export const deleteDeployment = async (
  auth: string,
  owner: string,
  repo: string,
  deployment_id: string,
) => {
  const response = await fetch(
    `${baseUrl}/repos/${owner}/${repo}/deployments/${deployment_id}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${auth}`,
      },
    },
  );

  return await response.json();
};
