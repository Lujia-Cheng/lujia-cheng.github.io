import { useEffect, useState } from "react";

function useBlogs(reverseChronological = true, count = null) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // todo decide whether to put blog on front or backend
  }, []);

  return blogs;
}

export default useBlogs;
