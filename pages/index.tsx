import Image from "next/image";
import { Inter, Noto_Sans_Gunjala_Gondi } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import useSwr from "swr";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Menu,
  MenuList,
  Switch,
  useToast,
  Spinner,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from "@chakra-ui/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [vote, setVote] = useState<number>(0);
  const standingsURL = `/api/get-standings`;

  const { data: standings } = useSwr(standingsURL, async () => {
    const res = await fetch(standingsURL);
    return res.json();
  });

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated") {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        Sign in to Vote!
        <div className="relative items-center mx-auto my-auto">
          <button
            onClick={() => {
              setIsSignInLoading(true);
              signIn("auth0", { callbackUrl: "/" }, { prompt: "login" }).then(
                () => {
                  setIsSignInLoading(false);
                }
              );
            }}
            className={`py-2 px-3 bg-blue rounded-lg hover:bg-blueHover cursor-pointer text-white
                ${isSignInLoading ? "opacity-0 pointer-events-none" : ""}`}
          >
            Sign In
          </button>
          {isSignInLoading && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-blue opacity-50 rounded-lg shadow-md py-2 px-3
                   cursor-not-allowed"
            >
              <Spinner size="md" color="white" />
            </div>
          )}
        </div>
      </main>
    );
  }

  console.log(standings);

  if (status === "authenticated") {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 bg-light ${inter.className}`}
      >
        <div>
          {standings && (
            <TableContainer className="bg-white p-5 rounded-lg">
              <Table variant="simple" size="lg">
                <Thead>
                  <Tr>
                    <Th>Position</Th>

                    <Th>Driver</Th>
                    <Th>Votes</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {standings.map((standing: any, index: number) => {
                    return (
                      <Tr
                        key={index}
                        className={`text-3xl  hover:cursor-pointer ${
                          vote === index + 1 ? "bg-green" : "hover:bg-light"
                        }`}
                        onClick={() => setVote(index + 1)}
                      >
                        <Td>
                          <span className="mr-2">{index + 1}</span>
                        </Td>
                        <Td className="flex items-center gap-2">
                          <Avatar
                            size="lg"
                            src={standing.image}
                            name={standing.driver}
                          />

                          <span className="">{standing.driver}</span>
                        </Td>
                        <Td>
                          <span>
                            {standing.fan_votes + (vote === index + 1 ? 1 : 0)}
                          </span>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </div>
      </main>
    );
  }
}
