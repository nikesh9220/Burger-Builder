import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-91121.firebaseio.com/'
})

export default instance;