import { useMediaQuery } from "@mui/material";
import React from "react";
import { API_URL, getCurrentUser } from "../../../index";
import theme from "../../../Theme";
import { PageHeader } from "../atoms/PageHeader";
import { ProfileData } from "../molecules/ProfileData";

export const Profile: React.FC = () => {
  const user = getCurrentUser();
  const profileImageUrl =
    (user && `${API_URL}/v1/userAccount/${user.id}/profile.png`) || undefined;

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {!mobile && (
        <PageHeader
          pageTitle={"Profile"}
          pageDescription={"View and manage your personal information."}
        />
      )}
      <ProfileData
        photo={profileImageUrl}
        name={user?.name}
        title={user?.title}
        companyName={user?.company?.name}
        email={user?.email}
        phone={user?.phone}
        access={user?.access}
      />
    </>
  );
};
