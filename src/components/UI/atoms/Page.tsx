import React, { useEffect } from "react";
import { Route } from "react-router-dom";

interface PageProps {
  data?: any;
  title?: any;
  component?: any;
  exact?: boolean | undefined;
  path?: string | string[] | undefined;
  children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ title, ...rest }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <Route {...rest} />;
};
