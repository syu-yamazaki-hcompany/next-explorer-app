import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://api.github.com/graphql': {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        'User-Agent': 'next-explorer-app',
      },
    },
  },
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  config: {
    useTypeImports: true,
    dedupeFragments: true,
  },
};

export default config;