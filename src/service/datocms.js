import { GraphQLClient, ClientContext } from 'graphql-hooks';

export const API_URL = 'https://graphql.datocms.com/';
export const API_TOKEN ='9fa32113db7b0870f6f9acc923c737';

export const client = new GraphQLClient({
  url: "https://graphql.datocms.com/",
  headers: {
    "Authorization": `Bearer ${API_TOKEN}`,
  }
});