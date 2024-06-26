import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Todo() {
  return (
    <Grid
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flexGrow="1"
    >
      <Typography variant="h3" align="center">
        🚧🚧 Under Construction 🚧🚧
      </Typography>
      <Typography variant="h5" align="center">
        Check back in a week or two!
      </Typography>
    </Grid>
  );
}

export default Todo;
