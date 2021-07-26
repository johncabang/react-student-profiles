import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'

import { StudentContext } from '../../context/StudentContext'

const SearchInput = () => {
  const {
    searchName,
    setSearchName,
    searchTags,
    // filterNameByTag,
    setSearchTags,
    filteredStudentsList,
    studentsList,
    setFilteredStudentsList,
  } = useContext(StudentContext)

  const filterNameByTag = (event) => {
    setSearchTags(event.target.value)
    if (searchTags === '') setFilteredStudentsList(studentsList)
    const results = studentsList.filter((item) => {
      return (
        item.tags
          .toString()
          .toLowerCase()
          .indexOf(searchTags.toLowerCase().trim()) > -1
      )
    })
    setFilteredStudentsList(results)
    console.log(filteredStudentsList)
    // console.log(searchTags)
  }

  useEffect(() => {
    console.log(searchTags)
  }, [searchTags])

  return (
    <Container>
      <SearchNamesInput
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <SearchTagsInput
        type="text"
        placeholder="Search by tag"
        value={searchTags}
        onChange={filterNameByTag}
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
