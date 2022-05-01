import {
  Modal,
  Box,
  Paper,
  Input,
  TextField,
  Radio,
} from "@mui/material";
import React from "react";
import { useToastDispatcher } from "../Store/Areas/Toast/hooks";
import { useEvents } from "../Store/Areas/Ticket/FetchTickets/hooks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 800,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CreateTicketModal = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [isInSprint, setIsInSprint] = React.useState(true);
  const [eta, setEta] = React.useState(0);

  const { fetchEvents } = useEvents();


  const { addToast } = useToastDispatcher();

  const onSubmitEvent = React.useCallback(async () => {
    await onSubmit({
        title: title,
        description: description,
        isInSprint: isInSprint,
        eta: eta
    });
    onClose();
    setTimeout(()=>{fetchEvents();}, 2000)
    
    addToast(`New ticket has been created!`);
  }, [addToast, description, eta, fetchEvents, isInSprint, onClose, onSubmit, title]);

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{padding: 50}}>
      <Paper sx={style} style={{ overflowY: "scroll" }}>
        <Box display="flex" justifyContent="center" flexDirection={"column"}>
          <p style={{ fontSize: 30 }}>Title</p>
          <Input
            style={{ marginBottom: 30 }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p style={{ fontSize: 30 }}>Description</p>
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: 30 }}
            multiline
            rows={4}
          />
          <p style={{ fontSize: 30 }}>ETA (days)</p>
          <Input
            style={{ marginBottom: 30 }}
            onChange={(e) => setEta(e.target.value)}
            type="number"
            value={eta}
          />

          <p style={{ fontSize: 30, marginTop: 30 }}>Included in current sprint?</p>
          <Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Radio
                checked={isInSprint === true}
                onChange={() => setIsInSprint(true)}
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <p style={{ fontSize: 16, marginTop: 16 }}>Yes</p>
            </Box>
            <Box display="flex" flexDirection="row">
              <Radio
                checked={isInSprint === false}
                onChange={() => setIsInSprint(false)}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
              />
              <p style={{ fontSize: 16, marginTop: 16 }}>No</p>
            </Box>
          </Box>

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
                onClick={onSubmitEvent}
              >
                Create Item
              </button>
            </div>
          </Box>
        </Box>
      </Paper>
      </div>
    </Modal>
  );
};
