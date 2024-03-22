import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";

export default function Feedback() {
  return (
    <div>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginLeft: "auto" }}
      >
        {"Source code available on "}
        <Link
          onClick={() =>
            window.open("https://github.com/Lujia-Cheng/lujia-cheng.github.io")
          }
        >
          {"GitHub"}
        </Link>
      </Typography>
    </div>
  );
}
