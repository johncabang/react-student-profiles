import React, { useContext } from 'react'
import styled from 'styled-components'

import { StudentContext } from '../../context/StudentContext'

const SearchInput = () => {
  const {
    searchName,
    setSearchName,
    searchTags,
    setSearchTags,
    // filterNameByTag,
  } = useContext(StudentContext)

  return (
    <Container>
      <SearchNamesInput
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={(event) => setSearchName(event.target.value)}
      />
      <SearchTagsInput
        type="text"
        placeholder="Search by tag"
        value={searchTags}
        onChange={(event) => setSearchTags(event.target.value)}
      />
      {/* {console.log(searchTags)} */}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchNamesInput = styled.input`
  border: none;
  outline: none;
  margin: 1rem 1rem 0rem 1rem;
  font-size: 1.2rem;
  padding: 1rem 1rem 1rem 0;
  border-bottom: #b7b7b7 solid 1px;
`

const SearchTagsInput = styled.input`
  border: none;
  outline: none;
  margin: 1rem 1rem 2rem 1rem;
  font-size: 1.2rem;
  padding: 1rem 1rem 1rem 0;
  border-bottom: #b7b7b7 solid 1px;
`

export default SearchInput
