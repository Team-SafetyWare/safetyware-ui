import { useQuery } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import React from "react";
import { GET_USER_ACCOUNT } from "../../../util/queryService";
import { UserAccountTemplate } from "../../templates/UserAccountTemplate";
import { PageHeader } from "../atoms/PageHeader";
import { API_URL, getCurrentAccountId } from "../../../index";

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

  const userAccountId = getCurrentAccountId();
  const { data: userAccountData } = useQuery(GET_USER_ACCOUNT, {
    variables: { userAccountId: userAccountId },
  });
  const userAccount = userAccountData?.userAccount;
  const profileImageUrl =
    userAccount && `${API_URL}/v1/userAccount/${userAccount.id}/profile.png`;

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
        userName={userAccount?.name}
        userTitle={`${userAccount?.title} at ${userAccount?.company?.name}`}
        userPhone={userAccount?.phone}
        userEmail={userAccount?.email}
        userTeam={"Team 123-ABC-456"}
        teamData={mockData}
      />
    </>
  );
};
