import axios from "axios";
// axios.defaults.baseURL = 'http://43.201.106.25:3000';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://kimchaeminthegreat.shop';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://kimchaeminthegreat.shop';



// 회원가입
const signup = async (data) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/signup`, data, { withCredentials: true })
}

// 로그인
const login = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, data, { withCredentials: true })
    console.log(response.data.message)
    return response.data.message
}

// 롱링 페이퍼 생성
const Add_longlling_Paper = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts`, data, { withCredentials: true })
    return response
}

// 마이페이지 유저 데이터 가져오기
const get_User_data = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`)
    return response.data.userInfo
}

// 마이페이지 나의 페이지 list 가져오기 
const get_My_Pages = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`)
    return response.data.allMyPost
}


// 마이페이지 내가 쓴 comment(댓글) list 가져오기 
const get_My_Comments = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`)
    return response.data.allMyComment
}


// 상세보기 버튼 구현을 위한 각 페이지 별 postId 가져오기 
const get_My_Pages_PostId = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`)
    return response.data
}



export {signup, login, Add_longlling_Paper, get_User_data, get_My_Pages, get_My_Pages_PostId, get_My_Comments }

