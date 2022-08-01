---
title: TypeScript 快速入门
date: 2022-08-01 09:57:01
categories:
    - TypeScript
tags:
    - TypeScript
---

TypeScript 快速入门。

<!-- more -->

# 1. 快速入门

## 1.1 类型推断

TypeScript 可以推导出大多数场合下的原生类型，例如：

```ts
let helloWorld = 'Hello World'
```

`helloWorld` 变量是 `string` 类型的。

## 1.2 定义类型

`interface` 用于定义接口，接口用于描述对象的结构。接口表达了对象应该具有什么成员，而不定义对象，没有什么成员。

> Java 的接口用于抽象类的共同特征，而 TypeScript 的接口则直接修饰对象的共同特征。

```ts
interface User {
  name: string
  id: number
}
```

被这个接口描述的对象都具有和这个接口一致的结构，否则将在静态检查中报错。

要给变量标注类型，使用 TypeScript 类型注解的语法，`variable: type`：

```ts
const user: User = {
  name: 'Hayes',
  id: 0,
}
```

我们知道，对于 JS 创建对象有两种方式
1. 过程式创建，就像上面一样，使用 `{}` 包围键值对来创建
2. 面向对象编程，使用包含 `this` 的函数作为类创建器

对于 ES6+，`class` 语法糖可以代替上述面向对象的创建方式，这种方式的本质仍然是第二种方式。

我们先复习一下面向对象编程：

设函数为 `f`，由此函数 `new` 所创建的三个对象 `a1`、`a2`、`a3` 。

- `prototype` 是每个函数都拥有的属性，这个函数创建对象时将使用这个对象作为原型
- `__proto__` 和 `constructor` 是 `a1`、`a2`、`a3` 所拥有的属性
    - `__proto__` 指向对象的原型对象，原型对象通常和被 `new` 的对象结构一致
    - `constructor` 指向构造该对象的函数
- `a1.constructor === f`
- `a1.__proto__ === f.prototype`

所以，上面的写法也可以使用 `class` 来创建：

```ts
class UserAccount {
  name: string
  id: number

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}
 
const user: User = new UserAccount('Murphy', 1)
```

在 TypeScript 中，每一个类和函数的参数都需要声明成员或参数的类型。

如果需要声明返回值类型，可以：

```ts
function getAdminUser(): User {
  // ...
}
```

## 1.3 组合类型

在 TypeScript 中，类型可以通过组合产生新的类型。组合类型的产生方式：
- 通过常量（Literal）或内置（Built-in）类型产生
- 通过联合类型（Union）产生
- 通过交叉类型（Intersect）产生
- 通过元组类型（Tuple）产生
- 通过可空类型（Nullable）产产生
- 通过泛型（Generic）产生

如果需要将组合类型绑定到一个名字上，使用 `type` 关键字。

如果声明一个变量或者函数而不定义它，只用于语法检查和补全的情况下，使用 `declare` 。

常量也是类型：

```ts
type Hello = 'Hello'
```

联合类型使用 `|` 组合，表示可以是多个中的任意一个。

```ts
type LockStates = 'locked' | 'unlocked'
```

如果要满足两种以上的类型，可以使用 `&` 来交叉两种类型。交叉类型表示这个类型满足被交叉的所有类型。

```ts
type A = B & C
```

那么 `A` 同时具有 `B` 和 `C` 的结构。

元组类型描述一个集合对象的特征，例如 `[string, number]` 也是一种类型。元组类型还包含一种一个或多个的语法，使用 `...` 来表示可变参数（不定参数），例如：`[...args: number]`，这在函数中很常见。

可空类型在类型后面加上 `?`，表示 `t | undefined` 的含义。注意不是 `t | null` 。

泛型是类型的模板，通过泛型可以随时创建灵活的类型。

```ts
interface A<T> {
  x: number | T
  y: number
}

interface B<T = string> {
  x: number | T
  y: number
}

type A_string = A<string>
type B_string = B
```

注意，在类型后面加上 `[]`，例如 `string[]` 和 `Array<string>` 是等价的。这是数组的泛型，表示数组的成员类型。

其他技巧：

- 使用 `(a: string) => number` 这样的语法来定义一个函数类型
- `never` 类型是永远不会有值的类型，例如一定抛出错误的函数的返回值
- `any` 类型是任意类型，任意类型都可以看做 `any` 类型
- `unknown` 类型是限制性 `any` 类型，其赋值的对象只能是 `any` 或者 `unknown` 类型，而不能是已知的其他类型
- 条件类型
- 映射类型
- 索引类型
- 区分类型
- 枚举类型
- 象征类型
