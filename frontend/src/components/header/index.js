import NavigationTabs from "./NavigationTabs";
import UtilityButtons from "./UtilityButtons";
import SocialLinks from "../SocialLinks";

import Divider from "@mui/material/Divider";

export default function Header() {
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
      <SocialLinks />
      <UtilityButtons />
    </header>
  );
}
