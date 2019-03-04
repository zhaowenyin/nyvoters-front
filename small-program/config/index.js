export const getBaseURL = () => {
  return process.env.VUE_APP_BACKEND_SERVER || Global_config.VUE_APP_BACKEND_SERVER
}

// 图片地址
export function getImgURL(url) {
  if (!/^http/g.test(url) && !/^data:image/g.test(url)) {
    url = `${getBaseURL()}/api/v3/doctorapp/sys/images?file=${url}`
  }
  return url
}

