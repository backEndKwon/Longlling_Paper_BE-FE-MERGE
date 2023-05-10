import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { deleteComment, getTitle } from "../axios/api"
import { useQuery, useQueryClient } from 'react-query'
import { getComment } from '../axios/api'
import { useMutation } from 'react-query'


function Paper() {

  const [paper, setPaper] = useState()

  const { isError: isErrorComment, isLoading: isLoadingComment, data: dataComment } = useQuery('comment', getComment)

  const { isError: isErrorTitle, isLoading: isLoadingTitle, data: dataTitle } = useQuery('title', getTitle)


  const queryClient = useQueryClient()
  const mutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comment")
    }
  })

  if (isLoadingComment) {
    <h1>로딩 중입니다..!</h1>
  }

  if (isErrorComment) {
    <h1>에러가 발생하였습니다..!</h1>
  }

  const onDeleteButtonClickHandler = async (id) => {
    try {
      mutation.mutate(id)
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.2 } }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
    >
      <StContainer>
        <StHeader>
          <StHomeIcon onClick={() => { navigate('/') }}>
            <FontAwesomeIcon icon={faHouse} size='xl' />
          </StHomeIcon>
          {
            dataTitle?.map((item) => {
              return (
                <StTitle key={item.id}>
                  {item.title}
                </StTitle>
              )
            })
          }
          {
            dataTitle?.map((item) => {
              return (
                <ContentHeader key={item.id}>
                  {item.content}
                </ContentHeader>
              )
            })
          }
        </StHeader>
        <StPaperBoxContainer>
          {
            dataComment?.map((item) => {
              return (               
                <StPaperBox key={item.id}>
                  {item.comment}
                  <DeleteButton onClick={() => { onDeleteButtonClickHandler(item.id) }}><FontAwesomeIcon icon={faTrash} /></DeleteButton>
                </StPaperBox>
              )
            })
          }
        </StPaperBoxContainer>
        <StWriteButton><FontAwesomeIcon icon={faPen} size='xl' beat style={{ color: "#ffffff" }} onClick={() => { navigate('/addcomment') }} /></StWriteButton>
      </StContainer>
    </motion.div>
  )
}

export default Paper

const StContainer = styled.div`
  width: 500px;
  margin: auto;
  background-color: #eee;
  border-radius: 20px;
`

const StHeader = styled.div`
  height: 120px;
  /* border-bottom: 1px solid #a0a0a0; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d3d3d3;
`

const StHomeIcon = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  position: relative;
  left: -220px;
  top: 10px;
  border : none;
  background-color: #d3d3d3;
`

const StTitle = styled.div`
  font-size: 25px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  text-align: center;
`

const StPaperBoxContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 100%;
`

const StPaperBox = styled.div`
  width: 130px;
  height: 130px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  position: relative;
`

const StWriteButton = styled.button`
  width: 50px;
  height: 50px;
  position: relative;
  left: 430px;
  bottom: 20px;
  cursor: pointer;
  margin-top: 25px;
  background-color: black;
  border: none;
  border-radius: 12px;
`


const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute; 
  bottom: 10px; 
  right: 5px; 
`

const ContentHeader = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`

