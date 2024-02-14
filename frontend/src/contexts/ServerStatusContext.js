import { createContext, useState } from "react";
import { ServerStatus } from "../enums/ServerStatus";

export const ServerStatusContext = createContext();

export const ServerStatusProvider = ({ children }) => {
  const [serverStatus, setServerStatus] = useState(ServerStatus.Standby);

  const updateServerStatus = (newStatus) => {
    if (Object.values(ServerStatus).includes(newStatus)) {
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
