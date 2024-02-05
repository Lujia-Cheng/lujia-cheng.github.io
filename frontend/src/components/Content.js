import React from "react";
import Resume from "./Resume";
import ChatAssistant from "./ChatAssistant";
import Todo from "./Todo";
import About from "./About";

function Content({value}) {
  const content = {
    0: <About/>,
    1: <Resume/>,
    2: <ChatAssistant/>,
  };
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

  const handler = {
    get(target, prop, receiver) {
      if (prop in content) {
        return target[prop];
      }
      return <Todo/>;
    },
  };

  const proxy = new Proxy(content, handler);

  return proxy[value];
}

export default Content;
