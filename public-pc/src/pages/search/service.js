// import api from '../../utils/api'

export async function searchSubmit () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {}
      })
    }, 500)
  })
  // return api.get(`/online/query`, {params: payload})
  //   .then(data => data)
  //   .catch(() => Promise.resolve({data: null}))
}
