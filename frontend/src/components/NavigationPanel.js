import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "../styles/NavigationPanel.css";
import {PAGE_CONTENT, usePage} from "../contexts/PageContext";

export default function NavigationPanel({value, onChange}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const {changePage} = usePage();

  // Function to handle dropdown change
  function handleDropdownChange(event) {
    changePage(event.target.value);
  }


  return (
    <div>
      {isSmallScreen ? (
        <Select
          class="from-select"
          value={value}
          onChange={handleDropdownChange}
          displayEmpty
          inputProps={{"aria-label": "Navigation"}}
        >
          {PAGE_CONTENT.map((item, i) => (
            <MenuItem key={i} value={i} disabled={item.disabled}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Tabs
          selectionFollowsFocus
          value={value}
          onChange={onChange}
          variant="scrollable"
          scrollButtons
        >
          {PAGE_CONTENT.map((item, i) => (
            <Tab
              iconPosition="start"
              value={i}
              label={item.name}
              icon={item.icon}
              disabled={item.disabled}
            />
          ))}
        </Tabs>
      )}

    </div>
  );
}
