import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userStateSelector } from "../../User/state";
import { getEventsActions, getEventsStateSelector } from "./state";

export const EventsListener = () => {
  const dispatch = useDispatch();
  const { loading, fetched, events, viewDate } = useSelector(
    getEventsStateSelector
  );
  const { isSignedIn } = useSelector(userStateSelector);

  console.log(loading);
  //   console.log(isSignedIn);
  //   console.log(viewDate);

  console.log(events);
  React.useEffect(() => {
    if (!fetched && !loading && isSignedIn)
      dispatch(getEventsActions.fetchEvents());
  }, [dispatch, fetched, isSignedIn, loading]);

  React.useEffect(() => {
    dispatch(getEventsActions.fetchEvents());
  }, [dispatch, viewDate]);
  return <div />;
};
