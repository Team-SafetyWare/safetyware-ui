import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";

interface PageProps {
  data?: any;
  title?: any;
  component?: any;
  render?: ((props: RouteComponentProps<any>) => React.ReactNode) | undefined;
  exact?: boolean | undefined;
  path?: string | string[] | undefined;
  children?: React.ReactNode;
}

// https://stackoverflow.com/questions/52447828/is-there-a-way-to-modify-the-page-title-with-react-router-v4
export const Page: React.FC<PageProps> = ({ title, ...rest }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <Route {...rest} />;
};
