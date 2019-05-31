// 数据格式化
import format from 'date-fns/format'

export function formatDateTime (timestamp) {
  return timestamp && format(+timestamp, 'YYYY-MM-DD HH:mm:ss')
}

export function formatDateMinute (timestamp) {
  return timestamp && format(+timestamp, 'YYYY-MM-DD HH:mm')
}

export function formatDate (timestamp) {
  return timestamp && format(+timestamp, 'YYYY-MM-DD')
}

// 图片转base64
export async function getImgBase64(url){
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' //使用跨域图像
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0, img.width, img.height)
      const dataURL = canvas.toDataURL("image/png")
      resolve(dataURL)
    }
    img.onerror = (error) => {
      reject(error)
    }
    img.src = url
  })

}
export function resolveBug(){
  if(document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA'){
    return
  }
  let result = 'pc';
  if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS
    result = 'ios'
  }else if(/(Android)/i.test(navigator.userAgent)) {  // 判断Android
    result = 'android'
  }
  if(result === 'ios' ){
    document.activeElement.scrollIntoViewIfNeeded(true);
  }
}
