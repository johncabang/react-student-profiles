import React, { useContext } from "react";
import styled from "styled-components";

import StudentsCard from "./components/StudentsCard";

import { StudentContext } from "./hooks/StudentContext";

function App() {
  const { studentsList } = useContext(StudentContext);

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
