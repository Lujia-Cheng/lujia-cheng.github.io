import Feedback from "./Feedback";
import Acknowledgement from "./Acknowledgement";

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
