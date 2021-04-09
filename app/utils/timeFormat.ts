const moment = require("moment")

module.exports = {
  // 获取当前的时间精确到分钟
  nowTimeMinutes() {
    return moment().format("YYYYMMDDHHmm")
  },
}
