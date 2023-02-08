import 'dotenv/config';

import {
  Config,
  Deployment,
  deleteDeploymentById,
  getAllDeployments,
  setDeploymentStatusById,
} from './services';

const config: Config = {
  access_token: process.env.ACCESS_TOKEN!,
  github_username: process.env.GITHUB_USERNAME!,
  github_repository: process.env.GITHUB_REPOSITORY!,
};

const callback = async ({ id }: Deployment) => {
  await setDeploymentStatusById({
    ...config,
    state: 'inactive',
    deployment_id: id,
  });

  await deleteDeploymentById({
    ...config,
    deployment_id: id,
  });

  return id;
};

const main = async () => {
  const deployments = await getAllDeployments(config);

  if (!deployments?.length) {
    console.log('No deployments found');
    process.exit(1);
  }

  const _deployments = deployments.filter(
    (deployment: any) => deployment.environment !== 'production',
  );

  const ids = await Promise.all(_deployments.map(callback));

  console.log(`Deleted ${ids.length} deployments`);
  console.log('Done');
};

main();
