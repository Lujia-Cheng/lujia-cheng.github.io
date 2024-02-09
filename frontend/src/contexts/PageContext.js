import {createContext, useContext, useState} from "react";
import InfoIcon from "@mui/icons-material/Info";
import About from "../pages/About";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Resume from "../pages/Resume";
import ChatIcon from "@mui/icons-material/Chat";
import ChatAssistant from "../pages/ChatAssistant";
import CreateIcon from "@mui/icons-material/Create";
import Blog from "../pages/Blog";
import CodeIcon from "@mui/icons-material/Code";
import Project from "../pages/Project";

const PageContext = createContext(undefined);
export const PAGE_CONTENT = [
  {name: "About", icon: <InfoIcon/>, content: <About/>},
  {name: "CV", icon: <AssignmentIndIcon/>, content: <Resume/>},
  {name: "Chat", icon: <ChatIcon/>, content: <ChatAssistant/>, disabled: true},
  {name: "Blogs", icon: <CreateIcon/>, content: <Blog/>, disabled: true},
  {name: "Projects", icon: <CodeIcon/>, content: <Project/>}
]
export const PageProvider = ({children}) => {
  const [currentPage, setCurrentPage] = useState(PAGE_CONTENT[0]);

  // Function to update the current page, could be used for navigation changes
  const changePage = (newValue) => {
    setCurrentPage(PAGE_CONTENT[newValue]);
  };

  const value = {currentPage, changePage,};

  return <PageContext.Provider value={value}>
    {children}
  </PageContext.Provider>;
};

export const usePage = () => useContext(PageContext);
