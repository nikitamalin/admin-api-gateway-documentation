import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Third Party
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/Auth/LoadingSpinner";
import useSwr from "swr";
import { Tooltip } from "@chakra-ui/react";

function allowedEmail(email: string) {
  const emailList = ["nikita@cariqpay.com", "matt@cariqpay.com"];
  if (emailList.includes(email)) {
    return true;
  }
  return false;
}

export default function Admin() {
  const [email, setEmail] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [addedDomain, setAddedDomain] = useState("");
  const [addedEmail, setAddedEmail] = useState("");

  const [addDomainLoading, setAddDomainLoading] = useState(false);
  const [addEmailLoading, setAddEmailLoading] = useState(false);

  const [deleteDomainLoading, setDeleteDomainLoading] = useState(false);
  const [deleteEmailLoading, setDeleteEmailLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  let domainsURL = "";
  let emailsURL = "";
  if (email && allowedEmail(email)) {
    domainsURL = `/api/domains/get-all?email=${email}&idToken=${idToken}`;
    emailsURL = `/api/emails/get-all?email=${email}&idToken=${idToken}`;
  }

  const { data: domains, mutate: domainsMutate } = useSwr(
    domainsURL,
    async () => {
      const res = await fetch(domainsURL);
      return res.json();
    }
  );

  const { data: emails, mutate: emailsMutate } = useSwr(emailsURL, async () => {
    const res = await fetch(emailsURL);
    return res.json();
  });

  useEffect(() => {
    const fetchSession = async () => {
      if (session && session.user && session.user.email) {
        setEmail(session.user.email);
      }
      if (session && session.idToken) {
        setIdToken(session.idToken);
      }
    };

    fetchSession();
  }, [session]);
  if (!email) {
    return <LoadingSpinner />;
  }
  if (!allowedEmail(email)) {
    router.push("/");
    return <></>;
  }

  async function addDomain(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setAddDomainLoading(true);

    const response = await fetch("/api/domains/add-value", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        idToken: idToken,
        domain: addedDomain
      })
    });

    const res = await response.json();
    if (response.ok) {
      setAddedDomain("");
      await domainsMutate();
    }
    setAddDomainLoading(false);
    return await res;
  }

  async function addEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAddEmailLoading(true);

    const response = await fetch("api/emails/add-value", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        idToken: idToken,
        addedEmail: addedEmail
      })
    });

    const res = await response.json();
    if (response.ok) {
      setAddedEmail("");
      await emailsMutate();
    }
    setAddEmailLoading(false);
    return await res;
  }

  async function deleteDomain(domain: string) {
    setDeleteDomainLoading(true);

    const response = await fetch("/api/domains/remove-value", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        idToken: idToken,
        domain: domain
      })
    });

    const res = await response.json();
    if (response.ok) {
      await domainsMutate();
    }
    setDeleteDomainLoading(false);
    return await res;
  }

  async function deleteEmail(emailToDelete: string) {
    setDeleteEmailLoading(true);

    const response = await fetch("api/emails/remove-value", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        idToken: idToken,
        emailToDelete: emailToDelete
      })
    });

    const res = await response.json();
    if (response.ok) {
      await emailsMutate();
    }
    setDeleteEmailLoading(false);
    return await res;
  }

  return (
    <div className="flex flex-col max-w-[800px] w-[80vw] my-10 mx-auto ">
      <h1 className="mx-auto text-4xl">Admin</h1>
      <h2>Allowable Domains</h2>
      <div className="flex gap-2 items-center mt-2">
        {domains &&
          domains.map((domain: string, index: number) => {
            return (
              <Tooltip label="Delete domain" key={index}>
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    deleteDomain(domain);
                  }}
                >
                  {domain}
                  {index !== domains.length - 1 && ","}
                </span>
              </Tooltip>
            );
          })}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span>Add domain: </span>{" "}
        <input
          type="text"
          placeholder="@example.com"
          value={addedDomain}
          required
          onChange={(event) => {
            setAddedDomain(event.target.value);
          }}
          className="outline-none border-2 indent-1 rounded-lg focus:ring-2 focus:border-transparent "
        />
        <button
          className="py-2 px-3 rounded-lg p-2 bg-orange hover:bg-orangeHover"
          onClick={addDomain}
        >
          Submit
        </button>
      </div>
      <h2 className="mt-12">Allowable Emails:</h2>
      <div className="flex gap-2 items-center mt-2">
        {emails &&
          emails.map((currentEmail: string, index: number) => {
            return (
              <Tooltip label="Delete email" key={index}>
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    deleteEmail(currentEmail);
                  }}
                >
                  {currentEmail}
                  {index !== emails.length - 1 && ","}
                </span>
              </Tooltip>
            );
          })}
      </div>

      <form onSubmit={addEmail} className="flex items-center gap-2 mt-2">
        <span>Add email: </span>
        <input
          type="email"
          placeholder="sterling@cariqpay.com"
          value={addedEmail}
          required
          onChange={(event) => {
            setAddedEmail(event.target.value);
          }}
          className="outline-none border-2 indent-1 rounded-lg focus:ring-2 focus:border-transparent "
        />

        <button className="py-2 px-3 rounded-lg p-2 bg-orange hover:bg-orangeHover">
          Submit
        </button>
      </form>
    </div>
  );
}
