import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEventActions, createEventStateSelector } from "./state";

export const useCreateEvent = () => {
  const dispatch = useDispatch();
  const { userId, emailAddress, loading } = useSelector(
    createEventStateSelector
  );

  const createEvent = React.useCallback(
    ({ emailAddress, userId, eventInfo }) => {
      console.log("Called create event");
      dispatch(
        createEventActions.createEvent({
          emailAddress: emailAddress,
          userId: userId,
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
