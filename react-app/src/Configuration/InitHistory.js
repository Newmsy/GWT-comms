import React from "react";
import { useNavigate } from "react-router-dom";

export class AppHistory {
  static history;
  static init(history) {
    AppHistory.history = history;
  }
}

export const InitHistory = ({ children }) => {
  const history = useNavigate();

  React.useEffect(() => {
    if (AppHistory.history == null) {
      AppHistory.init(history);
    }
  });

  return children;
};
