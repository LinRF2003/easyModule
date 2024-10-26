/** 时间戳转日期 2024-10-14 23:59:59 */
export const formatDate = (dataString) => {
  let time = new Date(dataString)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (day < 10 ? '0' + day : day) +
    ' ' +
    (hour < 10 ? '0' + hour : hour) +
    ':' +
    (minute < 10 ? '0' + minute : minute) +
    ':' +
    (second < 10 ? '0' + second : second)
  )
}
