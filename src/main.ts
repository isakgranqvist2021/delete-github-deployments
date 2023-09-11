import 'dotenv/config';

import {
  Config,
  Deployment,
  deleteDeploymentById,
  getAllDeployments,
  setDeploymentStatusById,
} from './services';

if (!process.env.ACCESS_TOKEN) {
  console.log('ACCESS_TOKEN is required');
  process.exit(1);
}

if (!process.env.GITHUB_USERNAME) {
  console.log('GITHUB_USERNAME is required');
  process.exit(1);
}

if (!process.env.GITHUB_REPOSITORY) {
  console.log('GITHUB_REPOSITORY is required');
  process.exit(1);
}

const config: Config = {
  access_token: process.env.ACCESS_TOKEN,
  github_username: process.env.GITHUB_USERNAME,
  github_repository: process.env.GITHUB_REPOSITORY,
};

const setStateAndDeleteDeployment = async ({ id }: Deployment) => {
  const setStatusRes = await setDeploymentStatusById({
    ...config,
    state: 'inactive',
    deployment_id: id,
  });

  if (setStatusRes) {
    console.log(`Set deployment ${id} to inactive`);
  } else {
    console.log(`Failed to set deployment ${id} to inactive`);
  }

  const deleteRes = await deleteDeploymentById({
    ...config,
    deployment_id: id,
  });

  if (deleteRes) {
    console.log(`Deleted deployment ${id}`);
  } else {
    console.log(`Failed to delete deployment ${id}`);
  }

  return id;
};

const main = async () => {
  const deployments = await getAllDeployments(config);

  if (!deployments?.length) {
    console.log('No deployments found');
    process.exit(1);
  }

  await Promise.all(deployments.map(setStateAndDeleteDeployment));
};

main();
