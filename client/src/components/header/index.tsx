import NavigationTabs from "./NavigationTabs";
import UtilityButtons from "./UtilityButtons";
import SocialLinks from "../SocialLinks.js";

import Divider from "@mui/material/Divider";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface HeaderProps {
  showSocialLinks?: boolean;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

export default function Header({
  showSocialLinks = true,
  selectedTab = 0,
  setSelectedTab,
}: HeaderProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <NavigationTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        sx={{ marginLeft: "auto" }}
      />
      {showSocialLinks && <SocialLinks compact={isSmallScreen} />}
      <UtilityButtons />
    </header>
  );
}
