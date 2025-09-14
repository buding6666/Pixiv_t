import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.mossia.top/',
  timeout: 5000,
})

//请求拦截器
http.interceptors.request.use(
  (confing) => {
    return confing
  },
  (e) => Promise.reject(e),
)

//响应拦截器
http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (e) => Promise.reject(e),
)

const login_http = axios.create({
  baseURL: 'http://43.167.234.120:8050/',
  timeout: 5000,
})

//请求拦截器
login_http.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    return config
  },
  (e) => Promise.reject(e),
)

//响应拦截器
login_http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (e) => Promise.reject(e),
)

const ranking_http = axios.create({
  baseURL: 'http://43.167.234.120:8020',
  timeout: 5000,
})

//请求拦截器
ranking_http.interceptors.request.use(
  (confing) => {
    return confing
  },
  (e) => Promise.reject(e),
)

//响应拦截器
ranking_http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (e) => Promise.reject(e),
)

export { login_http, http, ranking_http }
