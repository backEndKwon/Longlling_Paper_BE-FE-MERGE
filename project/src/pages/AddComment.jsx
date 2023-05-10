import React, { useState } from 'react'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

function AddComment() {
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('')

    const inputValueHandler = (e) => {
        setInputValue(e.target.value)
    }



    // comment(댓글) 추가 기능 
    const Add_Comment = async (data) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts/:postId/comments`, data, { withCredentials: true })
    }


    // 서버 통신 부분 
    const mutation = useMutation(Add_Comment, {
        onSuccess: () => {
            console.log('댓글 생성 성공!');
        },
        onError: (error) => {
            alert(error.response.data.errorMessage);
        }
    });


    const onSubmitHandler = async () => {
        try {
            mutation.mutate({
                comment : inputValue
            });
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.2 } }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
        >
            <Background>
                <Layout>
                    <Header>
                        <BackButton onClick={() => { navigate(-1) }}>
                            <FontAwesomeIcon icon={faArrowLeft} size='xl' />
                        </BackButton>
                    </Header>
                    <form onSubmit={(e) => {
                        e.preventDefault(e)
                        onSubmitHandler()
                    }}>
                        <TextArea rows={8} cols={30} value={inputValue.comment} onChange={inputValueHandler}></TextArea>
                        <Footer>
                            <SaveButton type="submit">저장</SaveButton>
                        </Footer>
                    </form>
                </Layout>
            </Background>
        </motion.div>
    )
}

export default AddComment

const Background = styled.div`
    background-color: gray;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 600px;
    background: white;
    border-radius: 15px;
    margin-top: -80px;
`

const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 20px;
    margin-left: -440px;
    margin-bottom: 65px;
`

const Header = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SaveButton = styled.button`
  background: #1AAB8A;
  color: #fff;
  border: none;
  position: relative;
  height: 40px;
  font-size: 1.3em;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  font-weight: 600;
  width: 160px;
  margin-bottom: 20px;
  

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

const Footer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`

const TextArea = styled.textarea`
    resize: none;
    width: 80%;
    font-size: 20px;
    margin: 2em 0;
    padding: 1em;
    text-align: center;
    border: none;
    outline: none;
    margin-left: 27px;
`
