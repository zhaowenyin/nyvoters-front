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

export function formatDateTimeZn(timestamp) {
  const week = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  }
  const index = new Date(+timestamp).getDay()
  return timestamp && format(+timestamp, `YYYY年MM月DD日 HH:mm:ss ${week[index]}`)
}


// 随时生成id
export function createRandomId() {
  return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5)
}
