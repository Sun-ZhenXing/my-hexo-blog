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
const helloWorld = 'Hello World'
```

`helloWorld` 变量是 `string` 类型的。

TypeScript 能通过上下文得知变量类型的能力，例如：

```ts
declare const a: any

if (typeof a === 'number') {
  // 此时 IDE 知道 a 的类型是 number
  console.log(a.toFixed())
}
```

```ts
declare const a: number | undefined

if (a !== undefined) {
  // 此时 a 也是 number 类型
  console.log(a.toFixed())
}
```

## 1.2 定义类型

`interface` 用于定义接口，接口用于描述对象的结构。接口表达了对象应该具有什么成员，而不定义对象不包含什么成员。

> Java 的接口用于抽象类的共同特征，而 TypeScript 的接口则直接修饰对象的共同特征。

```ts
interface User {
  name: string
  id: number
}
```

被这个接口描述的对象都具有和这个接口所有的成员，否则将在静态检查中报错。这一点上，TypeScript 接近于 **鸭子类型**（Duck Type）编程。

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

- 通过联合类型（Union）产生
- 通过交叉类型（Intersect）产生
- 通过元组类型（Tuple）产生
- 通过可空类型（Nullable）产生
- 通过泛型（Generic）产生

常量（Literal）、内置（Built-in）类型或用户定义类型通过上述方式组合可以产生更多新的类型。

如果需要将组合类型绑定到一个名字上，使用 `type` 关键字。`type` 的行为和 `interface` 有点相似，但是接口和类型是两种不同的对象。

如果声明一个变量或者函数而不定义它，只用于语法检查和补全的情况下，使用 `declare` 。

### 1.3.1 常量类型

常量也是类型：

```ts
type Hello = 'Hello'
type Point = { x: 0, y: 0 }
```

一个变量如果被常量类型修饰，那么它必须（在形式上）严格等于这个常量。

### 1.3.2 联合类型

联合类型使用 `|` 组合，表示可以是多个中的任意一个。

```ts
type LockStates = 'locked' | 'unlocked'
```

### 1.3.3 交叉类型

如果要满足两种以上的类型，可以使用 `&` 来交叉两种类型。交叉类型表示这个类型满足被交叉的所有类型。

```ts
type A = B & C
```

那么 `A` 同时具有 `B` 和 `C` 的结构。

例如：

```ts
type A = 1 | 2 | 3
type B = 1 | 3 | 4
type C = A & B
```

此时 `C` 的类型为 `1 | 3`，因为 `1 | 3` 同时满足 `A` 和 `B` 。

但是 `interface` 的行为就有点不同了：

```ts
interface I1 {
  x: number
}

interface I2 {
  y: number
}

type I3 = I1 & I2

const a: I3 = {
  x: 1,
  y: 2
}
```

为了同时满足 `I1` 和 `I2`，`I3` 必须同时具有这两个接口的所有属性。

### 1.3.4 元组类型

元组类型描述一个集合对象的特征，例如 `[string, number]` 也是一种类型。元组类型还包含一种一个或多个的语法，使用 `...` 来表示可变参数（不定参数），例如：`[...args: number]`，这在函数中很常见。

### 1.3.5 可空类型

可空类型在类型后面加上 `?`，表示 `t | undefined` 的含义，注意不是 `t | null` 。

```ts
interface A {
  a: number
  b?: string
}
```

`b` 的类型是 `t | undefined` 。可空类型的设计和 C# 的可空类型（`Nullable` 类型）类似，原因是 TypeScript 的作者就是 C# 的作者，这使得两种语言的设计异常巧妙地吻合。

### 1.3.6 泛型

泛型编程是普遍的程序设计模式。泛型是类型的模板（也就是泛化的类型，一个类型可以表示很多类型），通过泛型可以随时创建灵活的类型。同样， TypeScript 的泛型和 C# 的泛型类似。

泛型通常可以理解为一个类型模板，即新的类型是通过这个模板复制出来的（实际上的行为和语言有关），`<>` 的内容为模板的参数，给定参数即产出一个新的类型。

在 TypeScript 中，参数可以有默认值，这意味着 `<>` 也不是必须的。

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

一些例子：

- `number[]` 数字型的数组
- `(number | string)[]` 数字或字符串数组
- `(a: string, ...args: number) => string` 以一个字符串和多个数字为参数的函数，返回字符串
- `Promise<{ data: User[], message: string }>` 一个 `Promise` 对象
- `A<B<string>>` 嵌套的泛型类型

其他定义：

- `never` 类型是永远不会有值的类型，例如一定抛出错误的函数的返回值
- `any` 类型是任意类型，任意类型都可以看做 `any` 类型
- `unknown` 类型是限制性 `any` 类型，其赋值的对象只能是 `any` 或者 `unknown` 类型，而不能是已知的其他类型

## 1.4 高级特征

- 条件类型
- 映射类型
- 索引类型
- 区分类型
- 枚举类型
- 象征类型

这些类型在本文不会详细讨论，我们只会举例一些情况来说明。

### 1.4.1 `as` 用法

`as` 总是将指定对象视为另一种类型的对象，并且这两种类型是可转换的。如果明显不能转换的类型将报错。

哪些类型可以转换？

- 可空类型和对应的原类型
- `a | null` 转换为 `a`
- `any` 的其他任意类型
- `unknown` 和其他任意类型
- ……

如果明显不能转换的类型，需要强制转换时，可以借助 `any` 。

```ts
// 将 a 视为 string
const a = (3 as any) as string
```

例如：

```ts
const canvas = document.getElementById('canvas')
// canvas: HTMLElement | null
```
```ts
const canvas2 = document.getElementById('canvas') as HTMLCanvasElement
// canvas: HTMLCanvasElement
```
```ts
const ctx = canvas.getContext('2d')
// ctx: CanvasRenderingContext2D | null
```
```ts
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
// ctx: CanvasRenderingContext2D
```
