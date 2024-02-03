import React from "react";
import Resume from "./Resume";
import ChatAssistant from "./ChatAssistant";
import Todo from "./Todo";
function Content({ value }) {
  const content = {
    0: <Resume />,
    1: <ChatAssistant />,
  };
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

  const handler = {
    get(target, prop, receiver) {
      if (prop in content) {
        return target[prop];
      }
      return <Todo />;
    },
  };

  const proxy = new Proxy(content, handler);

  return proxy[value];
}

export default Content;
