import { Modal, Box, Paper, Divider } from "@mui/material";
import React from "react";
import { FormatDateString } from "../Utils/DateUtils";
import { useSavedTickets } from "../Store/Areas/Ticket/SavedTickets/hooks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SavedTicketsModal = ({ open, onClose }) => {
  const { events } = useSavedTickets();

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style} style={{ overflowY: "scroll" }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          flexDirection={"row"}
          style={{ marginBottom: -30 }}
        >
          <button
            type="button"
            className={`btn btn-danger`}
            onClick={() => {
              onClose();
            }}
          >
            X
          </button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexDirection={"column"}
        >
          <p style={{ fontSize: 40, textAlign: "center" }}>Upcoming Events</p>
          <Box>
            <p style={{ fontSize: 30 }}>Alex's Leaving Drinks</p>
            <p style={{ fontSize: 20 }}>10 Feb 2022</p>
            <p style={{ fontSize: 20 }}>
              Alex's Leaving Drinks after work in CSQ. Come and wish him a
              farewell!
            </p>
          </Box>
          <Divider style={{ width: 600 }} />
          <Box>
            <p style={{ fontSize: 30 }}>Alex's Rejoining Drinks</p>
            <p style={{ fontSize: 20 }}>12 Feb 2022</p>
            <p style={{ fontSize: 20 }}>
              Alex's Rejoining Drinks after work in CSQ. Come and wish him a
              warm welcome!
            </p>
          </Box>
          <Divider style={{ width: 600 }} />
          <Box>
            <p style={{ fontSize: 30 }}>Lino's Breakfast Club</p>
            <p style={{ fontSize: 20 }}>13 Feb 2022</p>
            <p style={{ fontSize: 20 }}>
              Lino will be cooking breakfast for the whole team! Put your orders
              in soon. Starts at 8:00 on the 13th floor of CSQ!
            </p>
          </Box>

          {events.map((event) => {
            return (
              <div>
                <Divider />
                <Box>
                  <p style={{ fontSize: 30 }}>{event.events.title}</p>
                  <p style={{ fontSize: 20 }}>{FormatDateString(event.date)}</p>
                  <p style={{ fontSize: 20 }}>{event.events.description}</p>
                </Box>
              </div>
            );
          })}
        </Box>
      </Paper>
    </Modal>
  );
};
