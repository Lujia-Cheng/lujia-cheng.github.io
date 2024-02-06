import React, { useEffect, useState } from "react";
import SignalWifi4Bar from "@mui/icons-material/SignalWifi4Bar";
import SignalWifiOff from "@mui/icons-material/SignalWifiOff";
import PortableWifiOff from "@mui/icons-material/PortableWifiOff";

function ServerStatus() {
  // Use a string state to represent the connectivity status
  const [connectivityStatus, setConnectivityStatus] = useState("connecting"); // initial state is "connecting"

  const checkConnectivity = async () => {
    setConnectivityStatus("connecting"); // Set to connecting before attempting to check connectivity
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL || "http://localhost:5000");
      if (response.ok) {
        setConnectivityStatus("connected");
      } else {
        setConnectivityStatus("disconnected");
      }
    } catch (error) {
      setConnectivityStatus("disconnected");
    }
  };

  useEffect(() => {
    checkConnectivity();
    const intervalId = setInterval(checkConnectivity, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const renderConnectivityIndicator = () => {
    switch (connectivityStatus) {
      case "connected":
        return <SignalWifi4Bar color="success" />;
      case "disconnected":
        return <SignalWifiOff  />;
      case "connecting":
      default:
        return <PortableWifiOff color="action" />; // Assuming this icon for "connecting"
    }
  };

  return renderConnectivityIndicator();
}

export default ServerStatus;
