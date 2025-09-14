import { http,ranking_http } from '@/utils/http'


export const getImgList = (data) => {
    return http({
      url: 'duckMo',
      method: 'POST',
      data
    })
}
export const getRankingImgList = (params) => {
    return ranking_http({
      url: 'pixiv/ranking.php',
      method: 'GET',
      params
    })
}
