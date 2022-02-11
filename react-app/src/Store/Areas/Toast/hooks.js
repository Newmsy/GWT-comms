import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastSlice } from "./state";

const useToastDispatcher = () => {
  const dispatch = useDispatch();

  const addToast = React.useCallback(
    (message) => {
      dispatch(toastSlice.actions.displayToast({ message }));
    },
    [dispatch]
  );

  const addAutoDismissToast = React.useCallback(
    (message, timeout) => {
      dispatch(toastSlice.actions.displayToast({ message }));

      setTimeout(() => {
        dispatch(toastSlice.actions.closeToast());
      }, timeout);
    },
    [dispatch]
  );

  const addAutoDismissToastByMessage = React.useCallback(
    (message, timeout) => {
      dispatch(toastSlice.actions.displayToast({ message }));

      setTimeout(() => {
        dispatch(toastSlice.actions.closeToastByMessage({ message }));
      }, timeout);
    },
    [dispatch]
  );

  const hideToast = React.useCallback(() => {
    dispatch(toastSlice.actions.hideToast());
  }, [dispatch]);

  const closeToast = React.useCallback(() => {
    dispatch(toastSlice.actions.closeToast());
  }, [dispatch]);

  const addMultiToast = React.useCallback(
    (messages, timeout) => {
      messages.forEach((message, index) => {
        setTimeout(() => {
          dispatch(toastSlice.actions.displayToast({ message }));
        }, timeout * index + 100);
        setTimeout(() => {
          dispatch(toastSlice.actions.closeToastByMessage({ message }));
        }, timeout * (index + 1));
      });
    },
    [dispatch]
  );

  return {
    addToast,
    addAutoDismissToast,
    addAutoDismissToastByMessage,
    hideToast,
    closeToast,
    addMultiToast,
  };
};

const useToastConsumer = () => {
  const { isVisible, text } = useSelector((state) => state.toast);

  return {
    isVisible,
    text,
  };
};

export { useToastDispatcher, useToastConsumer };
