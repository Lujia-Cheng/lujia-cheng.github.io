import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import "../styles/NavigationPanel.css";
import {PAGE_CONTENT, usePage} from "../contexts/PageContext";


export default function NavigationPanel() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {pageIndex, setPageIndex} = usePage();

  // Function to handle dropdown change
  function changePageNumber(event, newValue) {
    // scroll to align "nav-panel" with the top of the page
    setPageIndex(newValue);
    event.target.scrollIntoView({behavior: "smooth"});
  }

  return (
    <Tabs
      id="nav-panel"
      selectionFollowsFocus
      value={pageIndex}
      onChange={changePageNumber}
      variant="scrollable"
      scrollButtons
    >
      {PAGE_CONTENT.map(
        (page) => (
          <Tab
            label={page.name}
            icon={page.icon}
            iconPosition={isSmallScreen ? "bottom" : "start"}
            disabled={page.disabled}
          />
        )
      )}
    </Tabs>
  );
}
