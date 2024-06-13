import React from "react";
import Link from "next/link";
import { useIframeContext } from "@/components/Context/iframe";

export default function Setup() {
  const headingText = "text-2xl mt-5 font-medium";
  const subHeadingText = "text-xl font-medium";
  const subText = "text-lg";

  const linkClass = "cursor-pointer underline mr-auto";

  return (
    <div className="flex flex-col max-w-[800px] w-[80vw] my-10 mx-auto ">
      <h1 className="mx-auto text-4xl">Setup for Car IQ Documentation</h1>
      <div className={`${subText} flex flex-col mt-5`}>
        <div className="flex flex-col gap-1">
          <Link href="/setup#intro" className={`${linkClass}`}>
            Introduction
          </Link>
          <Link href="/setup#javascript" className={`${linkClass}`}>
            Javascript/Node.js
          </Link>
          <Link href="/setup#java" className={`${linkClass}`}>
            Java/Kotlin
          </Link>
          <Link href="/setup#swift" className={`${linkClass}`}>
            Swift
          </Link>
          <Link href="/setup#flutter" className={`${linkClass}`}>
            Flutter
          </Link>
        </div>
        <h2 className="text-2xl mt-10" id="intro">
          Introduction to GraphQL
        </h2>
        <span className="mt-5">
          GraphQL is a query language which is executed by invoking an API call.
          A GraphQL service has a single url with a defined fields for both its
          input and output. For example, our development GraphQL service lies on
          this url:&nbsp;
          <a
            href="https://api-gateway.dev.cariqpay.com/"
            target="_blank"
            className={`${linkClass}`}
          >
            https://api-gateway.dev.cariqpay.com/
          </a>
          . If you would like to login to our platform and only need the access
          token, then you would use the following query and input schema.
        </span>
        <pre className="mt-2 text-sm">
          <code
            dangerouslySetInnerHTML={{
              __html: `mutation userLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
        access_token
    }
}`
            }}
          ></code>
        </pre>
        <pre className="mt-2 text-sm">
          <code
            dangerouslySetInnerHTML={{
              __html: `{
    "input": {
        "username": "example@gmail.com",
        "password": "1234",
        "client_id": "your_client_id",
        "client_secret": "your_client_secret",
        "scope": "openid offline_access profile"
    }
}`
            }}
          ></code>
        </pre>
        <span className="mt-2">
          In GraphQL, we have two operation types, query and mutation. These are
          known as operation names. The above login is a mutation as can be seen
          from &nbsp;
          <code>mutation userLogin</code>
          &nbsp; which means that resources have been modified(created, updated,
          or deleted) as tokens were generated and returned back to you. For
          requests where resources that weren&apos;t modified, we would use a
          query operation.
          <br></br>
          <br></br>
          If you would like to also retrieve another field defined on the
          userLogin schema like <code>token_type</code>, then you would just
          include that in the mutation as such:
        </span>
        <pre className="mt-2 text-sm">
          <code
            dangerouslySetInnerHTML={{
              __html: `mutation userLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
        token_type
        access_token
    }
}`
            }}
          ></code>
        </pre>
        <span className="mt-5">
          With that said, let&apos;s jump into integrating Car IQ&apos;s GraphQL
          service with your client!
        </span>
        <h2 className="text-2xl mt-10" id="javascript">
          Javascript
        </h2>
        <span className="mt-5">
          Using your tech stack of choice, you can call our graphql endpoints
          similar to how you would call a REST api.
        </span>
        <span>
          If you&apos;res using javascript or a javascript framework like React,
          Angular, or Vue.js, you can call the graphql endpoint using a simple
          fetch request or use an external library. For react, we suggest using
          the
          <a
            href="https://www.apollographql.com/docs/react/get-started"
            target="_blank"
            className={`${linkClass}`}
          >
            <pre>
              <code>@apollo/client</code>
            </pre>
          </a>
          library.
        </span>
        <h3 className="text-xl mt-5">Fetch</h3>
        <pre>
          <code
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: `const mutation = \`
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
\`;

  const variables = {
    input: {
      username: "example@gmail.com",
      password: "1234",
      client_id: "your_client_id",
      client_secret:
        "your_client_secret",
      scope: "openid offline_access profile"
    }
  };

  await fetch("https://api-gateway.dev.cariqpay.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: mutation,
      variables
    })
  })
    .then((res) => res.json())
    .then((res) => console.log(res.data))
    .catch((error) => console.error("error:", error));`
            }}
          />
        </pre>
        <h2 className="text-2xl mt-10" id="java">
          Java/Kotlin
        </h2>
        <div>
          We suggest using{" "}
          <a
            href="https://www.apollographql.com/docs/kotlin"
            target="_blank"
            className={`${linkClass}`}
          >
            Apollo Kotlin
          </a>
          .
          <br /> <br />
          Here&apos;s an example of userLoginOtpRequest to initiate the driver
          login. First we add the mutation to our graphql schema.
          <pre className="mt-2 text-sm whitespace-pre-wrap">
            <code
              dangerouslySetInnerHTML={{
                __html: `mutation userLoginOtpRequest($client_id: String, $client_secret: String, $connection: String, $phone_number: String, $send: String, $language: String) {
  userLoginOtpRequest(client_id: $client_id, client_secret: $client_secret, connection: $connection, phone_number: $phone_number, send: $send, language: $language) {
    success
    error
  }
}
              `
              }}
            />
          </pre>
          Then we write the logic to execute the mutation in another file.
          <pre className="mt-2 text-sm whitespace-pre-wrap">
            <code
              dangerouslySetInnerHTML={{
                __html: `private suspend fun userLoginOtpRequest(client_id: String, client_secret: String, connection: String, phone_number: String, send: String, language: String): Boolean {
  val response = try {
      apolloClient.mutation(LoginMutation(email = email)).execute()
  } catch (e: ApolloException) {
      Log.w("Login", "Failed to login", e)
      return false
  }
  if (response.hasErrors()) {
      Log.w("Login", "Failed to login: \${response.errors?.get(0)?.message}")
      return false
  }
  val success = response.data?.userLoginOtpRequest?.success
  if (success == false) {
      Log.w("Login", "Failed to login")
      return false
  }
  return true
}
              `
              }}
            />
          </pre>
        </div>
        <h2 className="text-2xl mt-10" id="swift">
          Swift
        </h2>
        <div>
          We suggest using{" "}
          <a
            href="https://www.apollographql.com/docs/ios"
            target="_blank"
            className={`${linkClass}`}
          >
            Apollo IOS
          </a>
          <br />
          <br />
          Here&apos;s an example of userLoginOtpRequest to initiate the driver
          login. First we add the mutation to our graphql schema.
          <pre className="mt-2 text-sm whitespace-pre-wrap">
            <code
              dangerouslySetInnerHTML={{
                __html: `mutation userLoginOtpRequest($client_id: String!, $client_secret: String!, $connection: String!, $phone_number: String, $send: String, $language: String) {
  userLoginOtpRequest(client_id: $client_id, client_secret: $client_secret, connection: $connection, phone_number: $phone_number, send: $send, language: $language) {
    success
    error
  }
}
              `
              }}
            />
          </pre>
          Then we write the logic to execute the mutation in another file.
          <pre className="mt-2 text-sm whitespace-pre-wrap">
            <code
              dangerouslySetInnerHTML={{
                __html: `Network.shared.apollo.perform(mutation: LoginMutation(client_id: client_id, client_secret: client_secret, connection: connection, phone_number: phone_number, send: send, language: language)) { [weak self] result in
  defer {
      self?.isSubmitEnabled = true
  }

  switch result {
  case .success(let graphQLResult):
      if let success = graphQLResult.data?.userLoginOtpRequest?.success {
          self?.isPresented = false
      }

      if let errors = graphQLResult.errors {
          self?.appAlert = .errors(errors: errors)
      }
  case .failure(let error):
      self?.appAlert = .errors(errors: [error])
  }
}
`
              }}
            />
          </pre>
        </div>
        <h2 className="text-2xl mt-10" id="flutter">
          Flutter
        </h2>
        <div>
          We suggest using{" "}
          <a
            href="https://pub.dev/packages/graphql"
            target="_blank"
            className={`${linkClass}`}
          >
            graphql: ^5.1.3 dart library
          </a>
        </div>
        <span>
          Here&apos;s an example userLoginOtpRequest mutation that you would use
          to sign in a driver in your mobile app.
          <pre className="mt-2 text-sm whitespace-pre-wrap">
            <code
              dangerouslySetInnerHTML={{
                __html: `const String userLoginOtpRequest = r'''
  mutation userLoginOtpRequest($input: UserLoginOtpRequestInput!) {
    action: userLoginOtpRequest(input: {client_id: $client_id, client_secret: $client_secret, connection: $connection, phone_number: $phone_number, send: $send, language: $language}) {
        success
        error
    }
  }
''';

final MutationOptions options = MutationOptions(
  document: gql(userLoginOtpRequest),
  variables: <String, String>{
    'client_id': "your_client_id",
    'client_secret': "your_client_secret",
    'connection': "SMS",
    'phone_number': "15555555555",
    "send": "CODE",
    "language: 'EN',
  },
);

final QueryResult result = await client.mutate(options);
if (result.hasException) {
  print(result.exception.toString());
  return;
}

final String bool =
    result.data['action']['success'] as bool;

              `
              }}
            />
          </pre>
        </span>
      </div>
    </div>
  );
}
