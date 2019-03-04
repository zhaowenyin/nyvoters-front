import { getBaseURL } from '../../config'

function createFile (urlData, type) {
  const bytes = window.atob(urlData)
  let n = bytes.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bytes.charCodeAt(n)
  }
  return new Blob([u8arr], { type })
}

export default function ({ url, param, download, data, type }) {
  const el = document.createElement('a')
  document.body.appendChild(el)
  if (data) {
    const file = createFile(data, type)
    if (navigator.appVersion.toString().indexOf('.NET') > 0) { // ie无法下载
      window.navigator.msSaveBlob(file, download)
      return
    }
    el.href = URL.createObjectURL(file)
  } else {
    let paramStr = ''
    for (const k in param) {
      if (param[k] !== undefined &&
          param[k] !== null &&
          param[k] !== '') {
        paramStr += `&${k}=${param[k]}`
      }
    }
    paramStr = paramStr.substr(1)
    if (paramStr) paramStr = `?${paramStr}`
    if (/^(http:\/\/)|(https:\/\/)/g.test(url)) {
      el.href = `${url}${paramStr}`
    } else {
      el.href = `${getBaseURL}${url}${paramStr}`
    }
  }

  el.download = download
  el.click()
  document.body.removeChild(el)
}
