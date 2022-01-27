import React from "react";
import { LoginFooterPolygon } from "../atoms/LoginFooterPolygon";
import { LoginTopLeftCornerPolygon } from "../atoms/LoginTopLeftCornerPolygon";
import { LoginTopRightCornerPolygon } from "../atoms/LoginTopRightCornerPolygon";
import { LoginPrompt } from "../molecules/LoginPrompt";

export const Login: React.FC = () => {
  return (
    <>
      <LoginTopLeftCornerPolygon />
      <LoginTopRightCornerPolygon />
      <LoginFooterPolygon />
      <LoginPrompt />
    </>
  );
};
