import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { StudentContext } from '../../context/StudentContext'

const Tags = ({ index, tags }) => {
  const { setTags, addTag } = useContext(StudentContext)
  const [inputTag, setInputTag] = useState('')

  const onKeyDown = (e) => {
    const trimmedInputTag = inputTag.trim()
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault()
      setTags((prevState) => [...prevState, trimmedInputTag])
      addTag(inputTag.toLowerCase().trim(), index)
      setInputTag('')
    }
  }

  return (
    <>
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
        onKeyDown={onKeyDown}
        onChange={(e) => setInputTag(e.target.value)}
      />
    </>
  )
}

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0rem;
`

const Tag = styled.div`
  background-color: lightgray;
  border-radius: 5px;
  border: none;
  padding: 0.5rem 0.8rem;
  margin: 0.2rem 0.8rem 0rem 0rem;
`

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  border-bottom: #b7b7b7 solid 1px;
  margin-top: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0rem;
  width: 40%;
`

export default Tags
