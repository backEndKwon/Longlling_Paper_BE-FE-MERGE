import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { House, PersonCircle } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom'; //페이지 이동 도와주는 useNavigate()
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { get_User_data, get_My_Pages, get_My_Pages_PostId } from '../axios/api';
import { useQuery } from 'react-query';
import { motion } from "framer-motion"



function Mypage() {
  const navigate = useNavigate();
  const locatin = useLocation()

  const MyComment = [
    { title: "졸업 롤링페이퍼", comment: "졸업을 축하해!" },
    { title: "!! 롤링페이퍼", comment: "!!을 축하해!" },
  ];

  const { isError: isErrorUserData, isLoading: isLoadingUserData, data: userData } = useQuery("get_User_data", get_User_data)
  const { isError: isErrorMyPages, isLoading: isLoadingMyPages, data: myPagesData } = useQuery("get_My_Pages", get_My_Pages)
  const { isError: isError_get_My_Pages_PostId, isLoading: isLoading_get_My_Pages_PostId, data: get_My_Pages_PostId_Data } = useQuery("get_My_Pages_PostId", get_My_Pages_PostId)


  if (isLoadingUserData || isLoadingMyPages) {
    return <div>Loading...</div>;
  }

  if (isErrorUserData || isErrorMyPages) {
    return <div>Error occurred!</div>;
  }

  if (userData && myPagesData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2 } }}
        exit={{ opacity: 0, transition: { duration: 1.2 } }}
      >
        <Page>
          <Container>
            <Navbar expand="lg" variant="light" bg="light">
              <Container>
                <Navbar.Brand href="#" onClick={() => { navigate('/home') }}><House size={24} /></Navbar.Brand>
                <h5>Mypage</h5>
              </Container>
            </Navbar>
          </Container>
          <MyInfo>
            <div style={{ padding: '5px' }}>내 정보</div>
            <div>
              <div style={{ padding: '5px' }}><PersonCircle size={50} /></div>
              <div style={{ padding: '5px' }}> {userData.nickname} </div>
              <div style={{ padding: '5px' }}> {userData.email} </div>
            </div>
          </MyInfo>
          <div>
            <Tabs
              defaultActiveKey="profile" id="fill-tab-example"
              className="mb-3" fill>
              <Tab eventKey="profile" title="내 롤링페이퍼">
                <MyLRP>
                  {myPagesData.map((item) => (
                    <Card border="dark" style={{ width: '40rem' }} key={item.postId}>
                      <Link to={`/${item.postId}`}
                        style={{
                          textDecorationLine: "none",
                        }}>상세보기, ID:{item.postId}</Link>
                      {/* <Card.Header>{card.title}</Card.Header> */}
                      <Card.Body>
                        <Card.Text>{item.title}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </MyLRP>
              </Tab>


              <Tab eventKey="home" title="내가 적은 메세지">
                <MyCom>
                  {MyComment.map((card) => (
                    <Card border="dark" style={{ width: '40rem' }}>
                      {/* <Card.Header>{card.title}</Card.Header> */}
                      <Link to={`/paper`}
                        style={{
                          textDecorationLine: "none"
                        }}>상세보기</Link>
                      <Card.Body>
                        <Card.Text>{card.comment}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </MyCom>
              </Tab>
            </Tabs>
          </div>
        </Page>
      </motion.div>

    )
  }
}


export default Mypage

const Page = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 700px;
  padding: 0 20px;

  left: 50%;
  transform: translate(-50%, 0);

  background-color: #F7F7F7;
  // 버튼을 가장 하단에 배치하기 위해
  overflow: hidden;

  display: flex;
  flex-direction: column;
`
const MyInfo = styled.div`
  text-align: center;
  margin: 20px 0px;
  font-weight: 800;
`
const MyLRP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  gap: 10px;
  padding: 10px 0;
  border : none;
`
const MyCom = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  margin: 10px;
  gap: 10px;
  padding: 10px 0;
`
