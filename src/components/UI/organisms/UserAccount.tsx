import { useMediaQuery } from "@mui/material";
import React from "react";
import { API_URL, getCurrentUser } from "../../../index";
import { UserAccountTemplate } from "../../templates/UserAccountTemplate";
import { PageHeader } from "../atoms/PageHeader";

export const UserAccount: React.FC = () => {
  const user = getCurrentUser();
  const profileImageUrl =
    (user && `${API_URL}/v1/userAccount/${user.id}/profile.png`) || undefined;

  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");

  return (
    <>
      {matches && (
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
