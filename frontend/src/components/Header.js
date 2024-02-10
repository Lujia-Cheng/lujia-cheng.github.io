import NavigationPanel from "./NavigationPanel";
import UtilityPanel from "./UtilityPanel";

export default function Header() {
  return (<div style={{
    position: "sticky",
    flexDirection: "row",
    justifyContent: "space-between",
  }}>
    <NavigationPanel/>
    <UtilityPanel/>
  </div>)
}