// 响应的数据格式

/**
 * 不用返回数据的成功响应
 * @param {string} msg 响应的文字说明
 */
export const no_data_success = (msg = "请求成功") => {
  return { code: 0, data: [], msg }
}

/**
 * 不用返回数据的失败响应
 * @param {number} code 响应的状态码
 * @param {string} msg 响应的文字说明
 */
export const no_data_failed = (code = 100, msg = "请求失败") => {
  return { code, msg }
}

/**
 * 需要返回数据的成功响应
 * @param {any} data 返回的数据
 * @param {string} msg 响应的文字说明
 */
export const data_success = (data: any = [], msg = "请求成功") => {
  return { code: 0, data, msg }
}

/**
 * 需要返回数据的失败响应
 * @param {number} code 响应的状态码
 * @param {any} error 返回的数据
 * @param {string} msg 响应的文字说明
 */
export const data_failed = (code = 100, error = [], msg = "请求失败") => {
  return { code, error, msg, data: [] }
}

/** 返回的表格的数据 */
export const data_table_success = (
  data: any[] = [],
  pageNum: number,
  pageSize: number,
) => {
  const total = 0
  return {
    code: 0,
    data,
    pageNum,
    pageSize,
    total,
    msg: "请求成功",
  }
}
