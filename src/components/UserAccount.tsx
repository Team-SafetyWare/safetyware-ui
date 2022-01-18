import React from "react";
import ProfilePicture from "../assets/profilePicture.png";
import { UserAccountTemplate } from "./templates/UserAccountTemplate";

export const UserAccount: React.FC = () => {
  //TO-DO: Add mock-data for different teams so implementing dynamic site features will
  //       be easier
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

  return (
    <>
      <UserAccountTemplate
        userPhoto={ProfilePicture}
        userName={"Jane Doe"}
        userTitle={"Senior Manager at Blackline Safety"}
        userPhone={"123-456-7890"}
        userEmail={"jane.doe@blackline.ca"}
        userTeam={"Team 123-ABC-456"}
        teamData={mockData}
      />
    </>
  );
};
