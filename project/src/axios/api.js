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
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, data, { withCredentials: true })
}

// 롱링 페이퍼 생성
const Add_longlling_Paper = async (data) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts`, data, { withCredentials: true })
}

// 마이페이지 유저 데이터 가져오기
const get_User_data = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`)
    console.log(response.data.allMyPost)
    return response.data.data
}

// 마이페이지 나의 페이지 list 가져오기 
const get_My_Pages = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`)
    return response.data.allMyPost
}





const getComment = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/paper`)
    return response.data
}

const getTitle = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
    return response.data
}

const addComment = async (newComment) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/paper`, newComment)
}

const addPaper = async (newPaper) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newPaper)
}

const deleteComment = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/paper/${id}`)
}


export { getComment, addComment, deleteComment, getTitle, addPaper, signup, login, Add_longlling_Paper, get_User_data, get_My_Pages }

