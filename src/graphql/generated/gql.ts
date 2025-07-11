/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "query GetUserRepositories($login: String!) {\n  user(login: $login) {\n    repositories(\n      first: 20\n      orderBy: {field: UPDATED_AT, direction: DESC}\n      privacy: PUBLIC\n    ) {\n      nodes {\n        name\n        description\n        primaryLanguage {\n          name\n        }\n        stargazerCount\n        updatedAt\n        url\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}": typeof types.GetUserRepositoriesDocument;
  "query GetUserWithRepos($login: String!) {\n  user(login: $login) {\n    name\n    login\n    avatarUrl\n    bio\n    followers {\n      totalCount\n    }\n    repositories(\n      first: 20\n      orderBy: {field: UPDATED_AT, direction: DESC}\n      privacy: PUBLIC\n    ) {\n      totalCount\n      nodes {\n        id\n        name\n        description\n        primaryLanguage {\n          name\n        }\n        stargazerCount\n        updatedAt\n        url\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}": typeof types.GetUserWithReposDocument;
};
const documents: Documents = {
  "query GetUserRepositories($login: String!) {\n  user(login: $login) {\n    repositories(\n      first: 20\n      orderBy: {field: UPDATED_AT, direction: DESC}\n      privacy: PUBLIC\n    ) {\n      nodes {\n        name\n        description\n        primaryLanguage {\n          name\n        }\n        stargazerCount\n        updatedAt\n        url\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}":
    types.GetUserRepositoriesDocument,
  "query GetUserWithRepos($login: String!) {\n  user(login: $login) {\n    name\n    login\n    avatarUrl\n    bio\n    followers {\n      totalCount\n    }\n    repositories(\n      first: 20\n      orderBy: {field: UPDATED_AT, direction: DESC}\n      privacy: PUBLIC\n    ) {\n      totalCount\n      nodes {\n        id\n        name\n        description\n        primaryLanguage {\n          name\n        }\n        stargazerCount\n        updatedAt\n        url\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}":
    types.GetUserWithReposDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetUserRepositories($login: String!) {\n  user(login: $login) {\n    repositories(\n      first: 20\n      orderBy: {field: UPDATED_AT, direction: DESC}\n      privacy: PUBLIC\n    ) {\n      nodes {\n        name\n        description\n        primaryLanguage {\n          name\n        }\n        stargazerCount\n        updatedAt\n        url\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}",
): (typeof documents)["query GetUserRepositories($login: String!) {\n  user(login: $login) {\n    repositories(\n      first: 20\n      orderBy: {field: UPDATED_AT, direction: DESC}\n      privacy: PUBLIC\n    ) {\n      nodes {\n        name\n        description\n        primaryLanguage {\n          name\n        }\n        stargazerCount\n        updatedAt\n        url\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetUserWithRepos($login: String!) {\n  user(login: $login) {\n    name\n    login\n    avatarUrl\n    bio\n    followers {\n      totalCount\n    }\n    repositories(\n      first: 20\n      orderBy: {field: UPDATED_AT, direction: DESC}\n      privacy: PUBLIC\n    ) {\n      totalCount\n      nodes {\n        id\n        name\n        description\n        primaryLanguage {\n          name\n        }\n        stargazerCount\n        updatedAt\n        url\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}",
): (typeof documents)["query GetUserWithRepos($login: String!) {\n  user(login: $login) {\n    name\n    login\n    avatarUrl\n    bio\n    followers {\n      totalCount\n    }\n    repositories(\n      first: 20\n      orderBy: {field: UPDATED_AT, direction: DESC}\n      privacy: PUBLIC\n    ) {\n      totalCount\n      nodes {\n        id\n        name\n        description\n        primaryLanguage {\n          name\n        }\n        stargazerCount\n        updatedAt\n        url\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
