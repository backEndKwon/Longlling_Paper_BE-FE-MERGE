import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {House, PersonCircle} from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom'; //페이지 이동 도와주는 useNavigate()
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Card} from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


function Mypage() {
  const navigate = useNavigate();
  const locatin = useLocation()
  console.log(locatin)

  const MyCards = [
    { title: "생일 롤링페이퍼", content: "생일 축하해~~" },
    { title: "!! 롤링페이퍼", content: "!! 축하해~~" },
    { title: "!! 롤링페이퍼", content: "!! 축하해~~" },
  ];

  const MyComment = [
    { title: "졸업 롤링페이퍼", comment: "졸업을 축하해!" },
    { title: "!! 롤링페이퍼", comment: "!!을 축하해!" },
  ];

  return (

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
          {/* 로그인한 사람의 닉네임과 한줄평 오게  */}
          <div style={{ padding: '5px' }}> nickname:닉네임ヽ(✿ﾟ▽ﾟ)ノ </div>
          <div style={{ padding: '5px' }}> email: 한줄 소개 적는 문구입니다?</div>
        </div>
      </MyInfo>
      <div>
        <Tabs
          defaultActiveKey="profile" id="fill-tab-example"
          className="mb-3" fill>
          <Tab eventKey="home" title="내 롤링페이퍼">
            <MyLRP>
            {MyCards.map((card) => (
              <Card border="dark" style={{ width: '40rem' }}>
                <Link to={`/paper`}
                style={{
                  textDecorationLine: "none",}}>상세보기</Link>
                {/* <Card.Header>{card.title}</Card.Header> */}
                <Card.Body>
                  <Card.Text>{card.title}</Card.Text>
                </Card.Body>
              </Card>
            ))}
            </MyLRP>
          </Tab>


          <Tab eventKey="profile" title="내가 적은 메세지">
          <MyCom>
            {MyComment.map((card) => (
              <Card border="dark" style={{ width: '40rem' }}>
                {/* <Card.Header>{card.title}</Card.Header> */}
                <Link to={`/paper`}
                style={{
                  textDecorationLine: "none",}}>상세보기</Link>
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

  )
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
`
const MyCom = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  margin: 10px;
  gap: 10px;
  padding: 10px 0;
`