import { useMediaQuery } from "@mui/material";
import React from "react";
import { API_URL, getCurrentUser } from "../../../index";
import theme from "../../../Theme";
import { UserAccountTemplate } from "../../templates/UserAccountTemplate";
import { PageHeader } from "../atoms/PageHeader";

export const UserAccount: React.FC = () => {
  const user = getCurrentUser();
  const profileImageUrl =
    (user && `${API_URL}/v1/userAccount/${user.id}/profile.png`) || undefined;

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {!mobile && (
        <PageHeader
          pageTitle={"User Information"}
          pageDescription={
            "Description of the User Information Page and What it Does"
          }
        />
      )}
      <UserAccountTemplate
        userPhoto={profileImageUrl}
        userName={user?.name}
        userTitle={`${user?.title} at ${user?.company?.name}`}
        userPhone={user?.phone}
        userEmail={user?.email}
      />
    </>
  );
};
