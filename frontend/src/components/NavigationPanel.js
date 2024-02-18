import { PAGE_CONTENT, usePage } from "../contexts/PageContext";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function NavigationPanel() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { pageIndex, setPageIndex } = usePage();

  // Function to handle dropdown change
  function changePageNumber(event, newValue) {
    setPageIndex(newValue);
    event.target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Tabs
      selectionFollowsFocus
      value={pageIndex}
      onChange={changePageNumber}
      variant="scrollable"
      textColor={theme.palette.mode === "dark" ? "primary" : "inherit"}
    >
      {PAGE_CONTENT.map((page) => (
        <Tab
          aria-label={page.name}
          key={page.name}
          label={page.name}
          icon={page.icon}
          iconPosition={isSmallScreen ? "top" : "start"}
          disabled={page.disabled}
        />
      ))}
    </Tabs>
  );
}
