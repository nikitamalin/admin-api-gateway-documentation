import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import useSwr from "swr";
import { useState, useEffect, Fragment } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  useToast,
  Spinner,
  AlertDescription,
  Alert,
  AlertIcon,
  chakra,
  CloseButton,
  AlertTitle,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import MobileMenu from "@/components/Navbar/MobileMenu";
import { motion } from "framer-motion";
import { useProfileContext } from "@/components/Context/ProfileContext";
import Confetti from "@/components/Confetti";
import Error from "@/components/Toast/error";
import Success from "@/components/Toast/success";
import { useDriverContext } from "@/components/Context/DriverContext";
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
  const {
    isOpen: signInIsOpen,
    onOpen: signInOnOpen,
    onClose: signInOnClose
  } = useDisclosure();

  let { drivers, isDriversLoading } = useDriverContext();

  const labelStyles = "mt-4 text-xl";
  const inputStyles =
    "mt-1 mr-1 border border-gray rounded-md py-1 px-3 text-2xl outline-blue cursor-text";

  useEffect(() => {
    const fetchSession = async () => {
      if (session && session.user) {
        if (session.user.name) {
          setPhoneNumber(session.user.name);
        }
        if (session.idToken) {
          setIdToken(session.idToken);
        }
      }
    };

    fetchSession();
  }, [session]);

  let profileURL = "";
  if (phoneNumber && idToken) {
    profileURL = `/api/profile/get-profile?phoneNumber=${phoneNumber}&idToken=${idToken}`;
  }

  const { data: profile } = useSwr(profileURL, async () => {
    const res = await fetch(profileURL);
    return res.json();
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      signInOnOpen();
    }
  }, [status, signInOnOpen]);

  if (isDriversLoading) {
    return;
  }

  const createSuccessToast = (res: any, isBlue = false) => {
    toast({
      position: "top-right",
      render: () => <Success message={res.message} />
    });
  };

  const createErrorToast = (res: any, isBlue = false) => {
    toast({
      position: "top-right",
      render: () => <Error message={res.message} />
    });
  };

  async function handleVote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsVoteLoading(true);
    const response = await fetch("/api/create-vote", {
      method: "POST",
      body: JSON.stringify({
        driver: driver,
        phoneNumber: phoneNumber,
        idToken: idToken
      })
    });
    const res = await response.json();
    if (
      res.message ===
        "Vote counted, check back in tomorrow to view results and we'll see you next weekend!" ||
      res.message === "Vote counted, we'll see you again tomorrow!"
    ) {
      setIsVisible(true);
      createSuccessToast(res, true);
    } else {
      createErrorToast(res);
    }
    await res;
    setIsVoteLoading(false);
    return;
  }

  async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsProfileLoading(true);
    const response = await fetch("/api/profile/update-profile", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        name: name,
        phoneNumber: phoneNumber,
        gender: gender,
        age: age,
        idToken: idToken
      })
    });
    const res = await response.json();
    if (res.message === "Success") {
      res.message = "Saved";
      onClose();
      createSuccessToast(res);
    } else {
      createErrorToast(res);
    }

    setIsProfileLoading(false);
    return await res;
  }

  if (firstPass && phoneNumber && profile && !("message" in profile)) {
    setName(profile.name);
    setEmail(profile.email);
    setGender(profile.gender);
    setAge(profile.age);
    if (!profile.profile_complete) {
      onOpen();
    }
    setFirstPass(false);
  }

  function fakeClose() {
    return true;
  }
  let response: any = {};

  return (
    <main
      className={`flex h-[calc(100svh)] brk:h-[calc(100svh-73px)] flex-col items-center  bg-black ${inter.className}`}
    >
      <div className="w-[100%] h-[100%] bg-[url('/bg-image.webp')]">
        <MobileMenu />
        <div className="flex flex-col items-center justify-center w-[100%] h-[100%]">
          {status === "unauthenticated" && (
            <Modal isOpen={true} onClose={fakeClose} isCentered>
              <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
              <ModalContent>
                <ModalBody>
                  <div className="flex flex-col items-center gap-10 p-10">
                    <div
                      className="relative
			w-[66px] h-[66px] 
			footerSM:w-[100px] footerSM:h-[100px] 
			md:w-[120px] md:h-[120px] "
                    >
                      <Image src="/fab4_logo.png" alt="Logo" fill />
                    </div>
                    <span className="text-4xl text-center">
                      <span className="font-semibold text-blue">Sign In</span>{" "}
                      to Vote!
                    </span>
                    <span className="text-center">
                      Cast your vote for a chance to win an all expense paid
                      trip to the Turkey Night Grand Prix.
                    </span>
                    <div className="relative items-center ">
                      <button
                        onClick={() => {
                          setIsSignInLoading(true);
                          signIn(
                            "auth0",
                            { callbackUrl: "http://localhost:3001/" },
                            { prompt: "login" }
                          ).then(() => {
                            setIsSignInLoading(false);
                          });
                        }}
                        className={`py-2 px-3 bg-orange rounded-lg hover:bg-orangeHover cursor-pointer text-white text-xl font-semibold outline-none
                      ${
                        isSignInLoading ? "opacity-0 pointer-events-none" : ""
                      }`}
                      >
                        Sign In to Win!
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
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
          {status === "authenticated" && (
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
                      Email<span className="text-[#E53B17] ml-[2px]">*</span>
                    </label>
                    <input
                      type="email"
                      className={inputStyles}
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                          isProfileLoading
                            ? "opacity-0 pointer-events-none"
                            : ""
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
          )}

          <form
            id="form"
            className="flex flex-col base:w-[96%] footerXM:w-[90%] md:w-[700px] bg-white py-4 px-6 tableSM:py-6 tableSM:px-9 md:py-8 md:px-12 rounded-lg shadow-lg"
            onSubmit={handleVote}
          >
            <table className="bg-white table-auto ">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Driver</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <tr
                        className={` hover:cursor-pointer py-2 row ${
                          vote === index + 1
                            ? "bg-orangeComp"
                            : "hover:bg-light"
                        }`}
                        onClick={(e) => {
                          setVote(index + 1);
                          setDriver(driver.driver);
                        }}
                      >
                        <td className="py-2 text-center">
                          <span className="text-sm footerXM:text-md lgMenu:text-lg md:text-xl">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-2 text-center pr-2 footerXM:px-0">
                          <div className="flex items-center justify-center gap-2 ">
                            <div className="relative w-[32px] h-[32px] lgMenu:w-[48px] lgMenu:h-[48px] md:w-[64px] md:h-[64px]">
                              <Image
                                fill
                                src={driver.image}
                                alt={driver.driver}
                                className="rounded-full"
                              />
                            </div>

                            <span className="text-md footerXM:text-lg lgMenu:text-xl md:text-2xl">
                              {driver.driver}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 text-center">
                          <span className="text-md footerXM:text-lg lgMenu:text-xl md:text-2xl ">
                            {driver.fan_votes.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                      {index !== 3 && (
                        <tr>
                          <td colSpan={3}>
                            <hr className="bg-[#C3C3C3] h-[1px]"></hr>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>

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
        </div>
      </div>
    </main>
  );
}
