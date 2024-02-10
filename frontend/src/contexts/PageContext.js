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


export const PAGE_CONTENT = [
  {pageIndex: 0, name: "About", icon: <InfoIcon/>, content: <About/>},
  {pageIndex: 1, name: "CV", icon: <AssignmentIndIcon/>, content: <Resume/>},
  {pageIndex: 2, name: "Chat", icon: <ChatIcon/>, content: <ChatAssistant/>, disabled: true},
  {pageIndex: 3, name: "Blogs", icon: <CreateIcon/>, content: <Blog/>, disabled: true},
  {pageIndex: 4, name: "Projects", icon: <CodeIcon/>, content: <Project/>}
]

const PageContext = createContext();

export function PageProvider({children}) {
  const [pageIndex, setPageIndex] = useState(0);
  // I'll need to read & write page number, plus read indexes, names, icons, of all pages in NavigationPanel.js, and read content in Content.js
  // Function to update the current page, could be used for navigation changes
  function getPageContent() {
    return PAGE_CONTENT[pageIndex].content;
  }

  const value = {PAGE_CONTENT, getPageContent, pageIndex, setPageIndex};

  return <PageContext.Provider value={value}>
    {children}
  </PageContext.Provider>;
}

export const usePage = () => useContext(PageContext);
