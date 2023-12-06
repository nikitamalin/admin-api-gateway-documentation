async function FetchIt() {
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
      username: "nikita@malinovsky.net",
      password: "Password21!",
      client_id: "B8Jsm6DF8uObvgwikBkP6hRgCSbGKu9W",
      client_secret:
        "qV4m6rPnq7qLOI0tkGWX9Z9vFt8r5L6C3qIuqcF3aIyloxH4awomPJ9ebFv56Zom",
      scope: "openid offline_access profile"
    }
  };

  await fetch("https://api-gateway.dev.gocariq.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: mutation,
      variables
    })
  })
    .then((res) => res.json())
    .then((res) => console.log(res.data))
    .catch((error) => console.error("Error:", error));
}

FetchIt();
