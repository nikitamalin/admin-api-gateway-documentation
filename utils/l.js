const { graphql, buildSchema } = require("graphql");

const mutation = `
  mutation userLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      expires_in
      token_type
      scope
      id_token
      access_token
      refresh_token
    }
  }
`;

const variables = {
  input: {
    username: "example@gmail.com",
    password: "1234",
    client_id: "your_client_id",
    client_secret: "your_client_secret",
    scope: "openid offline_access profile"
  }
};

// Define your GraphQL schema (replace this with your actual schema)
const schema = buildSchema(`
type UserLoginInput {
    username: String!
    password: String!
    client_id: String!
    client_secret: String!
    scope: String!
    grant_type: String
}

type Login {
    access_token: String
    expires_in: Int
    token_type: String
    refresh_token: String
    scope: String
    id_token: String
  }
  

type Mutation {
  userLogin(input: UserLoginInput!): Login
}
`);

// Perform the GraphQL mutation
graphql(schema, mutation, root, null, variables)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("error:", error);
  });
