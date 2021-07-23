import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import axios from "axios";

import StudentsCard from "./components/StudentsCard";

import { StudentContext } from "./hooks/StudentContext";

function App() {
  const { studentsList } = useContext(StudentContext);
  // const url = "https://api.hatchways.io/assessment/students";

  // const [studentsList, setStudentsList] = useState([]);

  // useEffect(() => {
  //   axios(url)
  //     .then((response) => {
  //       setStudentsList(response.data.students);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // console.log(studentsList);

  return (
    <Container>
      <StudentsCard studentsList={studentsList} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
  height: 100vh;
`;

export default App;
