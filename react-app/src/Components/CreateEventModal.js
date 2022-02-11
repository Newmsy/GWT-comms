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
import { getTreeViewUtilityClass, StaticDatePicker } from "@mui/lab";
import React from "react";
import { FormatDateString } from "../Utils/DateUtils";
import { useToastDispatcher } from "../Store/Areas/Toast/hooks";

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

export const CreateEventModal = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("CSQ");
  const [isDepartmentWide, setIsDepartmentWide] = React.useState(true);
  const [date, setDate] = React.useState(new Date());
  console.log(location);

  const { addToast } = useToastDispatcher();

  const onSubmitEvent = React.useCallback(() => {
    onSubmit({
      eventInfo: {
        title: title,
        description: description,
        date: date,
        location: location,
        isDepartmentWide: isDepartmentWide,
      },
    });
    onClose();
    addToast(`New event has been created for ${FormatDateString(date)}`);
  }, [
    addToast,
    date,
    description,
    isDepartmentWide,
    location,
    onClose,
    onSubmit,
    title,
  ]);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style} style={{ overflowY: "scroll" }}>
        <Box display="flex" justifyContent="center" flexDirection={"column"}>
          <p style={{ fontSize: 30 }}>Event Title</p>
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
          <p style={{ fontSize: 30 }}>
            Date{" "}
            <span style={{ color: "#9c9c9c" }}>
              &nbsp; &nbsp; &nbsp; {FormatDateString(date)}
            </span>
          </p>
          <StaticDatePicker
            onChange={(newValue) => {
              setDate(newValue);
            }}
            displayStaticWrapperAs="desktop"
            renderInput={(params) => <TextField {...params} />}
            value={date}
          />
          <p style={{ fontSize: 30 }}>Location</p>
          <Select
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            value={location}
          >
            <MenuItem value={"CSQ"}>CSQ</MenuItem>
            <MenuItem value={"Manchester"}>Manchester</MenuItem>
            <MenuItem value={"Birmingham"}>Birmingham</MenuItem>
            <MenuItem value={"Watford"}>Watford</MenuItem>
            <MenuItem value={"Malta"}>Malta</MenuItem>
          </Select>

          <p style={{ fontSize: 30, marginTop: 30 }}>Event Type</p>
          <Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Radio
                checked={isDepartmentWide === true}
                onChange={() => setIsDepartmentWide(getTreeViewUtilityClass)}
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <p style={{ fontSize: 16, marginTop: 16 }}>Firm Wide</p>
            </Box>
            <Box display="flex" flexDirection="row">
              <Radio
                checked={isDepartmentWide === false}
                onChange={() => setIsDepartmentWide(false)}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
              />
              <p style={{ fontSize: 16, marginTop: 16 }}>Department Wide</p>
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
                Create Event
              </button>
            </div>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};
