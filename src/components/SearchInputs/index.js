import React, { useContext } from "react";
import styled from "styled-components";

import { StudentContext } from "../../hooks/StudentContext";

const SearchInput = () => {
  const { searchTerm, setSearchTerm, searchTags, setSearchTags } =
    useContext(StudentContext);

  return (
    <Container>
      <SearchNamesInput
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchTagsInput
        type="text"
        placeholder="Search by tag"
        value={searchTags}
        onChange={(e) => setSearchTags(e.target.value)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchNamesInput
 = styled.input`
  border: none;
  outline: none;
  margin: 1rem 1rem 0rem 1rem;
  font-size: 1.2rem;
  padding: 1rem 1rem 1rem 0;
  border-bottom: #b7b7b7 solid 1px;
`;

const SearchTagsInput = styled.input`
  border: none;
  outline: none;
  margin: 1rem 1rem 2rem 1rem;
  font-size: 1.2rem;
  padding: 1rem 1rem 1rem 0;
  border-bottom: #b7b7b7 solid 1px;
`;

export default SearchInput;