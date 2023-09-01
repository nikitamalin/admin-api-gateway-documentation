import { createContext, useContext } from "react";

import useSwr from "swr";

const DriverContext = createContext<{
  drivers: any[];
  isDriversLoading: any;
}>({
  drivers: [],
  isDriversLoading: true
});
export function DriverContextWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const driversURL = `/api/get-standings`;
  const { data: drivers, isLoading: isDriversLoading } = useSwr(
    driversURL,
    async () => {
      const res = await fetch(driversURL);
      return res.json();
    }
  );

  return (
    <DriverContext.Provider
      value={{
        drivers,
        isDriversLoading
      }}
    >
      {children}
    </DriverContext.Provider>
  );
}
export function useDriverContext() {
  return useContext(DriverContext);
}

export default DriverContext;
