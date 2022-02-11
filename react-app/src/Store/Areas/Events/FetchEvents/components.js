import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userStateSelector } from "../../User/state";
import { getEventsActions, getEventsStateSelector } from "./state";

export const EventsListener = () => {
  const dispatch = useDispatch();
  const { loading, fetched } = useSelector(getEventsStateSelector);
  const { isSignedIn } = useSelector(userStateSelector);

  React.useEffect(() => {
    if (!fetched && !loading && isSignedIn)
      dispatch(getEventsActions.fetchEvents());
  });
  return <div />;
};
