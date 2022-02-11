import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useToastConsumer } from "./hooks";
import { useToastDispatcher } from "./hooks";
import { makeStyles, Typography, Box, Slide, Theme } from "@material-ui/core";
import { ReactComponent as Tick } from "../../../Assets/Tick.svg";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

export const Toast = () => {
  const styles = useStyles();
  const { closeToast } = useToastDispatcher();
  const { isVisible, text } = useToastConsumer();

  const handleClose = (event, reason) => {
    if (reason !== "timeout") {
      return;
    }
    closeToast();
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isVisible}
      onClose={handleClose}
      autoHideDuration={5000}
      data-testid="toast-message"
      TransitionComponent={TransitionLeft}
      classes={{ root: styles.root }}
    >
      <div className={styles.toastWrapper}>
        <Box paddingTop={2} paddingLeft={2}>
          <Tick />
        </Box>
        <Box padding={2} maxWidth={272}>
          <Typography variant="body2" className={styles.toastText}>
            {text}
          </Typography>
        </Box>
      </div>
    </Snackbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    zIndex: theme.zIndex.appBar - 1,
  },
  toastWrapper: {
    borderRadius: "4px",
    border: "solid 1px #1ab512",
    backgroundColor: "#d1f0d0",
    flexDirection: "row",
    display: "flex",
  },
  toastText: {
    fontSize: 14,
    color: "#000",
    lineHeight: 1.29,
  },
}));
