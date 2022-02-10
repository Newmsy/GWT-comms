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

export const useSignInUser = () => {
  const dispatch = useDispatch();
  const { userId, loadingSignIn, emailAddress, isSignedIn } =
    useSelector(userStateSelector);

  const signIn = React.useCallback(
    ({ email, password }) => {
      dispatch(userActions.signIn({ email: email, password: password }));
    },
    [dispatch]
  );
  const signOut = React.useCallback(() => {
    dispatch(userActions.signOut());
  }, [dispatch]);

  return {
    emailAddress,
    userId,
    loadingSignIn,
    signIn,
    signOut,
    isSignedIn,
  };
};
