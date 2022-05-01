import {
  Modal,
  Box,
  Paper,
  Input,
  TextField,
  Select,
  MenuItem,
  Radio,
} from "@mui/material";
import React from "react";
import { useToastDispatcher } from "../Store/Areas/Toast/hooks";
import { useEvents } from "../Store/Areas/Ticket/FetchTickets/hooks";
import { useEditEvent } from "../Store/Areas/Ticket/EditTicket/hooks";

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

export const EditTicketModal = ({ open, onClose, ticket }) => {
  const [title, setTitle] = React.useState(ticket.title);
  const [description, setDescription] = React.useState(ticket.description);

  const [isInSprint, setIsInSprint] = React.useState(ticket.isInSprint);
  const [eta, setEta] = React.useState(ticket.etaDays);
  const [status, setStatus] = React.useState(ticket.status);

  const { fetchEvents } = useEvents();
  console.log(ticket);
  console.log(title);

  const { onSubmitEdit, onSubmitDelete } = useEditEvent();

  const { addToast } = useToastDispatcher();

  const onSubmitEvent = React.useCallback(async () => {
    await onSubmitEdit({
      id: ticket.id,
      title: title,
      description: description,
      isInSprint: isInSprint,
      etaDays: parseInt(eta),
      status: status,
    });
    onClose();
    fetchEvents();
    addToast(`Ticket has been updated!`);
  }, [
    addToast,
    description,
    eta,
    fetchEvents,
    isInSprint,
    onClose,
    onSubmitEdit,
    status,
    ticket.id,
    title,
  ]);

  const onSubmitDeleteTicket = React.useCallback(async () => {
    await onSubmitDelete({
      id: ticket.id,
    });
    onClose();
    fetchEvents();
    addToast(`Ticket has been deleted!`);
  }, [addToast, fetchEvents, onClose, onSubmitDelete, ticket.id]);

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: 50 }}>
        <Paper sx={style} style={{ overflowY: "scroll" }}>
          <Box display="flex" justifyContent="center" flexDirection={"column"}>
            <p style={{ fontSize: 30 }}>Title</p>
            <Input
              style={{ marginBottom: 30 }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p style={{ fontSize: 30 }}>Description</p>
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginBottom: 30 }}
              value={description}
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

            <p style={{ fontSize: 30, marginTop: 30 }}>
              Included in current sprint?
            </p>
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
            <Box>
              <p style={{ fontSize: 30 }}>Status</p>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ minWidth: 200 }}
                label="Status"
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="InProgress">In Progress</MenuItem>
              </Select>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              style={{ width: "100%", marginTop: 40 }}
            >
              <div style={{ marginRight: 30 }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onSubmitDeleteTicket}
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onSubmitEvent}
                >
                  Save
                </button>
              </div>
            </Box>
          </Box>
        </Paper>
      </div>
    </Modal>
  );
};
