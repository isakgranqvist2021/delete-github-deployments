update config in src/main.ts

```typescript
export interface Config {
  access_token: string;
  github_username: string;
  github_repository: string;
}

const config: Config = {
  access_token: '', // can be generated here: https://github.com/settings/tokens/new
  github_username: '',
  github_repository: '',
};
```
