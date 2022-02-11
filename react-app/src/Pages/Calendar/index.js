import React from "react";
import { useEvents } from "../../Store/Areas/Events/FetchEvents/hooks";
import {
  Box,
  Grid,
  Paper,
  Input,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { dummyData } from "../../constants";
import { FormatDateString, filterByDay } from "../../Utils/DateUtils";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSavedEvents } from "../../Store/Areas/Events/SavedEvents/hooks";
import { useSignInUser } from "../../Store/Areas/User/hooks";

const colours = [
  "#112F8F",
  "#205BBB",
  "#480B6B",
  "#3BBAB5",
  "#6C1B7A",
  "#318FDD",
  "#49329C",
];
const getRandomColor = () => {
  return colours[Math.floor(Math.random() * colours.length)];
};

export const Calendar = () => {
  const { viewDate, filteredEvents } = useEvents();
  const styles = useStyles();
  const { events: savedEvents, addEvent, removeEvent } = useSavedEvents();
  const { isSignedIn } = useSignInUser();

  console.log(filteredEvents({ date: viewDate }));

  const [selfInterested, setSelfInterested] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  console.log(filterByDay(viewDate, dummyData.data));

  return (
    <div style={{ width: "100%", backgroundColor: "#f2f2f2" }}>
      <Box display="flex" justifyContent="center">
        <p style={{ fontSize: 40 }}>{FormatDateString(viewDate)}</p>
      </Box>
      <Grid container spacing={2} style={{ justifyContent: "center" }}>
        <Grid item container spacing={2} xs={11}>
          {/* {filteredEvents.map(x => ...)} */}
          {filteredEvents({ date: viewDate }).map((event, i) => {
            return (
              <Grid item xs={3} key={event.events.title}>
                <div
                  className={styles.eventItem}
                  style={{ backgroundColor: colours[i] }}
                >
                  <p className={styles.title}>{event.events.title}</p>
                  <p className={styles.desc}>
                    Date: {FormatDateString(event.date)}
                  </p>
                  <p className={styles.desc}>{event.events.description}</p>
                  <button
                    type="button"
                    className={`btn btn-${
                      savedEvents.filter(
                        (e) => e.events.title === event.events.title
                      ).length > 0
                        ? "danger"
                        : "light"
                    }`}
                    onClick={() => {
                      savedEvents.filter(
                        (e) => e.events.title === event.events.title
                      ).length > 0
                        ? removeEvent(event.events.title)
                        : addEvent(event);
                    }}
                    disabled={!isSignedIn}
                  >
                    {savedEvents.filter(
                      (e) => e.events.title === event.events.title
                    ).length > 0
                      ? "Remove from saved events"
                      : "Add to saved events"}
                  </button>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Paper
        style={{
          width: "100%",
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
        >
          <p className={styles.titleB}>Colleagues in office:</p>
          <div>
            <button
              type="button"
              className="btn btn-warning me-4"
              onClick={() => {
                setSelfInterested("interested");
              }}
            >
              Interested
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                setSelfInterested("going");
              }}
            >
              Going
            </button>
          </div>
        </Box>
        <Box marginLeft={4} marginTop={4} marginBottom={4}>
          <Input
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </Box>
        <Box paddingLeft={4}>
          <List style={{ width: 300 }}>
            {console.log(dummyData)}
            {filterByDay(viewDate, dummyData.data)[0]
              ?.people.filter((person) => person.name.includes(searchTerm))
              .map((person) => {
                return (
                  <ListItem>
                    <ListItemIcon>
                      {person.interested ? (
                        <ErrorOutlineIcon style={{ color: "#F9C108" }} />
                      ) : (
                        <DoneIcon style={{ color: "green" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={person.name}
                      secondary={person.interested ? "Interested" : "Going"}
                      key={person.name}
                    />
                  </ListItem>
                );
              })}
            {selfInterested && (
              <ListItem>
                <ListItemIcon>
                  {selfInterested === "interested" ? (
                    <ErrorOutlineIcon style={{ color: "#F9C108" }} />
                  ) : (
                    <DoneIcon style={{ color: "green" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={"Alex Newman"}
                  secondary={
                    selfInterested === "interested" ? "Interested" : "Going"
                  }
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles({
  eventItem: {
    minHeight: 200,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 10,
    padding: 10,
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
});
