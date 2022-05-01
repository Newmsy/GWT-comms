import React from "react";
import { useEvents } from "../../Store/Areas/Ticket/FetchTickets/hooks";
import {
  Box,
  Grid,
  Paper,
  Input,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { dummyData } from "../../constants";
import { FormatDateString, GetApiDateString } from "../../Utils/DateUtils";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSavedTickets } from "../../Store/Areas/Ticket/SavedTickets/hooks";
import { useSignInUser } from "../../Store/Areas/User/hooks";
import { EditTicketModal } from "../../Components/EditTicketModal";

export const Calendar = () => {
  const { viewDate, tickets } = useEvents();
  const styles = useStyles();
  const { isSignedIn } = useSignInUser();
  const [editingItem, setEditingItem] = React.useState(null);

  const sprintTickets = React.useMemo(()=>{
    return tickets.filter(x => x.isInSprint)
  },[tickets])

  const nonSprintTickets = React.useMemo(()=>{
    return tickets.filter(x => !x.isInSprint)
  },[tickets])

  const sprintEta = React.useMemo(()=>{
    return sprintTickets.reduce((prev,curr)=>{return prev+curr.etaDays},0)
  },[sprintTickets])

  console.log(sprintEta)

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f2f2f2",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {editingItem != null && (
        <EditTicketModal
          open={editingItem != null}
          onClose={() => setEditingItem(null)}
          ticket={{ ...editingItem?.ticket }}
        />
      )}
      <Paper
        style={{
          width: "80%",
          marginTop: 50,
          paddingTop: 20,
          paddingBottom: 50,
        }}
      >
        <Box
          marginLeft={4}
          marginTop={4}
          paddingRight={10}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <p className={styles.titleB}>Current Sprint</p>
          <p>Total ETA: <b>{sprintEta} day(s)</b></p>
        </Box>

        <Box
          marginLeft={4}
          marginTop={4}
          paddingRight={10}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {sprintTickets?.map((ticket) => (
            <TicketItem data={{ ...ticket }} setEditingItem={setEditingItem} />
          ))}
        </Box>
        <Box
          marginLeft={4}
          marginTop={8}
          paddingRight={10}
          display="flex"
          justifyContent="space-between"
        >
          <p className={styles.titleB}>Backlog</p>
        </Box>

        <Box
          marginLeft={4}
          marginTop={4}
          paddingRight={10}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {nonSprintTickets?.map((ticket) => (
            <TicketItem data={{ ...ticket }} setEditingItem={setEditingItem} />
          ))}
        </Box>
      </Paper>
    </div>
  );
};

const TicketItem = ({
  data: {
    title,
    description,
    createdBy,
    dateAdded,
    dateUpdated,
    isInSprint,
    status,
    etaDays,
    id,
  },
  setEditingItem,
}) => {
  const styles = useStyles();
  console.log(id);
  return (
    <Box className={styles.ticketItem}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <h2>{title}</h2>
          <p>{description}</p>
        </Box>
        <Button
          onClick={() =>
            setEditingItem({
              ticket: {
                title,
                description,
                createdBy,
                dateAdded,
                dateUpdated,
                status,
                isInSprint,
                etaDays,
                id,
              },
            })
          }
        >
          Edit
        </Button>
      </Box>

      <Box display="flex" flexDirection="row">
        <p className={styles.descriptionText}>
          Created by: <b>{createdBy}</b>
        </p>
        <p className={styles.descriptionText}>
          ETA: <b>{etaDays} day(s)</b>
        </p>
        <p className={styles.descriptionText}>
          Status: <b>{status}</b>
        </p>
        <p className={styles.descriptionText}>
          Date added: <b>{FormatDateString(dateAdded)}</b>
        </p>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  descriptionText: {
    marginRight: 30,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
  titleB: {
    color: "#000",
    fontSize: 30,
  },
  desc: {
    color: "#fff",
    fontSize: 16,
  },
  ticketItem: {
    //backgroundColor: "red",
    fontSize: 16,
    marginBottom: 20,
    borderBottom: "1px solid grey",
  },
});
