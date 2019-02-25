// 数据格式化
import format from 'date-fns/format'

export function formatDateTime (timestamp) {
  return +timestamp && format(+timestamp, 'YYYY-MM-DD HH:mm:ss')
}

export function formatDateMinute (timestamp) {
  return +timestamp && format(+timestamp, 'YYYY-MM-DD HH:mm')
}

export function formatDate (timestamp) {
  return +timestamp && format(+timestamp, 'YYYY-MM-DD')
}

// 钱的转换
export function formatMoney (number = 0) {
  return (+number / 100).toFixed(2)
}

// 随时生成id
export function createRandomId() {
  return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5)
}
