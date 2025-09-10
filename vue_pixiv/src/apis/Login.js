import { login_http } from '@/utils/http'


 const login = (data) => {
    return login_http({
      url: 'login',
      method: 'POST',
      data
    })
}

 const signup = (data) => {
    return login_http({
      url: 'signup',
      method: 'POST',
      data
    })
}

export default {
  login,
  signup
}
