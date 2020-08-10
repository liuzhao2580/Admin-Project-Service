/**
 * 用来处理返回数据的通用格式
 * @param {data}  查询出来的数据 
 * @param {errorMsg} 返回的错误信息
 * @param {code} 暂定所有的成功请求都是 0 所有的失败都是 100
 */
module.exports = (data, errorMsg) => {
    let responseData = {}
    if (data.length > 0) {
        responseData = {
            data,
            code: 0
        }
    } else {
        responseData = {
            code: 100,
            msg: errorMsg
        }
    }
    return responseData
}
