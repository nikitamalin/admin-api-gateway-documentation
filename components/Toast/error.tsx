import React from "react";
import {
  AlertDescription,
  Alert,
  AlertIcon,
  chakra,
  CloseButton,
  AlertTitle,
  useDisclosure
} from "@chakra-ui/react";

interface ToastProps {
  message?: string;
  title?: string;
}

export default function Error({
  message = "",
  title = ""
}: ToastProps): JSX.Element {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert
      addRole={false}
      bg="#F47721"
      alignItems="start"
      borderRadius="md"
      boxShadow="lg"
      paddingEnd={8}
      textAlign="start"
      width="auto"
      status="error"
    >
      <AlertIcon color="white" />
      <chakra.div flex="1" maxWidth="100%">
        <AlertTitle color="white" fontWeight="bold" fontSize="1.2rem">
          {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm" color="white" display="block">
          {message}
        </AlertDescription>
      </chakra.div>
      <CloseButton
        size="sm"
        onClick={onClose}
        position="absolute"
        insetEnd={1}
        top={1}
      />
    </Alert>
  ) : (
    <></>
  );
}
