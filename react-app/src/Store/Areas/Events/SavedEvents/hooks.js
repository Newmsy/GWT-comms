import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { savedEventsActions, getSavedEventsStateSelector } from "./state";

export const useSavedEvents = () => {
  const dispatch = useDispatch();
  const { events } = useSelector(getSavedEventsStateSelector);

  const addEvent = React.useCallback(
    (event) => {
      dispatch(savedEventsActions.addEvent(event));
    },
    [dispatch]
  );

  const removeEvent = React.useCallback(
    (title) => {
      dispatch(savedEventsActions.removeEventByTitle(title));
    },
    [dispatch]
  );

  return {
    addEvent,
    removeEvent,
    events,
  };
};
