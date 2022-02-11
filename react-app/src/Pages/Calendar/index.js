import React from "react";
import { useEvents } from "../../Store/Areas/Events/FetchEvents/hooks";
import { Box, Grid, Paper, Input, List, ListItem, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { dummyData } from "../../constants";
import { FormatDateString } from "../../Utils/DateUtils";

const getRandomColor = () => {
  const colours = [
    "#112F8F",
    "#205BBB",
    "#480B6B",
    "#3BBAB5",
    "#6C1B7A",
    "#318FDD",
    "#49329C",
  ];
  return colours[Math.floor(Math.random() * colours.length)];
};

export const Calendar = () => {
  const { viewDate, filteredEvents } = useEvents();
  const styles = useStyles();

  return (
    <div style={{ width: "100%", backgroundColor: "#f2f2f2" }}>
      <Box display="flex" justifyContent="center">
        <p style={{ fontSize: 40 }}>{FormatDateString(viewDate)}</p>
      </Box>
      <Grid container spacing={2} style={{ justifyContent: "center" }}>
        <Grid item container spacing={2} xs={11}>
          {/* {filteredEvents.map(x => ...)} */}
          <Grid item xs={3}>
            <div
              className={styles.eventItem}
              style={{ backgroundColor: getRandomColor() }}
            >
              <p className={styles.title}>Title</p>
              <p className={styles.desc}>Date: Date</p>
              <p className={styles.desc}>Description</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              className={styles.eventItem}
              style={{ backgroundColor: getRandomColor() }}
            >
              <p className={styles.title}>Title</p>
              <p className={styles.desc}>Date: Date</p>
              <p className={styles.desc}>Description</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              className={styles.eventItem}
              style={{ backgroundColor: getRandomColor() }}
            >
              <p className={styles.title}>Title</p>
              <p className={styles.desc}>Date: Date</p>
              <p className={styles.desc}>Description</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              className={styles.eventItem}
              style={{ backgroundColor: getRandomColor() }}
            >
              <p className={styles.title}>Title</p>
              <p className={styles.desc}>Date: Date</p>
              <p className={styles.desc}>Description</p>
            </div>
          </Grid>
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
        <Box>
          <List>
            {console.log(dummyData)}
            {
              dummyData.data.map(day => {
                return (
                  <>
                  <ListItem
                  />
                    <ListItemText
                    primary={day.name}
                    secondary={day.attending}
                    key={day}
                    >
                    </ListItemText>
                  <ListItem />
                  </>
                );
              })}
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
  },
  title: {
    color: "#fff",
    fontSize: 30,
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
