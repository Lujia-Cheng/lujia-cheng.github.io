import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

interface ChatSettingDropdownProps {
  resetCookies: () => void;
}

export default function ChatSettingDropdown({
  resetCookies,
}: ChatSettingDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenChatSetting = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseChatSetting = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Chat Settings">
        <IconButton
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleOpenChatSetting}
          color="inherit"
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="ai"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleCloseChatSetting}
      >
        <MenuItem onClick={handleCloseChatSetting}>Gemini</MenuItem>
        <Divider />
        <MenuItem onClick={resetCookies}>Reset</MenuItem>
      </Menu>
    </>
  );
}
