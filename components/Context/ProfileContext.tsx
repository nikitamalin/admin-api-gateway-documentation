import { createContext, useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

const ProfileContext = createContext<{
  isOpen: any;
  onOpen: any;
  onClose: any;
  onToggle: any;
}>({
  isOpen: false,
  onOpen: () => {
    ("");
  },
  onClose: () => {
    ("");
  },
  onToggle: () => {
    ("");
  }
});
export function ProfileContextWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <ProfileContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        onToggle
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
export function useProfileContext() {
  return useContext(ProfileContext);
}

export default ProfileContext;
