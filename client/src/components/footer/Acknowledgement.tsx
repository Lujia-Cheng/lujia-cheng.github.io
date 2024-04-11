import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Acknowledgement() {
  return (
      <Typography variant="body2" color="text.secondary">
        {"Built with "}
        <Link color="inherit" href="https://reactjs.org/">
          React
        </Link>
        {", webpage deployed via "}
        <Link color="inherit" href="https://pages.github.com/">
          GitHub Pages
        </Link>
        {", server hosted on "}
        <Link color="inherit" href="https://azure.microsoft.com/en-us/">
          Azure Functions
        </Link>
        {", AI provided by "}
        <Link color="inherit" href="https://gemini.google.com/">
          Gemini
        </Link>
        {", and database provided by "}
        <Link color="inherit" href="https://www.mongodb.com/">
          MongoDB
        </Link>
        .
      </Typography>
  );
}
