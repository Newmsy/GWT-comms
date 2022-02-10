import { Modal, Box, Paper, Input } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SignInModal = ({
  loading,
  userId,
  open,
  onClose,
  onSubmit,
  isSignedIn,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitSignIn = React.useCallback(() => {
    onSubmit({ email: email, password: password });
  }, [email, onSubmit, password]);

  React.useEffect(() => {
    if (isSignedIn) onClose();
  }, [isSignedIn, onClose]);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style}>
        <Box display="flex" justifyContent="center" flexDirection={"column"}>
          <p>Email</p>
          <Input
            style={{ marginBottom: 30 }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <Input onChange={(e) => setPassword(e.target.value)} />
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            style={{ width: "100%", marginTop: 40 }}
          >
            <div>
              <button
                type="button"
                className="btn btn-success"
                onClick={onSubmitSignIn}
              >
                Sign In
              </button>
            </div>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};
