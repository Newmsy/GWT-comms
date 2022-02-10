import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userStateSelector } from "./state";
import { userActions } from "./state";

export const withUser = () => (Component) => {
  return (props) => {
    const dispatch = useDispatch();
    const { fetched, loading } = useSelector(userStateSelector);

    React.useEffect(() => {
      if (!fetched) {
        dispatch(
          userActions.fetchUser({ email: "NewUser@HybridCalendar.com" })
        );
      }
    }, [dispatch, fetched]);

    if (loading || !fetched) return <div />;

    return <Component {...props} />;
  };
};
