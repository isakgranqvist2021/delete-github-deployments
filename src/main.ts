import {
  Config,
  deleteDeploymentById,
  getAllDeployments,
  setDeploymentStatusById,
} from './services';

const config: Config = {
  access_token: '', // can be generated here: https://github.com/settings/tokens/new
  github_username: '',
  github_repository: '',
};

const deleteAllDeployments = async () => {
  const deployments = await getAllDeployments(config);

  if (!deployments?.length) {
    console.log('No deployments found');
    process.exit(1);
  }

  const ids = await Promise.all(
    deployments
      .filter((deployment: any) => deployment.environment !== 'production')
      .map(async (deployment: any) => {
        const deployment_id = deployment.id;

        await setDeploymentStatusById({
          ...config,
          state: 'inactive',
          deployment_id,
        });

        await deleteDeploymentById({
          ...config,
          deployment_id,
        });

        return deployment.id;
      }),
  );

  console.log(`Deleted ${ids.length} deployments`);
  console.log('Done');
};

deleteAllDeployments();
