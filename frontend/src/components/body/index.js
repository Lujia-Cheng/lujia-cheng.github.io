import { createContext, useContext, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import ChatAssistant from "./ChatAssistant/ChatAssistant";
import InfoIcon from "@mui/icons-material/Info";
import About from "./About";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Resume from "./Resume";
import CreateIcon from "@mui/icons-material/Create";
import Blog from "./Blog";
import CodeIcon from "@mui/icons-material/Code";
import Project from "./Project";

export const TabsData = [
  {
    name: "Chat",
    icon: <ChatIcon />,
    content: <ChatAssistant />,
  },
  { name: "About", icon: <InfoIcon />, content: <About /> },
  {
    name: "CV",
    icon: <AssignmentIndIcon />,
    content: <Resume />,
  },
  {
    name: "Blogs",
    icon: <CreateIcon />,
    content: <Blog />,
    disabled: true,
  },
  { name: "Projects", icon: <CodeIcon />, content: <Project /> },
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
