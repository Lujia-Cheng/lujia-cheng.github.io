import React, { createContext, useContext, useState } from "react";

// Enum
export const ServerStatus = {
  // todo convert to typescript in the future
  Idle: "idle",
  Connecting: "connecting",
  Connected: "connected",
  Timeout: "timeout",
  Error: "error",
};

// Type definition
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
export const ServerStatusProvider = ({ children }) => {
  const [status, setStatus] = useState(ServerStatus.Idle); // Default status

  const value = {
    status,
    setStatus,
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
