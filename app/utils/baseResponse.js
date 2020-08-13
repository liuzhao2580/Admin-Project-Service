/**
 * 用来处理返回数据的通用格式
 * @param {data}  查询出来的数据 
 * @param {errorMsg} 返回的错误信息
 * @param {code} 暂定所有的成功请求都是 0 所有的失败都是 100 +
 */
module.exports = (data, code, msg) => {
    let responseData = {}
    // 返回成功的数据
    if(code == 0) {
        responseData = {
            data,
            code
        }
    } 
    // 返回失败的数据
    else if(code == 100) {
        responseData = {
            code,
            msg
        }
    }
    return responseData
}
