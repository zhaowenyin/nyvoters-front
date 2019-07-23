
export default function func (list) {
  let item = {}
  const re = (array) => {
    if (!array || array.length === 0) return false
    for (let i = 0; i < array.length; i++) {
      if (array[i].access) {
        item = array[i]
        return true
      }
      const bol = re(array[i].children)
      if (bol) return true
    }
    return false
  }
  re(list, [])
  return item
}

