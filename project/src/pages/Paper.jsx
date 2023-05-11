import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { useQuery } from 'react-query'
import axios from 'axios'
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";


function Paper() {

  const params = useParams()

  const paramsNumber = Number(params.id)

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  // 상세보기 버튼 클릭 후 롤링페이퍼로 이동 시 해당 postId 데이터 가져오기 
  const get_My_Longlling_Paper = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/${paramsNumber}/comments`)
    return response.data.findOnePost
  }

  const { isError: isError_get_My_Longlling_Paper, isLoading: isLoading_get_My_Longlling_Paper, data: get_My_Longlling_Paper_Data }
    = useQuery("get_My_Longlling_Paper", get_My_Longlling_Paper)


  // 댓글 조회 기능 
  const get_Comments = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/${paramsNumber}/comments`)
    return response.data.findAllComment
  }

  const { isError: isError_get_Comments, isLoading: isLoading_get_Comments, data: get_Comments_Data }
    = useQuery("get_Comments", get_Comments)


  // 댓글 신고 기능
  const report_Comment = async (commentId) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/comments/${commentId}/report`, { withCredentials: true })
    return response
  }

  const mutation = useMutation(report_Comment, {
    onSuccess: () => {
      queryClient.invalidateQueries("get_Comments")
      console.log('댓글 신고 성공!');
    },
    onError: (error) => {
      alert(error.response.data.errorMessage);
    }
  });


  const onSubmitHandler = async (commentId) => {
    try {
      await mutation.mutateAsync(commentId);
    } catch (error) {
      console.log(error);
    }
  };


  if (isLoading_get_My_Longlling_Paper || isLoading_get_Comments) {
    return <div>Loading...</div>;
  }

  if (isError_get_My_Longlling_Paper || isError_get_Comments) {
    return <div>Error occurred!</div>;
  }

  if (get_My_Longlling_Paper_Data && get_Comments_Data) {

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2 } }}
        exit={{ opacity: 0, transition: { duration: 1.2 } }}
      >
        <StContainer>
          <StHeader>
            <StHomeIcon onClick={() => { navigate(-1) }}>
              <FontAwesomeIcon icon={faArrowLeft} size='xl' />
            </StHomeIcon>
            {
              <StTitle>
                {get_My_Longlling_Paper_Data.title}
              </StTitle>
            }
            {
              <ContentHeader>
                {get_My_Longlling_Paper_Data.content}
              </ContentHeader>
            }
          </StHeader>
          <StPaperBoxContainer>
            {
              get_Comments_Data?.map((item) => {
                return (
                  <StPaperBox key={item.commentId}>
                    {item.comment}
                    <DeleteButton onClick={() => { onSubmitHandler(item.commentId) }}>
                      <FontAwesomeIcon icon={faBell} />
                    </DeleteButton>
                  </StPaperBox>
                )
              })
            }
          </StPaperBoxContainer>
          <StWriteButton onClick={() => { navigate('/addcomment', { state: { params1: paramsNumber } }) }}><FontAwesomeIcon icon={faPen} size='xl' beat style={{ color: "#ffffff" }} /></StWriteButton>
        </StContainer>
      </motion.div>
    )
  }
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

