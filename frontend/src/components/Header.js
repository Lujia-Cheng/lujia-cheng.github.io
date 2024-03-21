import NavigationPanel from "./NavigationPanel";
import UtilityPanel from "./UtilityPanel";
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
      <NavigationPanel />
      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        sx={{ marginLeft: "auto" }}
      />
      <UtilityPanel />
    </header>
  );
}
