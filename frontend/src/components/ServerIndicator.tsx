import React from "react";
import { useServerStatus } from "../contexts/ServerStatusContext";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import "../styles/ServerIndicator.css";

export default function ServerIndicator() {
  const { status } = useServerStatus();

  function renderIcon() {
    return <DnsOutlinedIcon className={status} />;
  }

  return renderIcon();
}
