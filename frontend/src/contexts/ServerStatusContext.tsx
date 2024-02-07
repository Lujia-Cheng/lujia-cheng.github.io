import React, { createContext, useContext, useState, ReactNode } from "react";

// Enum
export enum ServerStatus {
  Idle = "idle",
  Connecting = "connecting",
  Connected = "connected",
  Timeout = "timeout",
  Error = "error",
}

// Type definition
interface ServerStatusContextType {
  status: ServerStatus;
  setStatus: React.Dispatch<React.SetStateAction<ServerStatus>>;
}

interface ServerStatusProviderProps {
  children: ReactNode;
}

// Initialize the context with a default value
const ServerStatusContext = createContext<ServerStatusContextType | undefined>(
  undefined
);

// Provider
export const ServerStatusProvider: React.FC<ServerStatusProviderProps> = ({
  children,
}) => {
  const [status, setStatus] = useState<ServerStatus>(ServerStatus.Idle); // Default status

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
export function useServerStatus(): ServerStatusContextType {
  const context = useContext(ServerStatusContext);
  if (context === undefined) {
    throw new Error(
      "useServerStatus must be used within a ServerStatusProvider"
    );
  }
  return context;
}
