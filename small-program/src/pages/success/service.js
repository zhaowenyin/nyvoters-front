// import api from '../../utils/api'

export async function complaitSubmit () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {}
      })
    }, 500)
  })
  // return api.get(`/online-appeal/create`, {params: payload})
  //   .then(data => data)
  //   .catch(() => Promise.resolve({data: null}))
}

