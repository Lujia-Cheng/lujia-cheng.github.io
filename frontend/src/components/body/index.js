import { createContext, useContext, useState } from "react";
import About from "./About";
import Blog from "./Blog";
import ChatAssistant from "./ChatAssistant/ChatAssistant";
import Project from "./Project";
import Resume from "./Resume";

import ChatIcon from "@mui/icons-material/Chat";
import DataObjectIcon from "@mui/icons-material/DataObject";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Face from "@mui/icons-material/Face";
import SummarizeIcon from "@mui/icons-material/Summarize";

export const TabsData = [
  {
    name: "Chat",
    icon: <ChatIcon />,
    content: <ChatAssistant />,
  },
  { name: "About", icon: <Face />, content: <About /> },
  {
    name: "CV",
    icon: <SummarizeIcon />,
    content: <Resume />,
  },
  {
    name: "Blogs",
    icon: <EditNoteIcon />,
    content: <Blog />,
    disabled: true,
  },
  { name: "Projects", icon: <DataObjectIcon />, content: <Project /> },
];

// This component returns the body of the tab based on the index
export default function Content() {
  const { index } = useContext(IndexContext);
  return TabsData[index].content;
}

// This context provides the index of the selected tab and a function to update it
export const IndexContext = createContext(null);
export const IndexContextProvider = ({ children }) => {
  const [index, setIndex] = useState(0);

  function updateIndex(i) {
    setIndex(i < 0 || i > TabsData.length - 1 ? 0 : i);
  }

  return (
    <IndexContext.Provider value={{ index, updateIndex }}>
      {children}
    </IndexContext.Provider>
  );
};
