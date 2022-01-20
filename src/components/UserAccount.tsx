import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ProfilePicture from "../assets/profilePicture.png";
import { GET_PERSONS } from "../queryService";
import { UserAccountTemplate } from "./templates/UserAccountTemplate";

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
  let personList: Array<Person> = [];
  const { loading, error, data } = useQuery(GET_PERSONS, {
    onCompleted: () => {
      data.people.map((person: Person) => {
        personList.push(person);
      });
    },
  });

  // Sample feed into UI components
  // Probably a better way to handle this
  const [name, setName] = useState("Jane Doe");
  useEffect(() => {
    if (data) {
      setName(personList[0].name);
    }
  }, [data]);

  return (
    <>
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
