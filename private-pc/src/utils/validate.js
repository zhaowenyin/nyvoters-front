// 对象是否为空
export function isEmptyObj (obj) {
  for (const name in obj) {
    return false
  }
  return true
}
// 只判断两个值对应相等，不包含引用
export function isEqual (a, b) {
  const classNameA = toString.call(a)
  const classNameB = toString.call(b)
  // 如果数据类型不相等，则返回false
  if (classNameA !== classNameB) {
    return false
  } else {
    // 如果数据类型相等，再根据不同数据类型分别判断
    if (classNameA === '[object Object]') {
      for (let key in a) {
        if (!isEqual(a[key], b[key])) return false
      }
      for (let key in b) {
        if (!isEqual(a[key], b[key])) return false
      }
      return true
    } else if (classNameA === '[object Array]') {
      if (a.length !== b.length) {
        return false
      } else {
        for (let i = 0, len = a.length; i < len; i++) {
          if (!isEqual(a[i], b[i])) return false
        }
        return true
      }
    } else if (classNameA === '[object Function]') {
      return a.toString() === b.toString()
    } else {
      return Object.is(a, b)
    }
  }
}

// 手机验证正则
export const phone_reg = /^1[345789]\d{9}$/


