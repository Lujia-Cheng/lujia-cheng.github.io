import { createContext, useContext, useState } from "react";

export const SERVER_STATUS = {
  Standby: "standby",
  Connecting: "connecting",
  Connected: "connected",
  Timeout: "timeout",
  Error: "error",
};

export const ServerStatusContext = createContext();

export function ServerStatusProvider({ children }) {
  const [serverStatus, setServerStatus] = useState(SERVER_STATUS.Standby);

  function updateServerStatus(newStatus) {
    if (Object.values(SERVER_STATUS).includes(newStatus)) {
      setServerStatus(newStatus);
    } else {
      console.error("Invalid server status:", newStatus);
    }
  }

  return (
    <ServerStatusContext.Provider value={{ serverStatus, updateServerStatus }}>
      {children}
    </ServerStatusContext.Provider>
  );
}

export const useServerStatus = () => useContext(ServerStatusContext);
