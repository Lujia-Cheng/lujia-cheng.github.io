import {createContext, useContext, useState} from "react";

// enums for server status
export const SERVER_STATUS = {
  STANDBY: "standby",
  CONNECTING: "connecting",
  CONNECTED: "connected",
  TIMEOUT: "timeout",
  ERROR: "error",
};

// TODO Type definition
// interface ServerStatusContextType {
//   status: ServerStatus;
//   setStatus: React.Dispatch<React.SetStateAction<ServerStatus>>;
// }

// interface ServerStatusProviderProps {
//   children: ReactNode;
// }

// Initialize the context
const ServerStatusContext = createContext();

// Provider
export const ServerStatusProvider = ({children}) => {
  const [status, setStatus] = useState(SERVER_STATUS.STANDBY); // Default status

  const value = {
    status,
    setStatus,
    SERVER_STATUS
  };

  return (
    <ServerStatusContext.Provider value={value}>
      {children}
    </ServerStatusContext.Provider>
  );
};

// Hook
export function useServerStatus() {
  const context = useContext(ServerStatusContext);
  if (context === undefined) {
    throw new Error(
      "useServerStatus must be used within a ServerStatusProvider"
    );
  }
  return context;
}
