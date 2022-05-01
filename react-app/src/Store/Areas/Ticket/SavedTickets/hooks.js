import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SavedTicketsActions, getSavedTicketsStateSelector } from "./state";

export const useSavedTickets = () => {
  const dispatch = useDispatch();
  const { events } = useSelector(getSavedTicketsStateSelector);

  const addEvent = React.useCallback(
    (event) => {
      dispatch(SavedTicketsActions.addEvent(event));
    },
    [dispatch]
  );

  const removeEvent = React.useCallback(
    (title) => {
      console.log(title);
      dispatch(SavedTicketsActions.removeEventByTitle(title));
    },
    [dispatch]
  );

  return {
    addEvent,
    removeEvent,
    events,
  };
};
