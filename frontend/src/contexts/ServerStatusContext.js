import React, {createContext, useState} from 'react';
import {ServerStatus} from '../enums/ServerStatus';


export const ServerStatusContext = createContext();

export const ServerStatusProvider = ({children}) => {
  const [serverStatus, setServerStatus] = useState(ServerStatus.Standby);

  const updateServerStatus = (status) => {
    if (Object.values(ServerStatus).includes(status)) {
      setServerStatus(status);
    } else {
      console.error('Invalid server status:', status);
    }
  };

  return (
    <ServerStatusContext.Provider value={{serverStatus, updateServerStatus}}>
      {children}
    </ServerStatusContext.Provider>
  );
};
