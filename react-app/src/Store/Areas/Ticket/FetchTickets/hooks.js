import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventsActions, getEventsStateSelector } from "./state";

const today = new Date();

const defaultEvents = [
  {
    events: {
      title: "After work drinks!",
      date: new Date(today.setDate(13)),
      description:
        "Come and join some team bonding for CSQ connected customer!",
    },
    date: new Date(today.setDate(13)),
  },
  {
    events: {
      title: "Company-wide waterballoon fight!",
      date: new Date(today.setDate(13)),
      description:
        "Ever wanted to throw stuff at your project managers? Now you can in a safe environment with 0 repercussions! Come and join in on the 4th floor in CSQ at 11 am",
    },
    date: new Date(today.setDate(13)),
  },
  {
    events: {
      title: "National bring-your-grandparent-to-work-day",
      date: new Date(today.setDate(13)),
      description:
        "Connected Customer team members are encouraged to bring the elderly to the office so we can explain to them how to open a word document or deploy to an Azure pipeline.",
    },
    date: new Date(today.setDate(13)),
  },
];

export const useEvents = () => {
  const dispatch = useDispatch();
  const {  loading, tickets } = useSelector(
    getEventsStateSelector
  );

  const fetchEvents = React.useCallback(() => {
    dispatch(getEventsActions.fetchEvents());
  }, [dispatch]);

  const setViewDate = React.useCallback(
    (date) => {
      dispatch(getEventsActions.setViewDate(date));
    },
    [dispatch]
  );

  

  return {
    loading,
    tickets,
    fetchEvents,
    setViewDate,
    
  };
};