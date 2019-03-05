// import api from '../../utils/api'

export async function registerSubmit (payload) {
  console.log(payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {}
      })
    }, 500)
  })
  // return api.get(`/online-register/create`, {params: payload})
  //   .then(data => data)
  //   .catch(() => Promise.resolve({data: null}))
}

