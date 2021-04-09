import { Context } from "egg"

export default {
  // 使用例子
  examples(this: Context) {
    return this.app.config.jwt.secret
  },
}
