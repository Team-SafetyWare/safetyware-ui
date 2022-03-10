import React from "react";
import { store } from "../../../store/store";
import { LoginFooterPolygon } from "../atoms/LoginFooterPolygon";
import { LoginTopLeftCornerPolygon } from "../atoms/LoginTopLeftCornerPolygon";
import { LoginTopRightCornerPolygon } from "../atoms/LoginTopRightCornerPolygon";
import { LoginPrompt } from "../molecules/LoginPrompt";

export const Login: React.FC = () => {
  store.dispatch({ type: "USER_LOGOUT" });

  return (
    <>
      <LoginTopLeftCornerPolygon />
      <LoginTopRightCornerPolygon />
      <LoginFooterPolygon />
      <LoginPrompt />
    </>
  );
};
