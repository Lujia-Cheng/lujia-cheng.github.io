import Typography from "@mui/material/Typography";
import SocialLinks from "../SocialLinks.js";

export default function WelcomePage() {
  return (
    <>
      <div style={{ padding: "10px" }}>
        <Typography variant="h1">Hi, I'm Luke</Typography>
        <Typography variant="h2">Welcome to my website</Typography>
      </div>
      <br />
      <div>
        <SocialLinks />
      </div>
    </>
  );
}
