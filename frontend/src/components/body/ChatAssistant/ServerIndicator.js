import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useContext } from "react";
import { ServerStatusContext } from "../../../contexts/ServerStatusContext";

import "./ServerIndicator.css";

export default function ServerIndicator() {
  const { serverStatus } = useContext(ServerStatusContext);
  return (
    <Tooltip
      aria-label={"Server Status" + serverStatus}
      title={"Server Status: " + serverStatus}
    >
      <span>
        <IconButton disabled={true}>
          <DnsOutlinedIcon className={serverStatus} />
        </IconButton>
      </span>
    </Tooltip>
  );
}
