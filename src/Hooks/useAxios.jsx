import axios from "axios"

const instance = axios.create({
    baseURL:'https://e-tuition-bd-server.vercel.app'
})

const useAxios = ()=>{
 return instance;
}

export default useAxios;