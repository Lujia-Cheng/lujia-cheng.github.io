import Typography from "@mui/material/Typography";
import SocialLinks from "../SocialLinks";

export default function WelcomePage() {
  return (
    <div>
      <Typography variant="h1">Hi, I'm Luke.</Typography>
      <Typography variant="h2">Welcome to my website.</Typography>
      <br />
      <SocialLinks />
    </div>
  );
}
