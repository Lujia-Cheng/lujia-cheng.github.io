import Feedback from "./Feedback.js";
import Acknowledgement from "./Acknowledgement.js";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Acknowledgement />
      <Feedback />
    </footer>
  );
}
