import { graphqlClient } from './graphqlClient';
import { GetUserWithReposDocument } from "@/graphql/generated/graphql";
import { GetUserWithReposQueryVariables } from '@/graphql/generated/graphql';

export async function getUserWithRepos(login: string) {
  const variables: GetUserWithReposQueryVariables = { login };

  const data = await graphqlClient.request(GetUserWithReposDocument, variables);

  return data.user;
}
