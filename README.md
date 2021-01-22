1. 使用 `@ts-ignore: Unreachable code error` 可以移除 `TS`的告警
2. `TS`中`interface`的高级使用
 +  可以指定继承字段,使用`Pick`
```ts
interface IUser {
    userName: string
    password: string
    id: string
}
export interface IUserLoginParams extends Pick<IUser, "userName" | 'password'> {}
```