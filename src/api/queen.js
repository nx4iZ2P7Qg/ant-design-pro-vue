import { axios } from '@/utils/request'

const baseUrl = 'queen'

export function getGlance () {
  return axios({
    url: baseUrl + '/menstrual/glance',
    method: 'get',
    headers: {
      'X-API-VERSION': 1
    }
  })
}

export function getMenstrualList (param) {
  return axios({
    url: baseUrl + '/menstruals',
    method: 'get',
    headers: {
      'X-API-VERSION': 1
    },
    params: {
      number: param.number,
      size: param.size
    }
  })
}
