import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
// import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import "./ServerIndicator.css";
import { ServerStatus } from "../../../constants/ServerStatus";

interface ServerIndicatorProps {
  serverStatus: ServerStatus;
}

export default function ServerIndicator({
  serverStatus,
}: ServerIndicatorProps) {
  return (
    <Tooltip
      aria-label={"Server Status" + serverStatus}
      title={"Server Status: " + serverStatus}
    >
      {/* <span>
        <IconButton disabled={true}> */}
      <DnsOutlinedIcon className={serverStatus} />
      {/* </IconButton>
      </span> */}
    </Tooltip>
  );
}
