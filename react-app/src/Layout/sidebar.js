import React from "react";
import {
  Modal,
  Box,
  Paper,
  Input,
  TextField,
  Select,
  MenuItem,
  Radio,
  Slide,
  Divider,
  Drawer,
} from "@mui/material";
import { StaticDatePicker } from "@mui/lab";

//Not being uconst drawerWidth = 240;
const drawerWidth = 400;

export const Sidebar = ({ setViewDate }) => {
  const [date, setDate] = React.useState(new Date());
  const [location, setLocation] = React.useState("CSQ");
  const [department, setDepartment] = React.useState("Technology");

  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        zIndex: 0,
        height: "100vh",
        borderRight: "solid 2px",
        boxShadow: "0px 0px 5px #888888",
        borderColor: "#bdbdbd",
      }}
    >
      <StaticDatePicker
        onChange={(newValue) => {
          setDate(newValue);
          setViewDate(newValue);
        }}
        displayStaticWrapperAs="desktop"
        renderInput={(params) => <TextField {...params} />}
        value={date}
        style={{ backgroundColor: "#5789de" }}
      />
      <Divider />

      <Box style={{ width: "100%" }} paddingLeft={4}>
        <p style={{ fontSize: 30, marginTop: 30 }}>Location</p>
        <Select
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          value={location}
          style={{ width: 250, marginBottom: 30 }}
        >
          <MenuItem value={"CSQ"}>CSQ</MenuItem>
          <MenuItem value={"Manchester"}>Manchester</MenuItem>
          <MenuItem value={"Birmingham"}>Birmingham</MenuItem>
          <MenuItem value={"Watford"}>Watford</MenuItem>
          <MenuItem value={"Malta"}>Malta</MenuItem>
        </Select>
        <p style={{ fontSize: 30 }}>Department</p>
        <Select
          style={{ width: 250 }}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
          value={department}
        >
          <MenuItem value={"Technology"}>Technology</MenuItem>
          <MenuItem value={"FS"}>FS</MenuItem>
          <MenuItem value={"Audit"}>Audit</MenuItem>
          <MenuItem value={"Risk"}>Risk</MenuItem>
          <MenuItem value={"Tax & Legal"}>Tax & Legal</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};
