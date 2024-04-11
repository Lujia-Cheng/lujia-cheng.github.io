import About from "./About";
import Blog from "./Blog";
import ChatAssistant from "./ChatAssistant/index"
import Resume from "./Resume";
import Project from "./Project";

import ChatIcon from "@mui/icons-material/Chat";
import DataObjectIcon from "@mui/icons-material/DataObject";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Face from "@mui/icons-material/Face";
import SummarizeIcon from "@mui/icons-material/Summarize";

export const TabConfig = [
    {
        name: "Chat",
        icon: <ChatIcon/>,
        content: <ChatAssistant/>,
    },
    {name: "About", icon: <Face/>, content: <About/>},
    {
        name: "CV",
        icon: <SummarizeIcon/>,
        content: <Resume/>,
    },
    {
        name: "Blogs",
        icon: <EditNoteIcon/>,
        content: <Blog/>,
        disabled: true,
    },
    {name: "Projects", icon: <DataObjectIcon/>, content: <Project/>},
];
