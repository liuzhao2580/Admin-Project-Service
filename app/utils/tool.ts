import { v1 as uuidv1 } from "uuid"
/** 小工具合集 */

/** 1. 生成随机数
 * @param {number} min 最小数 默认 0
 * @param {number} max 最大数 默认 100
 * @param {number} time 需要的数据是几个 默认 1 个数据
 */
export const getMathRandom = (min = 0, max = 100, time = 1) => {
  // 返回的数据
  const returnData: any[] = []
  // 获取随机数的方法
  function mathRandom() {
    const getData = Math.floor(Math.random() * (max - min) + min)
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
/** 2.生成 UUID */
export const createUUID = () => {
  const getUUID = uuidv1().replace(/-/g, "")
  return getUUID
}
