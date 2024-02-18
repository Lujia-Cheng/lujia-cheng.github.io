import { createContext, useState } from "react";

export const SERVER_STATUS = {
  Standby: "standby",
  Connecting: "connecting",
  Connected: "connected",
  Timeout: "timeout",
  Error: "error",
};

export const ServerStatusContext = createContext();

export const ServerStatusProvider = ({ children }) => {
  const [serverStatus, setServerStatus] = useState(SERVER_STATUS.Standby);

  const updateServerStatus = (newStatus) => {
    if (Object.values(SERVER_STATUS).includes(newStatus)) {
      setServerStatus(newStatus);
    } else {
      console.error("Invalid server status:", newStatus);
    }
  };

  return (
    <ServerStatusContext.Provider value={{ serverStatus, updateServerStatus }}>
      {children}
    </ServerStatusContext.Provider>
  );
};
