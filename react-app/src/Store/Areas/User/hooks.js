import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions, userStateSelector } from "./state";

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const { userId, name, loading } = useSelector(userStateSelector);

  const fetchUser = React.useCallback(() => {
    dispatch(userActions.fetchUser({ email: name }));
  }, [dispatch, name]);

  return {
    name,
    userId,
    loading,
    fetchUser,
  };
};

export const useSignInUser = () => {
  const dispatch = useDispatch();
  const { userId, loadingSignIn, name, isSignedIn } =
    useSelector(userStateSelector);

  const signIn = React.useCallback(
    ({ name }) => {
      console.log(name)
      dispatch(userActions.signIn({ name: name }));
    },
    [dispatch]
  );
  const signOut = React.useCallback(() => {
    dispatch(userActions.signOut());
  }, [dispatch]);

  return {
    name,
    userId,
    loadingSignIn,
    signIn,
    signOut,
    isSignedIn,
  };
};
