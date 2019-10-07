const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  // yyyy/mm/dd
  return [year, month, day].map(formatNumber).join('/')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return year + "年 " + month + "月"
}


const getFirstDay = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = 1

  return [year, month, day].map(formatNumber).join('/')
}

const getLastDay = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 2
  const day = 0

  return [year, month, day].map(formatNumber).join('/')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getFirstDay: getFirstDay,
  getLastDay: getLastDay
}
