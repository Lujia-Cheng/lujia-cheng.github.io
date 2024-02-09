import NavigationPanel from "./NavigationPanel";
import UtilityPanel from "./UtilityPanel";

export default function Header() {
  return (<div style={{
    justifyContent: "space-between",
  }}>
    <NavigationPanel/>
    <UtilityPanel/>
  </div>)
}