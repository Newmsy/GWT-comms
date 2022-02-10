import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventsActions, getEventsStateSelector } from "./state";

export const useEvents = () => {
  const dispatch = useDispatch();
  const { userId, loading, events } = useSelector(getEventsStateSelector);

  const fetchEvents = React.useCallback(
    ({ userId }) => {
      dispatch(getEventsActions.fetchEvents({ userId: userId }));
    },
    [dispatch]
  );

  return {
    userId,
    loading,
    events,
    fetchEvents,
  };
};
