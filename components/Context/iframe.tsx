import React, { createContext, useContext, useState } from "react";

const IframeContext = createContext<{ url: string; setUrl: any }>({
  url: "",
  setUrl: () => null
});

export function IframeContextWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const [url, setUrl] = useState("api/protectedPage");
  return (
    <IframeContext.Provider value={{ url, setUrl }}>
      {children}
    </IframeContext.Provider>
  );
}

export function useIframeContext() {
  return useContext(IframeContext);
}

export default IframeContext;
