import React, { useContext } from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

import { StudentContext } from "../../hooks/StudentContext";
import Header from "../Header";

const StudentsCard = () => {
  const {
    tags,
    setTags,
    inputTag,
    setInputTag,
    showGrades,
    // setShowGrades,
    expandToggle,
    // onKeyDown,
    searchName,
    studentsList,
    addTags
  } = useContext(StudentContext);

  return (
    <Container>
      <Header />
      {searchName(studentsList).map((student, index) => {
        return (
          <StudentCardWrapper key={student.id}>
            <StudentImage src={student.pic} alt="student pic" />
            <StudentCard>
              <StudentHeader>
                <h1>
                  {student.firstName} {student.lastName}
                </h1>
                <ExpandButton onClick={() => expandToggle(index)}>
                  {showGrades === index ? <FaMinus /> : <FaPlus />}
                </ExpandButton>
              </StudentHeader>
              <StudentBody>
                <p>Email: {student.email}</p>
                <p>Company: {student.company}</p>
                <p>Skill: {student.skill}</p>
                <p>
                  Average:{" "}
                  {student.grades
                    .map((i) => Number(i))
                    .reduce((a, b) => a + b, 0) / student.grades.length}
                  %
                </p>
                {showGrades === index && (
                  <GradesWrapper>
                    {student.grades.map((grade, index) => (
                      <p key={index}>
                        Test {index + 1}: {grade}%
                      </p>
                    ))}
                  </GradesWrapper>
                )}
                {tags.length > 0 && (
                  <TagsWrapper>
                    {tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </TagsWrapper>
                )}
                <TagInput
                  type="text"
                  placeholder="Add a tag"
                  value={inputTag}
                  onKeyDown={(e) => {
                    const { key } = e;
                    const trimmedInputTag = inputTag.trim();
                    if (key === "Enter") {
                      e.preventDefault();
                      setTags((prevState) => [...prevState, trimmedInputTag]);
                      addTags(inputTag, index);
                      setInputTag("");
                    }
                  }}
                  onChange={(e) => setInputTag(e.target.value)}
                />
              </StudentBody>
            </StudentCard>
          </StudentCardWrapper>
        );
      })}
      {console.log(studentsList)}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 830px;
  height: 575px;
  border: 0rem 1.5rem;
  border-radius: 0.7rem;
  overflow-y: auto;
`;

const StudentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExpandButton = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: #b7b7b7;
  display: flex;
  align-items: center;
`;

const GradesWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const StudentCardWrapper = styled.div`
  display: flex;
  border-bottom: #b7b7b7 solid 1px;
  padding: 1.5rem;
`;

const StudentImage = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: #b7b7b7 solid 1px;
`;

const StudentCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;

const StudentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 0;
  padding: 1rem 1.5rem 0rem 1.5rem;
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  border-bottom: #b7b7b7 solid 1px;
  margin-top: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0rem;
  width: 40%;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0rem;
`;

const Tag = styled.div`
  background-color: lightgray;
  border-radius: 5px;
  border: none;
  padding: 0.5rem 0.8rem;
  margin: 0.2rem 0.8rem 0rem 0rem;
`;

export default StudentsCard;
