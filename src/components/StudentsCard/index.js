import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const StudentsCard = ({ studentsList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTags, setSearchTags] = useState("");

  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [showGrades, setShowGrades] = useState(false);

  const expandToggle = () => {
    setShowGrades(!showGrades);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInputTag = inputTag.trim();

    if (key === "Enter") {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInputTag]);
      setInputTag("");
    }
  };

  function search(rows) {
    return rows.filter(({ firstName, lastName }) =>
      [firstName, lastName].some(
        (name) =>
          name.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      )
    );
  }

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchTags
        type="text"
        placeholder="Search by tag"
        value={searchTags}
        onChange={(e) => setSearchTags(e.target.value)}
      />
      {search(studentsList).map((student) => {
        return (
          <StudentWrapper key={student.id}>
            <StudentImage src={student.pic} alt="student pic" />
            <StudentDetails>
              <Header>
                <h1>
                  {student.firstName} {student.lastName}
                </h1>
                {/* {console.log(student.id)} */}
                <ExpandButton onClick={expandToggle} showGrades={showGrades}>
                  {!showGrades ? <FaPlus /> : <FaMinus />}
                </ExpandButton>
              </Header>
              <Details>
                <p>Email: {student.email}</p>
                <p>Company: {student.company}</p>
                <p>Skill: {student.skill}</p>
                {/* {console.log(student.grades)} */}
                <p>
                  Average:{" "}
                  {student.grades
                    .map((i) => Number(i))
                    .reduce((a, b) => a + b, 0) / student.grades.length}
                  %
                </p>
                {/* {console.log(student.grades)} */}
                {showGrades && (
                  <GradesWrapper>
                    {student.grades.map((grade, index) => (
                      <p key={index}>
                        Test {index + 1}: {grade}%
                      </p>
                    ))}
                  </GradesWrapper>
                )}
                <TagsWrapper>
                  {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsWrapper>
                <TagInput
                  type="text"
                  placeholder="Add a tag"
                  value={inputTag}
                  onKeyDown={onKeyDown}
                  onChange={(e) => setInputTag(e.target.value)}
                />
              </Details>
            </StudentDetails>
          </StudentWrapper>
        );
      })}
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

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin: 1rem 1rem 0rem 1rem;
  font-size: 1.2rem;
  padding: 1rem 1rem 1rem 0;
  border-bottom: #b7b7b7 solid 1px;
`;

const SearchTags = styled.input`
  border: none;
  outline: none;
  margin: 1rem 1rem 2rem 1rem;
  font-size: 1.2rem;
  padding: 1rem 1rem 1rem 0;
  border-bottom: #b7b7b7 solid 1px;
`;

const Header = styled.div`
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

const StudentWrapper = styled.div`
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

const StudentDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;

const Details = styled.div`
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
  /* margin-top: 2rem; */
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
  margin: 0.2rem 0.8rem 0.2rem 0;
`;

export default StudentsCard;
