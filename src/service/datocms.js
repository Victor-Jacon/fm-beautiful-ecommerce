import { GraphQLClient, ClientContext } from 'graphql-hooks';

export const API_URL = 'https://graphql.datocms.com/';
export const API_TOKEN ='3a5ff75ed5dbfc7c6c91bdcd46a09a';

export const client = new GraphQLClient({
  url: "https://graphql.datocms.com/",
  headers: {
    "Authorization": `Bearer ${API_TOKEN}`,
  }
});