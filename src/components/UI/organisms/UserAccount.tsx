import { useQuery } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfilePicture from "../../../assets/profilePicture.png";
import { GET_PERSONS } from "../../../util/queryService";
import { UserAccountTemplate } from "../../templates/UserAccountTemplate";
import { PageHeader } from "../atoms/PageHeader";

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

  // Set up interface to hold the data we will be gathering from backend
  interface Person {
    name: string;
    id: string;
  }

  // https://www.apollographql.com/docs/react/data/queries/
  // TO-DO: handle loading and error
  const personList: Array<Person> = [];
  const { loading, data } = useQuery(GET_PERSONS);

  // Sample feed into UI components
  const [name, setName] = useState("Jane Doe");
  useEffect(() => {
    if (!loading && data) {
      data.people.map((person: Person) => {
        personList.push(person);
      });
      setName(personList[0].name);
    }
  }, [loading, data]);

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
        userPhoto={ProfilePicture}
        userName={name}
        userTitle={"Senior Manager at Blackline Safety"}
        userPhone={"123-456-7890"}
        userEmail={"jane.doe@blackline.ca"}
        userTeam={"Team 123-ABC-456"}
        teamData={mockData}
      />
    </>
  );
};
