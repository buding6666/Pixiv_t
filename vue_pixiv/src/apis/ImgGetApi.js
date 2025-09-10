import { http } from '@/utils/http'


export const getImgList = (data) => {
    return http({
      url: 'duckMo',
      method: 'POST',
      data
    })
}
