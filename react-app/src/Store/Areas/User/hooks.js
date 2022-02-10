import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions, userStateSelector } from "./state";

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const { userId, emailAddress, loading } = useSelector(userStateSelector);

  const fetchUser = React.useCallback(() => {
    dispatch(userActions.fetchUser({ email: emailAddress }));
  }, [dispatch, emailAddress]);

  return {
    emailAddress,
    userId,
    loading,
    fetchUser,
  };
};
