import { useQuery } from "@apollo/client";
import React from "react";
import ProfilePicture from "../assets/183.png";
import { GET_PEOPLE } from "../queryService";
import { UserAccountTemplate } from "./templates/UserAccountTemplate";

export const UserAccount: React.FC = () => {
  //TO-DO: Add mock-data for different teams so implementing dynamic site features will
  //       be easier

  interface PersonTest {
    id: string;
    name: string;
  }

  function Person() {
    const { loading, error, data } = useQuery<PersonTest>(GET_PEOPLE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return console.log("this is data", data);
  }

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

  Person();
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
