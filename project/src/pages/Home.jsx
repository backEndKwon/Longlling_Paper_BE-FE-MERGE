import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";



function Home() {

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.2 } }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
    >
      <StContainer>
        <StHeader>
          <StTitle>
            Longlling Paper
          </StTitle>
          <StMyPageButton onClick={() => { navigate("/mypage") }}>
            <FontAwesomeIcon icon={faUser} size='xl' />
          </StMyPageButton>
        </StHeader>
        <StCenterTitle>
          Longlling Paper
        </StCenterTitle>
        <InputContainer>
          <StInput placeholder='링크를 복사 후, 입력창에 붙여넣기해주세요.'></StInput>
        </InputContainer>
        <StAddContainer>
          <StAddPaper onClick={() => { navigate("/addpaper") }}>내 롤링페이퍼 만들기</StAddPaper>
        </StAddContainer>
      </StContainer>
    </motion.div>
  )
}

export default Home


const StContainer = styled.div`
  width: 700px;
  height: 100vh;
  margin: auto;
  background-color: #eee;
  border-radius: 20px;
`

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const StTitle = styled.div`
  padding : 20px;
  font-size: 25px;
  font-weight: 600;
`

const StMyPageButton = styled.button`
  cursor: pointer;
  height: 40px;
  margin-right: 18px;
  margin-top: 18px;
  border: none;
`

const StCenterTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  margin-top: 200px;
  font-size: 60px;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`

const StInput = styled.input`
  width: 400px;
  height: 40px;
  font-size: 15px;
  border: 0;
  outline: none;
  padding-left: 10px;
  background-color: #d3d3d3;
`

const StAddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`

const StAddPaper = styled.button`
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
  width: 408px;
  font-weight: 600;
  

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