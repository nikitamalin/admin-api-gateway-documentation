import React from "react";
import Link from "next/link";
import { useIframeContext } from "@/components/Context/iframe";

export default function Home() {
  const headingText = "text-2xl mt-5 font-medium";
  const subHeadingText = "text-xl font-medium";
  const subText = "text-lg";
  const linkClass = "cursor-pointer hover:text-orange mr-auto";

  return (
    <div className="flex flex-col max-w-[800px] w-[80vw] my-10 mx-auto ">
      <h1 className="mx-auto text-4xl">Setup for Car IQ Documentation</h1>
      <div className={`${subText} flex flex-col mt-5`}>
        <div className="flex flex-col gap-1">
          <a
            href="/setup#intro"
            className="text-orange border-b border-orange leading-6 hover:border-none hover:pb-[1px] hover:text-orangeHover cursor-pointer mr-auto"
          >
            Introduction
          </a>
          <a
            href="/setup#javascript"
            className="text-orange border-b border-orange leading-6 hover:border-none hover:pb-[1px] hover:text-orangeHover cursor-pointer mr-auto"
          >
            Javascript/Node.js
          </a>
          <a
            href="/setup#java"
            className="text-orange border-b border-orange leading-6 hover:border-none hover:pb-[1px] hover:text-orangeHover cursor-pointer mr-auto"
          >
            Java/Kotlin
          </a>
          <a
            href="/setup#swift"
            className="text-orange border-b border-orange leading-6 hover:border-none hover:pb-[1px] hover:text-orangeHover cursor-pointer mr-auto"
          >
            Swift
          </a>
          <a
            href="/setup#flutter"
            className="text-orange border-b border-orange leading-6 hover:border-none hover:pb-[1px] hover:text-orangeHover cursor-pointer mr-auto"
          >
            Flutter
          </a>
        </div>
        <h2 className="text-2xl mt-10" id="intro">
          Introduction to GraphQL
        </h2>
        <span className="mt-5">
          GraphQL is a query language which is executed by invoking an API call.
          A GraphQL service has a single url with a defined fields for both its
          input and output. For example, our development GraphQL service lies on
          this url:{" "}
          <a href="https://api-gateway.dev.gocariq.com/" target="_blank">
            https://api-gateway.dev.gocariq.com/
          </a>
          . If you would like to login to our platform and only need the access
          token, then you would use the following query and input schema.
        </span>
        <pre className="mt-2">
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
        <pre className="mt-2">
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
        <pre className="mt-2">
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
    .catch((error) => console.error("error:", error));`
            }}
          />
        </pre>
        <h2 className="text-2xl mt-10" id="java">
          Java/Kotlin
        </h2>
        <div>
          We suggest using{" "}
          <a href="https://www.apollographql.com/docs/kotlin" target="_blank">
            Apollo Kotlin
          </a>
        </div>
        <h2 className="text-2xl mt-10" id="swift">
          Swift
        </h2>
        <div>
          We suggest using{" "}
          <a href="https://www.apollographql.com/docs/ios" target="_blank">
            Apollo IOS
          </a>
        </div>
        <h2 className="text-2xl mt-10" id="flutter">
          Flutter
        </h2>
        <div>
          We suggest using{" "}
          <a href="https://pub.dev/packages/graphql" target="_blank">
            graphql: ^5.1.3 dart library
          </a>
        </div>
      </div>
    </div>
  );
}
