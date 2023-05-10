import axios from "axios";
// axios.defaults.baseURL = 'http://43.201.106.25:3000';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://kimchaeminthegreat.shop';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://kimchaeminthegreat.shop';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,

})

instance.interceptors.request.use(

    function (config) {
        console.log('인터셉터 요청 성공!')
        return config
    },

    function (error) {
        console.log('인터셉터 요청 오류!')
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(

    function (response) {
        console.log('인터셉터 응답 받았습니다!')
        return response
    },

    function (error) {
        console.log('인터셉터 응답 오류 발생!')
        return Promise.reject(error)
    }
)

/////////////////////////////////////////////////////////////////// 아래는 react-query

const signup = async (user) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/signup`, user, { withCredentials : true })
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


export default instance;
export { getComment, addComment, deleteComment, getTitle, addPaper, signup }

