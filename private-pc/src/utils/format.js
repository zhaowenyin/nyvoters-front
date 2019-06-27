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
// 生日校验
export function checkBirth (val) {
  var pattern = /^(19|20)\d{2}-((0?[1-9])|(1[0-2]))-((0?[1-9])|([1-2]\d)|3[01])$/;
  if(pattern.test(val)) {
    console.log(13)
    var date = new Date(val);
    if(date > new Date()) {
      return false;
    }
    var month = val.substring(val.indexOf("-")+1,val.lastIndexOf("-"));
    return date && (date.getMonth()+1 === parseInt(month));
  }
  return false;
}

// 身份证校验
export function cardVali(id) {
  if(!id && (id !== '0' || id !== 0)){
    return {'status':5,'message':'身份证号码不能为空'}
  }
  // 1 "验证通过!", 0 //校验不通过
  var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  //号码规则校验
  if(!format.test(id)){
    // return {'status':2,'message':'身份证号码不合规'}
    return {'status':2,'message':'证件号有误请仔细核对'}
  }
  //区位码校验
  //出生年月日校验   前正则限制起始年份为1900;
  var year = id.substr(6,4),//身份证年
    month = id.substr(10,2),//身份证月
    date = id.substr(12,2)//身份证日
  if (!checkBirth(`${year}-${month}-${date}`)){
    // return {'status':3,'message':'出生日期不合规'}
    return {'status':2,'message':'证件号有误请仔细核对'}
  }
  //校验码判断
  var c = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2)  //系数
  var b = new Array('1','0','X','9','8','7','6','5','4','3','2')  //校验码对照表
  var id_array = id.split("")
  var sum = 0;
  for(var k=0;k<17;k++){
    sum+=parseInt(id_array[k])*parseInt(c[k])
  }
  if(id_array[17].toUpperCase() !== b[sum%11].toUpperCase()){
    // return {'status':4,'message':'身份证校验码不合规'}
    return {'status':2,'message':'证件号有误请仔细核对'}
  }
  return {'status':1,'message':'校验通过'}
}
