import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Feedback() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"View source code & report issues on "}
      <Link
        onClick={() =>
          window.open("https://github.com/Lujia-Cheng/lujia-cheng.github.io")
        }
      >
        {"Github"}
      </Link>
    </Typography>
  );
}
