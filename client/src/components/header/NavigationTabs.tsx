import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { TabConfig } from "../content/config";

interface NavigationTabsProps {
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

export default function NavigationTabs({
  selectedTab = 0,
  setSelectedTab,
}: NavigationTabsProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleChangeTab(
    event: React.SyntheticEvent,
    newSelectedTab: number
  ) {
    setSelectedTab(newSelectedTab);
    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <Tabs
      selectionFollowsFocus
      value={selectedTab}
      onChange={handleChangeTab}
      variant="scrollable"
      textColor="inherit"
      indicatorColor="secondary"
    >
      {TabConfig.map(
        (
          tab // Map through TabsInfo to render Tab components
        ) => (
          <Tab
            key={tab.name}
            label={tab.name}
            icon={tab.icon}
            iconPosition={isSmallScreen ? "top" : "start"}
            disabled={tab.disabled}
          />
        )
      )}
    </Tabs>
  );
}
