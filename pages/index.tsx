import Image from "next/image";
import { Inter } from "next/font/google";

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
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useProfileContext } from "@/components/Context/ProfileContext";
import Confetti from "@/components/Confetti";
import DriversSkeleton from "@/components/Skeletons/Drivers";

export default function Home() {
  const { data: session, status } = useSession();
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isVoteLoading, setIsVoteLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [vote, setVote] = useState<number>(0);
  const [driver, setDriver] = useState<string>("");
  const toast = useToast();
  let { isOpen, onOpen, onClose } = useProfileContext();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [firstPass, setFirstPass] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string>("");

  const labelStyles = "mt-4 text-xl";
  const inputStyles =
    "mt-1 mr-1 border border-gray rounded-md py-1 px-3 text-2xl outline-blue cursor-text";

  const standingsURL = `/api/get-standings`;
  const { data: standings } = useSwr(standingsURL, async () => {
    const res = await fetch(standingsURL);
    return res.json();
  });

  useEffect(() => {
    const fetchSession = async () => {
      if (session && session.user) {
        if (session.user.email) {
          setEmail(session.user.email);
        }
        if (session.idToken) {
          setIdToken(session.idToken);
        }
      }
    };

    fetchSession();
  }, [session]);

  let profileURL = "";
  if (email && idToken) {
    profileURL = `/api/profile/get-profile?email=${email}&idToken=${idToken}`;
  }

  const { data: profile } = useSwr(profileURL, async () => {
    const res = await fetch(profileURL);
    return res.json();
  });

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated") {
    return (
      <main
        className={`flex h-[calc(100svh-73px)] flex-col items-center gap-10  bg-light p-24 ${inter.className}`}
      >
        <span className="text-4xl">
          <span className="font-semibold text-blue">Sign In</span> to Vote!
        </span>
        <div className="relative items-center ">
          <button
            onClick={() => {
              setIsSignInLoading(true);
              signIn("auth0", { callbackUrl: "/" }, { prompt: "login" }).then(
                () => {
                  setIsSignInLoading(false);
                }
              );
            }}
            className={`py-2 px-3 bg-orange rounded-lg hover:bg-orangeHover cursor-pointer text-white text-xl font-semibold
                ${isSignInLoading ? "opacity-0 pointer-events-none" : ""}`}
          >
            Sign In
          </button>
          {isSignInLoading && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-orange opacity-50 rounded-lg shadow-md py-2 px-3
                   cursor-not-allowed"
            >
              <Spinner size="md" color="white" />
            </div>
          )}
        </div>
      </main>
    );
  }

  const createToast = (response: any) => {
    if (response.ok) {
      toast({
        position: "top-right",
        render: () => (
          <div className="bg-blue p-3 rounded-lg">{response.message}</div>
        )
      });
    } else {
      toast({
        position: "top-right",
        render: () => (
          <div className="bg-orange p-3 rounded-lg">{response.message}</div>
        )
      });
    }
  };

  async function handleVote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsVoteLoading(true);
    const response = await fetch("/api/create-vote", {
      method: "POST",
      body: JSON.stringify({
        email: session?.user?.email,
        driver: driver,
        name: name,
        phoneNumber: phoneNumber,
        gender: gender,
        age: age,
        idToken: idToken
      })
    });
    const res = await response.json();
    if (res.message !== "Success") {
      createToast(res);
    } else {
      setIsVisible(true);
    }
    setIsVoteLoading(false);
    return await res;
  }

  async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsProfileLoading(true);
    const response = await fetch("/api/profile/update-profile", {
      method: "POST",
      body: JSON.stringify({
        email: session?.user?.email,
        name: name,
        phoneNumber: phoneNumber,
        gender: gender,
        age: age,
        idToken: idToken
      })
    });
    const res = await response.json();
    if (res.message !== "Success") {
      createToast(res);
    } else {
      onClose();
    }
    setIsProfileLoading(false);
    return await res;
  }

  if (firstPass && email && profile && !("message" in profile)) {
    setName(profile.name);
    setPhoneNumber(profile.phone_number);
    setGender(profile.gender);
    setAge(profile.age);
    if (!profile.profile_compelete) {
      onOpen();
    }
    setFirstPass(false);
  }
  return <DriversSkeleton />;
  if (status === "authenticated") {
    return (
      <main
        className={`flex h-[calc(100svh-73px)] flex-col items-center pt-12 pb-20 bg-light ${inter.className}`}
      >
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <form
                id="profile-form"
                className="flex flex-col bg-white py-8 px-12 rounded-lg"
                onSubmit={updateProfile}
              >
                <label className={labelStyles}>
                  Name
                  <span className="text-[#E53B17] ml-[2px]">*</span>
                </label>
                <input
                  type="text"
                  className={inputStyles}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <label className={labelStyles}>
                  Phone Number<span className="text-[#E53B17] ml-[2px]">*</span>
                </label>
                <input
                  type="text"
                  className={inputStyles}
                  required
                  placeholder="##########"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></input>
                <label className={labelStyles}>Gender</label>
                <select
                  id="gender"
                  name="gender"
                  defaultValue={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={inputStyles}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
                <label className={labelStyles}>Age</label>
                <select
                  id="age"
                  name="age"
                  defaultValue={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={inputStyles}
                >
                  <option>0-14</option>
                  <option>15-24</option>
                  <option>25-42</option>
                  <option>43-65</option>
                  <option>65+</option>
                </select>

                <div className="relative items-center mx-auto text-2xl mt-8 ">
                  <motion.button
                    type="submit"
                    value="Send"
                    whileHover={{
                      scale: 1.04,
                      transition: { duration: 0.1 }
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                    className={`flex bg-orange text-white rounded-full cursor-pointer transition-colors duration-200 hover:bg-orangeHover py-2 px-4 whitespace-nowrap ${
                      isProfileLoading ? "opacity-0 pointer-events-none" : ""
                    }`}
                  >
                    Save
                  </motion.button>
                  {isProfileLoading && (
                    <div className="absolute inset-0 flex items-center justify-center  bg-blue opacity-50 rounded-full py-2 px-4 cursor-not-allowed ">
                      <Spinner size="md" color="white" />
                    </div>
                  )}
                </div>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>

        {standings ? (
          <form
            id="form"
            className="flex flex-col base:w-[95%] footerXM:w-[90%] md:w-[700px] bg-white py-8 px-12 rounded-lg shadow-lg"
            onSubmit={handleVote}
          >
            <div>
              <TableContainer className="bg-white rounded-lg mt-8">
                <Table variant="simple">
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
                          className={`text-3xl hover:cursor-pointer ${
                            vote === index + 1
                              ? "bg-orangeComp"
                              : "hover:bg-light"
                          }`}
                          onClick={(e) => {
                            setVote(index + 1);
                            setDriver(standing.driver);
                          }}
                        >
                          <Td>
                            <span className="mr-2">{index + 1}</span>
                          </Td>
                          <Td>
                            <div className="flex items-center gap-2">
                              <Avatar
                                size="lg"
                                src={standing.image}
                                name={standing.driver}
                              />

                              <span className="">{standing.driver}</span>
                            </div>
                          </Td>
                          <Td>
                            <span>{standing.fan_votes.toLocaleString()}</span>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
            {isVisible && <Confetti />}
            <div className="relative items-center mx-auto text-2xl mt-8 ">
              <motion.button
                type="submit"
                className={`flex bg-orange text-white rounded-full transition-colors duration-200 hover:bg-orangeHover py-2 px-4 whitespace-nowrap ${
                  isVoteLoading ? "opacity-0 pointer-events-none" : ""
                }`}
                whileHover={{
                  scale: 1.04,
                  transition: { duration: 0.1 }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                Vote
              </motion.button>
              {isVoteLoading && (
                <div className="absolute inset-0 flex items-center justify-center  bg-blue opacity-50 rounded-full py-2 px-4 cursor-not-allowed ">
                  <Spinner size="md" color="white" />
                </div>
              )}
            </div>
          </form>
        ) : (
          <DriversSkeleton />
        )}
      </main>
    );
  }
}
