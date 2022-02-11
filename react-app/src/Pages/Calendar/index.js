import React from "react";
import { useEvents } from "../../Store/Areas/Events/FetchEvents/hooks";
import { Box, Grid, Paper, Input } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormatDateString } from "../../Utils/DateUtils";
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

const today = new Date();

const defaultEvents = [
  {
    title: "After work drinks!",
    date: new Date(today.setDate(13)),
    description: "Come and join some team bonding for CSQ connected customer!",
  },
  {
    title: "Company-wide waterballoon fight!",
    date: new Date(today.setDate(13)),
    description:
      "Ever wanted to throw stuff at your project managers? Now you can in a safe environment with 0 repercussions! Come and join in on the 4th floor in CSQ at 11 am",
  },
  {
    title: "National bring-your-grandparent-to-work-day",
    date: new Date(today.setDate(13)),
    description:
      "Connected Customer team members are encouraged to bring the elderly to the office so we can explain to them how to open a word document or deploy to an Azure pipeline.",
  },
];

export const Calendar = () => {
  const { viewDate, filteredEvents } = useEvents();
  const styles = useStyles();
  const { events, addEvent, removeEvent } = useSavedEvents();
  const { isSignedIn } = useSignInUser();

  return (
    <div style={{ width: "100%", backgroundColor: "#f2f2f2" }}>
      <Box display="flex" justifyContent="center">
        <p style={{ fontSize: 40 }}>{FormatDateString(viewDate)}</p>
      </Box>
      <Grid container spacing={2} style={{ justifyContent: "center" }}>
        <Grid item container spacing={2} xs={11}>
          {/* {filteredEvents.map(x => ...)} */}
          {defaultEvents.map((event, i) => {
            return (
              <Grid item xs={3} key={event.title}>
                <div
                  className={styles.eventItem}
                  style={{ backgroundColor: colours[i] }}
                >
                  <p className={styles.title}>{event.title}</p>
                  <p className={styles.desc}>
                    Date: {FormatDateString(event.date)}
                  </p>
                  <p className={styles.desc}>{event.description}</p>
                  <button
                    type="button"
                    className={`btn btn-${
                      events.filter((e) => e.title === event.title).length > 0
                        ? "danger"
                        : "light"
                    }`}
                    onClick={() => {
                      events.filter((e) => e.title === event.title).length > 0
                        ? removeEvent(event.title)
                        : addEvent(event);
                    }}
                    disabled={!isSignedIn}
                  >
                    {events.filter((e) => e.title === event.title).length > 0
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
              onClick={() => {}}
            >
              Interested
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {}}
            >
              Going
            </button>
          </div>
        </Box>
        <Box marginLeft={4} marginTop={4} marginBottom={10}>
          <Input placeholder="Search..." />
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
