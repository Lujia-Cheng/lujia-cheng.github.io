import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { IndexContext, IndexContextProvider, TabsData } from "../body/index";

export default function NavigationTabs() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { index, updateIndex } = useContext(IndexContext);

  function handleTabClick(event) {
    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <IndexContextProvider>
      <Tabs
        selectionFollowsFocus
        value={index}
        onChange={(event, newValue) => {
          updateIndex(newValue);
        }}
        variant="scrollable"
        textColor={theme.palette.mode === "dark" ? "primary" : "inherit"}
      >
        {TabsData.map(
          (
            tab // Map through TabsInfo to render Tab components
          ) => (
            <Tab
              aria-label={tab.name}
              key={tab.name}
              label={tab.name}
              icon={tab.icon}
              iconPosition={isSmallScreen ? "top" : "start"}
              disabled={tab.disabled}
              onClick={handleTabClick}
            />
          )
        )}
      </Tabs>
    </IndexContextProvider>
  );
}
