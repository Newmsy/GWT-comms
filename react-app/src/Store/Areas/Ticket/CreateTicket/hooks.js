import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEventActions, createEventStateSelector } from "./state";
import {userStateSelector} from "../../User/state"

export const useCreateEvent = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(
    createEventStateSelector
  );
  const { name } = useSelector(
    userStateSelector
  );
  console.log(name)

  const createEvent = React.useCallback(
    ({ title, description, isInSprint, eta }) => {
      console.log("Called create event");
      dispatch(
        createEventActions.createEvent({
          title: title,
          description: description,
          isInSprint: isInSprint,
          etaDays: eta, 
          createdBy: name
        })
      );
    },
    [dispatch, name]
  );

  return {
    name,
    loading,
    createEvent,
  };
};
