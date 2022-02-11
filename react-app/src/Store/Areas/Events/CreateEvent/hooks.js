import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEventActions, createEventStateSelector } from "./state";

export const useCreateEvent = () => {
  const dispatch = useDispatch();
  const { userId, emailAddress, loading } = useSelector(
    createEventStateSelector
  );

  const createEvent = React.useCallback(
    ({ date, eventInfo }) => {
      console.log("Called create event");
      dispatch(
        createEventActions.createEvent({
          date: date,
          eventInfo: eventInfo,
        })
      );
    },
    [dispatch]
  );

  return {
    emailAddress,
    userId,
    loading,
    createEvent,
  };
};
