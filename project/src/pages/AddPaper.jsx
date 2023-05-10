import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { motion } from "framer-motion"
import { useQueryClient, useMutation } from 'react-query'
import { addPaper } from '../axios/api';


function AddPaper() {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState({
        title: '',
        content: '',
    })

    const onTitleHandler = (e) => {
        setInputValue(prev => ({ ...prev, title: e.target.value }));
    };

    const onContentHandler = (e) => {
        setInputValue(prev => ({ ...prev, content: e.target.value }))
    }



    const queryClient = useQueryClient()
    const mutation = useMutation(addPaper, {
        onSuccess: () => {
            queryClient.invalidateQueries("comment")
        }
    })


    const onSubmitHandler = async () => {
        if (inputValue.title.length > 0 && inputValue.content.length > 0) {
            try {
                mutation.mutate(inputValue)
                navigate('/paper')
            } catch (error) {
                console.log(error)
            }
        
        }
        else{
            return alert('제목과 한줄소개글을 입력해주세요.')
        }
    }

    const inputCount = inputValue.title.length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.2 } }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
        >
            <StContainer>
                <StBackButton onClick={() => { navigate("/") }}><FontAwesomeIcon icon={faArrowLeft} size='xl' /></StBackButton>
                <StInputArea>
                    <StTitle>제목 입력</StTitle>
                    <StInput placeholder='12자 이내로 적어주세요' onChange={onTitleHandler} value={inputValue.title} maxLength="12"></StInput>
                    <StWordCount>
                        <span>{inputCount}</span>
                        <span>/12 자</span>
                    </StWordCount>
                    <StComment>한줄 소개글</StComment>
                    <StInput placeholder='소개글을 적어주세요' value={inputValue.content} onChange={onContentHandler}></StInput>
                </StInputArea>
                <StSaveButtonContainer>
                    <StSaveButton onClick={onSubmitHandler}>저장</StSaveButton>
                </StSaveButtonContainer>
            </StContainer>
        </motion.div>
    )
}


export default AddPaper;




const StContainer = styled.div`
  width: 500px;
  height: 100vh;
  margin: auto;
  background-color: #eee;
  border-radius: 20px;
`

const StBackButton = styled.button`
  cursor: pointer;
  height: 40px;
  margin-left: 18px;
  margin-top: 18px; 
  border: none;
`

const StInputArea = styled.div`
  padding: 25px;
  margin-top: 60px;
`

const StTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
`

const StComment = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
  margin-top: 50px;
`

const StInput = styled.input`
  margin: 0;
  padding: 0;
  box-sizing: border-box; 
  margin-top: 30px;

  font-size: 15px;
  color: #222222;
  width: 450px;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 10px;
  padding-left: 10px;
  position: relative;
  background: none;
  z-index: 5;

  &::placeholder {
    color: #aaaaaa;
  }

  &:focus {
    outline: none;
  }

  &:focus ~ label,
  &:valid ~ label {
    font-size: 16px;
    bottom: 40px;
    color: #666;
    font-weight: bold;
  }

  &:focus ~ span,
  &:valid ~ span {
    width: 100%;
  }
`

const StSaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StSaveButton = styled.button`
  background: #1AAB8A;
  color: #fff;
  border: none;
  position: relative;
  height: 60px;
  font-size: 1.6em;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  font-weight: 600;
  margin-top: 300px;
  width: 200px;
  

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #fff;
    color: #1AAB8A;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #1AAB8A;
    transition: 400ms ease all;
  }

  &:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }

  &:hover:before,
  &:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
`
const StWordCount = styled.span`
  margin-left: 400px;
  font-size: 13px;
  margin-top: 10px;
`