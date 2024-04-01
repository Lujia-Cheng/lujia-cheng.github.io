import NavigationTabs from "./NavigationTabs";
import UtilityButtons from "./UtilityButtons";
import SocialLinks from "../SocialLinks";

import Divider from "@mui/material/Divider";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Header({ showSocialLinks = true }) {
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
      <NavigationTabs />
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
