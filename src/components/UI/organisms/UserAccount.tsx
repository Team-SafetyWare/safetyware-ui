import { useMediaQuery } from "@mui/material";
import React from "react";
import { UserAccountTemplate } from "../../templates/UserAccountTemplate";
import { PageHeader } from "../atoms/PageHeader";
import { API_URL, getCurrentUser } from "../../../index";

export const UserAccount: React.FC = () => {
  // TO-DO: create proper data with ALL data from backend
  const mockData: string[][][] = [
    [
      ["123-ABC-456"],
      ["Jeff Davids", "jeff.davids@blackline.ca", "Member"],
      ["John Hanley", "john.hanley@blackline.ca", "Member"],
    ],
    [
      ["987-ZYX-321"],
      ["Stephen Harding", "stephen.harding@blackline.ca", "Member"],
      ["Jennifer Cruz", "jennifer.cruz@blackline.ca", "Member"],
      ["Stanley Winston", "stanley.winston@blackline.ca", "Member"],
    ],
  ];

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
        userTeam={"Team 123-ABC-456"}
        teamData={mockData}
      />
    </>
  );
};
