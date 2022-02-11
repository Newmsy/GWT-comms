import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventsActions, getEventsStateSelector } from "./state";

export const useEvents = () => {
  const dispatch = useDispatch();
  const { userId, loading, events, viewDate } = useSelector(
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

  const filteredEvents = React.useCallback(
    ({ date }) => {
      const dayStart = date.setUtcHours(0, 0, 0, 0);
      const dayEnd = date.setUtcHours(23, 59, 59);
      return events.filter(
        (e) => new Date(e.date) < dayEnd && new Date(e.date) > dayStart
      );
    },
    [events]
  );

  return {
    userId,
    loading,
    events,
    fetchEvents,
    setViewDate,
    viewDate,
    filteredEvents,
  };
};
