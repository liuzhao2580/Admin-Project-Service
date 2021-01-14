/** 小工具合集 */
module.exports = {
    /** 1. 生成随机数
     * @param {number} min 最小数 默认 0
     * @param {number} max 最大数 默认 100
     * @param {number} time 需要的数据是几个 默认 1 个数据
     */
    getMathRandom(min = 0, max = 100, time = 1) {
        // 返回的数据
        let returnData = []
        // 获取随机数的方法
        function mathRandom() {
            const getData = Math.floor(Math.random() * (max-min) + min)
            returnData.push(getData)
        }
        // 设置循环的初始值
        let whileTime = 0
        // 满足条件才跳出循环
        while (whileTime < time) {
            mathRandom()
            whileTime++
        }
        return returnData
    }
}
