---
title: C++ 学习笔记（上）
date: 2022-06-07 11:34:47
categories:
  - [C++, C++ 学习]
tags:
  - C++
  - 汇编
---

本文是 C++ 学习笔记，结合 C++11 底层和特征讲解，并包含实战。全课程一共 16 章，这里记录 1~8 章的内容。

<!-- more -->

> 该课程的讲师是 [小码哥：李明杰老师](https://ke.qq.com/teacher/199109106)，该课程在腾讯课堂上可以找到[*30 小时快速精通 C++ 和游戏辅助实战*](https://ke.qq.com/course/336509)（付费 ￥666）。

我保存了课程所需的资料，你需要的时候可以 [发送邮件](mailto:sun-zhenxing@foxmail.com) 给我。

资料包含：
- 代码
- 课件（PDF）
- 部分程序（反汇编工具等）
- 待破解的程序、游戏

# 1. 前言

<div class="note note-warning">

**【警告】** 此课程需要 C 语言的基础知识

</div>

## 1.1 讲解内容

- 常用语法
    - C++ 常用语法
    - 反汇编窥探底层
- 面向对象
    - 多态 / 虚函数是如何实现的
    - 内存布局是怎样的
- 项目实战
    - `Windows` 编程
        - `Windows API`
        - `MFC`
    - x86 编程
    - 软件破解
        - 外挂制作

通过反汇编掌握底层原理，对于了解其他语言至关重要。

## 1.2 永不过时的语言

应用领域：
- 游戏、图像、多媒体、网络、嵌入式
- 数据库、浏览器、搜索引擎
- 操作系统、驱动程序、编译器、编程语言
- 高性能计算（HPC）
- iOS 开发
- Android 开发
- Java 开发

> C++ 是进阶必备。

汇编 -> C -> C++ -> Java -> C# -> PHP

1. 是底层技术和永不过时的技术
2. 但是每一种语言都有自己的优缺点
3. 新的编程语言趋向于更加简洁、增加开发效率
4. 为了适应不同的应用场景，新的编程语言就诞生了

# 2. 利用汇编挖掘编程语言本质

## 2.1 错误示范

1. 接触的第一门语言？
    - JavaScript
2. 用过哪些编程语言？
    - JavaScript，C/C++，Python，Java，……
3. 是否思考过代码背后的原理？
    - 以前有，但是想不出来
4. 是否接触过汇编语言？
    - 没有
5. 学习编程语言/技术的方式？
    - 学习文档，然后直接用

- 中文资料的巨大缺点
    - 不专业
    - 错误多
- 掌握验证知识点的方法
    - 解决困惑
    - 快速进阶

国内技术氛围：
1. 非专业 / 非本科班出身
2. 抄袭严重
3. 过于势利，不是很纯粹

## 2.2 学习建议

- 首选官方资料
- 英文资料 > 中文资料
- 掌握验证知识正确性的方法
    - 如果是编程语言的相关语言，掌握汇编语言是靠谱的方式
- 掌握汇编的好处
    - 掌握本质
    - 破解
    - 外挂

对本质的理解，例如：
- `sizeof()` 的本质
- `a++` 与 `++a` 的区别
- `if-else` 与 `switch` 谁的效率高
- 程序的内存布局
- 多态的实现原理

`sizeof` 的本质是编译器行为：

```c++
#include <iostream>
using namespace std;

int main() {
    cout << sizeof(int) << endl;
    getchar();
    return 0;
}
```

中 `sizeof(int)` 是编译器直接替换为 `4`（在 Windows x86 下）

## 2.3 程序的本质

- 程序的执行过程
- 程序从硬盘装载到内存
- CPU 读写 内存
- CPU 控制 设备 (显示器 / 话筒 / ...)

CPU 读写原理：寄存器与内存。

举例：

```c++
int a = 3;
int b = a + 1;
```

示例过程：

```x86asm
mov eax, [a]
add eax, 1
mov [b], eax
```

使用 Visual Studio 反汇编：

```x86asm
mov eax, dword ptr [a]
add eax, 1
mov dword ptr [b], eax
```

如何查看反汇编？
1. 设置断点
2. 调试运行
3. 右键，转到反汇编

## 2.4 编程语言的发展

编译器：编译前端 | 编译后端

- 高级语言
- 汇编语言
- 机器语言

## 2.5 编程语言的本质区别

- C++
    - 轻易地反汇编
- JavaScript
    - 脚本语言
    - 由浏览器去解析

```js
console.log('Hello World!');
```

PHP
- 脚本语言
- 由 `Zend Engine (ZE)` 去解析

```php
<?php
    echo "Hello World!";
?>
```

Java
- `JVM` 去装载字节码
- 编译为 `class` 字节码

涵盖了 3 类语言：
- 编译型语言
- 脚本语言
- 虚拟机语言

# 3. 基础语法 A

## 3.1 开发环境的搭建

- C++ 语法阶段
    - Mac: Xcode
    - Windows: Visual Studio
- 项目实战
    - Windows: Visual Studio

> VS 的常用调试快捷键：
> - `F9` 切换断点
> - `Ctrl + F5` 开始执行（不调试）
> - `F5` 开始调试、继续
> - `Shift + F5` 停止调试
> - `Ctrl + Shift + F5` 重启调试
> - `F10` 单步执行，跳过子函数 (step over)
> - `F11` 单步执行，含子函数 (step into)
> - `Shift + F11` 在子函数内跳过 (step out)
> - `Ctrl + J` 语法提示
> - `Tab` 选择和使用智能提示内容
> VS 的常用组合快捷键：
> - `Ctrl + M, M` 折叠或展开当前方法
> - `Ctrl + M, O` 折叠所有方法
> - `Ctrl + M, L` 展开所有方法

## 3.2 `cin`、`cout`

- C++ 文件 `.cpp`，`.cc`
- 程序入口 `main()` 函数
- C++ 兼容 C 的语法，C with classes
- C++ 的标准化
    - C++98
    - C++03(bug fixed)
    - C++11
    - C++14
    - C++17
    - C++20

在控制台输入，输出，`cin`、`cout` 。

- C++ 头文件不必要写 `.h`，几乎只有标准库没有写 `.h`
- `cin`、`cout` 进行了运算符重载

## 3.3 函数重载 1

- C 语言不支持函数重载
- C++ 支持函数重载

函数名相同，但参数不同的函数构成重载：

```c++
int sum(int v1, int v2);
int sum(int v1, int v2, int v3);
```

函数名相同，但参数类型不同的函数也构成重载：

```c++
int sum(int v1, double v2);
int sum(double v1, int v2);
```

注意：返回值类型与重载无关。

```c++
// 这是不允许的
double sum(double v1, int v2);
int sum(double v1, int v2);
```

实参的隐式转换也可能产生重载的二义性：

```c++
int sum(double v1);
int sum(long v1);
// 这个也是错误的，不允许
int main() {
    sum(10);
}
```

## 3.4 函数重载 2 `name mangling`

- C++ 为什么支持函数重载？
- 因为 C++ 编译底层采取了 `name mangling` 技术
- 可以使用反汇编了解底层

## 3.5 函数重载 3 利用 IDA 分析 `.exe`

- `Debug` 模式，包含很多调试信息
- `Release` 模式，去除调试信息，进行了优化
- `IDA` 可以直接看到函数名称、参数、汇编指令
- 不同的编译器有不同的行为（`MSVC`、`g++`）

## 3.6 默认参数

- C++ 支持默认参数
- 有了默认参数可以忽略实参

```c++
int sum(int v1, int v2 = 5) {
    return v1 + v2;
}
```

- 默认参数只能放在非默认参数右边
- 函数如果同时有声明和实现，默认参数只能放在 **声明** 中
- 默认参数可以是 **常量** 或 **全局变量**
- `MSVC` 自动为 `main()` 函数加入 `return 0;`

提示：函数指针的用法：

```c++
#include <iostream>
using namespace std;

void test(int a) {
    cout << "test(int) - " << a << endl;
}

int main() {
    void(*p)(int) = test;
    p(10);
}
```

更复杂的例子：

```c++
#include <iostream>
using namespace std;

void test(int a) {
    cout << "test(int) - " << a << endl;
}

int func(int v1, void(*p)(int) = test) {
    p(v1);
}

int main() {
    // 也就是说，
    // 函数的默认参数也可以是函数类型，可以是已经声明过的常量
    func(20, test);
}
```

- 什么时候用默认参数？
- 函数的实参经常是同一个值考虑默认参数

那么，默认参数的本质是什么？

默认参数的情况：

```c++
int sum(int v1, int v2 = 4) {
    return v1 + v2;
}
// 1. 尝试调用 sum(1, 2)
// 2. 尝试调用 sum(1)
```

1.  汇编代码：  
    ```x86asm
    push 2
    push 1
    call sum
    add esp, 8
    ```
2.  汇编代码：  
    ```x86asm
    push 4
    push 1
    call sum
    add esp, 8
    ```

也就是说，`sum(1)` 与 `sum(1, 4)` 编译后完全一致，为机器码 `E8 (call)` 。

## 3.7 `extern "C"` 1 作用

被 `extern "C"` 修饰的代码会按照 C 语言的方式编译。

```c++
extern "C" void func_1(int v) {
}
extern "C" {
    void func_2() {
    }
}
```

如果函数同时有声明和实现，那么必须修饰声明，实现修饰可选。

## 3.8 `extern "C"` 2 C、C++ 混合开发

C++ 不可以直接去调用 C 函数，例如下面这两个函数是 C 语言实现的：

```c
// two_func.c
int sum(int v1, int v2) {
    return v1 + v2;
}
int max(int v1, int v2) {
    return (v1 > v2)? v1 : v2;
}
```

接下来在 C++ 中直接调用会出错：

```c++
// main.cpp
// 声明部分
int sum(int v1, int v2);
int max(int v1, int v2);
```

改为：

```c++
extern "C" {
    int sum(int v1, int v2);
    int max(int v1, int v2);
}
```

## 3.9 `extern "C"` 3 `__cplusplus`

头文件进行声明很重要，可用简化操作，例如，下面有一个 C++ 文件：

```c++
#include "mymath.h"
int main() {
    // ...
}
```

在头文件这样声明：

```h
// 如果是 C++ 则执行，C 不执行
#ifdef __cplusplus
extern "C" {
#endif
int sum(int v1, int v2);
int max(int v1, int v2);
#ifdef __cplusplus
}
#endif
```

在自己的函数中也要包含自己的头文件，这样可以保证自己的函数可以相互调用。

这样，我们的头文件既可以在 C 下引用，也可以在 C++ 中调用。

## 3.10 `extern "C"` 4 `#ifndef`、`#define`、`#endif`

防止头文件被重复包含：

```c++
#ifndef __MYMATH_H
#define __MYMATH_H
// 内容开始
#ifdef __cplusplus
extern "C" {
#endif
int sum(int v1, int v2);
int max(int v1, int v2);
#ifdef __cplusplus
}
#endif
// 内容结束
#endif
```

# 4. 基础语法 B

## 4.1 `extern "C"` 5 `#pragma once`

- 我们经常使用 `#ifndef`、`#define`、`#endif` 来防止重复包含
- `#pragma once` 也可以防止被重复包含
- 这是一个编译器特性，`MSVC` 支持这一点
- 一些旧版本的编译器不支持这一点

但是又一些区别：

- `#pragma once` 只能防止整个头文件被重复包含
- 但是 `#ifndef` 可以防止任意一个部分

## 4.2 内联函数 1

使用 `inline` 修饰的函数声明或者实现，可以使函数变为内联函数：

```c++
inline void func() {
    cout << "func()" << endl;
}
```

建议声明和实现都写：
- 内联的含义是 **函数调用展开为函数体的代码**
- 函数调用是有代价的，内联可以优化速度

那么声明时候使用？
1. 函数代码体积不是很大
2. 频繁调用

内联不是一定的：
- 是否内联是由编译器决定的
- 写了内联不一定内联，不写也不一定不内联
- 例如，**递归函数** 是不会被内联的

## 4.3 内联函数 2 本质

VS 需要设置优化选项才可以看到，VS 设置禁止优化步骤如下：
1. 属性
2. C/C++
3. 优化 (禁用)
4. 内联 (适用任何项)

查看反汇编代码，可以看到区别：

```x86asm
mov eax, 0ah
add eax, 14h
mov dword ptr [c], eax
```

也可以通过 IDA 反编译可执行文件，可以看到函数列表的区别。

## 4.4 内联函数 3 宏

内联函数和宏，都可以减少函数调用开销：

```c++
// 宏代码
#define add(v1, v2) v1 + v2
// 内联函数
inline int sum(int v1, int v2) {
    return v1 + v2;
}
```

- 内联函数有函数特性
- 语法提示全面
- 宏是简单的文本替换

思考以下代码：

```c++
#define sum(x) x + x
inline int sum(int x) {
    return x + x;
}
// 执行下面代码，结果一样吗
int a = 10;
sum(a++);
```

表达式被赋值：

```c++
(a = b) = 4;
// 相当于
a = b;
a = 4;
```

例子 2：

```c++
(a > b ? a : b) = 4;
// 相当于
if(a > b)
    a = 4;
else
    b = 4;
```

赋值给表达式是 C++ 的一个特性，C 语言不允许。

## 4.5 `const`

- `const` 声明一个常量

```c++
int main() {
    const int age = 10;
}
```

- 如果修饰一个类或结构体的实例，那么它的成员不可以更改
- 修饰一个指针时，不能通过指针修改成员变量

下面的 5 个指针什么意思：
```c++
int age = 10;
const int *p1 = &age;
int const *p2 = &age;
int * const p3 = &age;
const int * const p4 = &age;
int const * const p5 = &age;
```
- `const` 修饰的是他右边的内容
- 变量类型与 `const` 是可以交换的，没有区别
```c++
int age = 10;
// p1 不是常量，*p2 是常量
const int *p1 = &age;
// 与 p1 含义一致
int const *p2 = &age;
// p3 是常量，*p3 不是常量
int * const p3 = &age;
// p4 是常量 *p4 是常量
const int * const p4 = &age;
// 与 p4 含义一致
int const * const p5 = &age;
```

举个例子，你可以把代码复制到 VS 或 VS Code：

```c++
struct Student {
    int age;
};
int main() {
    Student stu1 = { 10 };
    Student stu2 = { 20 };
    const Student *p1 = &stu1;
    *p1 = stu2;     // 错误
    (*p1).age = 30; // 错误
    p1->age = 30;   // 错误
    p1 = &stu2;

    Student *const p2 = &stu2;
    *p2 = stu1;
    (*p2).age = 30;
    p2->age = 30;
    p2 = &stu1; // 错误
}
```

- 不可以通过 `const *p` 指针去直接或间接修改所指向的空间
- 但是指针变量是 `const` ，指针不是时，可以修改

## 4.6 引用 1

**引用**（Reference）的本质是指针，C 语言通常用指针访问变量：

```c++
int age = 10;
int &refAge = age;
refAge = 20;
```

- 引用相当于变量的别名
- 对引用计算，相当于对引用指向的变量计算
- 引用不可以改变，在定义时初始化
- 可以使用引用初始化另一个引用
- 引用的价值：比指针更安全，函数的返回值可以被赋值

指针型交换变量值：

```c++
void swap_pointer(int *v1, int *v2) {
    int temp = *v1;
    *v1 = *v2;
    *v2 = temp;
}
int main() {
    int a = 10, b = 20;
    swap_pointer(&v1, &v2);
}
```

引用型交换变量值：

```c++
void swap_ref(int &v1, int &v2) {
    int temp = v1;
    v1 = v2;
    v2 = temp;
}
int main() {
    int a = 10, b = 20;
    swap_ref(v1, v2);
}
```

- 引用必须在创建时赋值
- 不存在：引用的引用、指向引用的指针、引用数组
- 基本数据类型、枚举、结构体、类、指针、数组等，都可以有引用

## 4.7 引用 2

引用的本质是指针，是弱化的指针，那么如何看本质？

```c++
int age = 10;
int *p = &age;
int &ref = age;
cout << sizeof(age) << endl;
cout << sizeof(p) << endl;
```

反汇编看汇编指令是一致的，数组的引用：

```c++
int array[] = {1, 2, 3};
int (&ref1)[3] = array;
int * const &ref2 = array;
```

## 4.8 汇编 1 x86_x64 汇编

[讲师李明杰](https://ke.qq.com/teacher/199109106) 推荐的其他相关课程，如果想学习汇编关注：
- [*利用汇编挖掘编程语言本质*](https://ke.qq.com/course/348781)（免费，推荐）
- iOS 底层原理：上、下（付费 ￥3000+）

汇编语言种类：
- `8086` 汇编 (16bit)
- `x86` 汇编  (32bit)
- `x64` 汇编  (64bit)

x64 汇编有两种汇编格式：
- `Intel`
- `AT & T`

汇编语言特点：不区分大小写。

汇编代码规则：
- 在 `AT&T` 的 `jmp` 地址前面要加星号 `*`
- `Intel` 的寄存器名称不带 `%`
- 两种格式操作数顺序不同
- `AT&T` 的立即数要加上 `$`
- 下面我们用 `Intel` 汇编指令

学习汇编的两大知识点：
- 汇编指令
- 寄存器

寄存器：
-  通用寄存器 `(32bit)`  
    ```x86asm
    rax, rbx, rcx, rdx
    ```
-  通用寄存器 `(64bit)`  
    ```x86asm
    eax, ebx, ecx, edx
    ```

寄存器长度区分，一般的规律
- `R` 开头的寄存器是 `64bit` 的，占 8 字节
- `E` 开头的寄存器是 `32bit` 的，占 4 字节

寄存器长度示例：

```text
|63-32|31-16|15-8 | 7-0 |
            | AH. | AL. |
            | AX.       |
      | EAX.            |
| RAX.                  |
```

## 4.9 汇编 2 内联汇编

C++ 内可以使用汇编：

```c++
int main() {
    int a = 10;
    __asm {
        mov eax, a
    }
}
```

```x86asm
; x64 asm
mov eax, 10
mov rax, 1122334455667788H
```

## 4.10 汇编 3 `mov` 指令

-  `mov` 语法  
    ```x86asm
    mov dest, src
    ```
-  `[...]` 里面是地址值

举例：

```x86asm
; 将立即数 3 存入指定内存
mov dword ptr [ebp-8], 3
; 从指定地址读数据到寄存器
mov eax, dword ptr [1128H]
```

# 5. 基础语法 C

## 5.1 汇编 4 `call` 指令

-  `call` 语法  
    ```x86asm
    call addr
    ```
-  调用一个函数，`addr` 指代的地址并不是函数的地址
-  CPU 大小端模式，常用小端

## 5.2 汇编 5 其他常见指令

```x86asm
; 将地址值赋值给 dest
lea dest, [addr]
; 函数返回
ret
; 异或，相当于 op1 = op1 ^ op2
xor op1, op2
; 加法 op1 += op2
add op1, op2
; op1 -= op2
sub op1, op2
; op++
inc op
; op--
dec op
; 跳转，无条件
jmp addr
```

- `j` 开头的一般是跳转
- `jne` 等含义解释如下

```c++
int a = 10;
int b = 20;
if (a == b) {
    printf("eq");
} else {
    printf("neq");
}
```

```x86asm
; int a = 10;
mov         dword ptr [ebp-8], 0Ah
; int b = 20;
mov         dword ptr [ebp-14h], 14h
; if (a == b) {
mov         eax, dword ptr [ebp-8]
cmp         eax, dword ptr [ebp-14h]
jne         005A188A
; printf("eq");
push        5A7B30h
call        005A10CD
add         esp, 4
; } else {
jmp         005A1897
; printf("neq");
push        5A7B34h
call        005A10CD
add         esp, 4
; }
```

## 5.3 汇编 6 Intel 白皮书

如何学习汇编？
1. 从参考书中查找
2. 从 Intel 参考手册里查找
3. [Intel 白皮书](https://software.intel.com/en-us/articles/intel-sdm)

## 5.4 汇编 7 `JCC`

部分条件跳转指令：
- `je`、`jz`    相等的时候跳转
- `jne`、`jnz`  不相等的时候跳转
- `js`          结果为负跳转
- `jns`         结果非负跳转

## 5.5 汇编 8 反汇编分析

`mov` 不支持从内存到内存的操作。

## 5.6 引用 3 反汇编分析

- C++ 如何使用指针赋值变量？
- 反汇编分析如下

```c++
int age = 3;
int *p = &age;
*p = 5;
```

```x86asm
mov dword ptr [ebp-0ch], 3
lea eax, [ebp-0ch]
mov dword ptr [ebp-18h], eax
mov eax, dword ptr [ebp-18h]
mov dword ptr [eax], 5
```

## 5.7 引用 4 注意点

结构体的引用：

```c++
struct Date {
    int yaer;
    int month;
    int day;
};
Date d = {2011, 1, 5};
Date &ref = d;
```

指针的引用：

```c++
int age = 10;
int *p = &age;
int *&ref = p;
*ref = 30;
```

数组的引用：

```c++
int array[] = {1, 2, 3};
int (&ref)[3] = array;
```

补充：

```c++
// 指针数组
int *arr1[3];
// 指向数组的指针
int (*arr)[3];
```

## 5.8 引用 5 `const` 引用

常引用有什么意义？

```c++
int age = 10;
const int *p = &age;
const int &ref = age;
```

可以读取但不能修改。

下面的语句什么意思？

```c++
int age = 10;
int & const ref = age;
ref = 30;
```

## 5.9 引用 6 `const` 引用的特点

**常引用**（Const Reference）

- 引用可以被 `const` 修饰，这样就无法通过引用修改数据了
- `const` 必须写在 & 符号的左边，才能算是常引用
- 可以指向临时数据（常量、表达式、函数返回值等）
- 可以指向不同类型的数据
- 作为函数参数时（此规则也适用于 `const` 指针）
- 可以接受 `const` 和非 `const` 实参
- 非 `const` 引用，只能接受非 `const` 实参
- 可以跟非 `const` 引用构成重载

注意：当常引用指向了不同类型的数据时，会产生临时变量，即引用指向的并不是初始化时的那个变量（可以反汇编查看）

## 5.10 引用 7 `mov` 指令补充、数组的引用

- 引用数组的方式，为什么可以这样写？

```c++
int * const &ref2 = array;
```
- 因为只有常引用才能引用一个常量

# 6. 面向对象 A

## 6.1 面向对象 1 类和对象

面向对象的内容

- 类
- 对象
- 成员变量，成员函数
- 封装、继承、多态……

```c++
class Person {
public:
    int age;
    void run() {
        cout << "Person::run() - Age=" << age << endl;
    }
};
int main() {
    // 创建对象方法 1
    Person person;
    // 创建对象方法 2
    Perosn *person = new Person();
}
```

- C++ 的 `struct` 就是创建类
- `struct` 默认成员权限是 `pubilc`
- `class` 默认成员权限是 `private`

我们先观察内存布局：

```c++
struct Person {
    int age;
    void run() {
        cout << "Person::run()" << endl;
    }
};
int main() {
    Person person;
    Person *p = &person;
    /*
    x64 运行环境
    函数栈顶
    -------------
    | 4B        |
    -------------
    | 8B        |
    -------------
    */
}
```

- 函数是不占用栈空间的
- 一个类只会保存一份成员函数、但是每个对象都都自己的成员变量

## 6.2 面向对象 2 对象的内存

既然每次运行的时候运行的成员函数是同一个，那么应该如何处理成员变量？

| 程序空间 | 存放数据             |
| -------- | -------------------- |
| 栈空间   | 自动创建和回收的空间 |
| 堆空间   | 手动申请和释放的空间 |
| 代码区   | 执行代码的区域       |
| 全局区   | 用于存放全局变量等   |

-  普通函数 `call addr`
-  成员函数  
    ```x86asm
    lea ecx, [ebp-0ch]
    call addr
    ```
-  这会把对象的指针传给寄存器

## 6.3 面向对象 3 `this`

举例一个函数：

```c++
Person::run() {
    this->age = 3;
}
```

会被编译为

```x86asm
; ecx 是 person 所在的地址，放入 this 指针
mov dword ptr [ebp-8], ecx
; this 指针放到 eax 中
mov eax, dword ptr [ebp-8]
; 3 复制到 eax 所指的地址
mov dword ptr [eax], 3
```

## 6.4 面向对象 4 指针访问的本质

如果类中有多个成员变量，对象的内存又是如何布局的？

```c++
struct Person {
    int id;
    int age;
    int height;
    void display() {
        cout << "id=" << id << endl;
        cout << "age=" << age << endl;
        cout << "height=" << height << endl;
    }
};
```

- 读取、修改成员变量的地址值原理
- 从指针取出对象的地址
- 利用对象的地址 + 成员变量的偏移量计算出成员变量的地址

## 6.5 面向对象 5 指针的思考题

思考下面代码打印出的值：

```c++
int main() {
    Person person;
    person.id = 10;
    person.age = 20;
    person.height = 30;

    Person *p = (Person *) &person.age;
    p->id = 40;
    p->age = 50;
    person.display();
}
```

- 打印出的结果是  
    ```c++
    id=10
    age=40
    height=50
    ```
- 如果用 `p->display()` 会怎么样？
    ```c++
    // 将 person 的地址传给函数
    person.display();
    // 将 p 的地址传给函数
    p->display();
    ```

这两个调用区别如下

| index              | id          | age         | height       |
| ------------------ | ----------- | ----------- | ------------ |
| `person.display()` | `[eax]`     | `[eax + 4]` | `[eax + 8]`  |
| `p->display()`     | `[eax + 4]` | `[eax + 8]` | `[eax + 12]` |

## 6.6 面向对象 6 `0xCC`

- 上面的 `[eax + 12]` 通常为 `0xcc`
- 新的栈空间会被 `0xcc` 填充

```x86asm
;断点指令 0xcc
int3
```

## 6.7 内存 1 封装、内存布局、堆空间

- 封装是什么？
- 成员变量私有化，并设置 `get` 方法和 `set` 方法

```c++
class Person {
private:
    int m_age;
public:
    void setAge(int age) {
        if (age <= 0)
            m_age = 1;
        else
            m_age = age;
    }
    int getAge() {
        return m_age;
    }
};
int main() {
    Person person;
    person.setAge(10);
    cout << person.getAge() << endl;
}
```

程序的内存布局：

![](https://pic.imgdb.cn/item/629f08cb09475431299a4c53.jpg)

- 为什么需要堆空间？
- 因为这样程序可以自由地控制内存的生命周期、大小

## 6.8 内存 2 `malloc`、`free`

- 申请空间的方式？
- `malloc / free`
- `new / delete`

```c++
Person *p = (Person *)malloc(10 * sizeof(Person));
// ...
// p[0], p[1], p[2], ... , p[9]
// ...
free(p);
```

## 6.9 内存 3 `new`、`delete`

```c++
// 用法 1
int *p = new int;
*p = 10;
delete p;
// 用法 2
char *p = new char[4];
delete[] p;
```

- `new []` 与 `delete []` 对应
- `new` 与 `delete` 对应

## 6.10 内存 4 堆空间的初始化

- 堆空间初始化问题
- 系统会不会初始化 `malloc` 的值？
- 经过测试 **Windows 10 VS** 下调试没有初始化

```c++
size_t size = sizeof(int) * 10;
int *p = (int *)malloc(size);
memset(p, 0, size);
```

- `memset(pointer, data, size)` 将每一个字节设置为 `data`
- 那么 `new` 是否会初始化？

经过验证 VS，下面的语句行为不同：

```c++
// VS 不初始化，可能有的平台初始化
int *p1 = new int;
// 初始化为 0，调用 memset
int *p2 = new int();
// 初始化为 5
int *p3 = new int(5);
// 没有初始化
int *p4 = new int[3];
// 都被初始化为 0
int *p5 = new int[3]();
// 都被初始化为 0
int *p6 = new int[3] { };
// 第一个初始化为 5，后面的为 0
int *p7 = new int[3] { 5 };
```

清零对象或数组：

```c++
// 清零一个对象
memset(&obj, 0, sizeof(obj));
// 清除对象数组
memset(&arr, 0, sizeof(arr));
```

# 7. 面向对象 B

## 7.1 内存 5 对象的内存

对象可以放在 3 个地方
- 全局区
- 栈空间
- 堆空间

## 7.2 构造函数 1

**构造函数**（constructor）

```c++
struct Person {
    int m_age;
    Person(int age) {
        m_age = age;
        cout << "new Person()" << endl;
    }
};
```

- 没有返回值，可以有参数，可以重载
- 一旦定义了构造函数，就必须使用一个构造函数初始化
- `malloc()` 不会初始化对象

> 错误：~~默认情况下，C++ 会为每一个类生成一个无参数的构造函数~~  
> 正确：特定情况下，编译器会为类创建构造函数

## 7.3 构造函数 2

注意函数声明和创建对象之间的区别：

```c++
// 函数声明
Person person();
// 创建对象
Person person1;
Person person1(30);
```

## 7.4 成员变量的初始化

- 全局区
- 堆空间
- 栈空间

如果没有实现构造函数：

```c++
// 初始化
Person person;
int main() {
    // 没有初始化
    Person person1;
    // 没有初始化
    Person *p1 = new Person;
    // 初始化
    Person *p2 = new Person();
}
```

如果有实现构造函数：

```c++
// 初始化
Person person;
int main() {
    // 没有初始化
    Person person1;
    // 没有初始化
    Person *p1 = new Person;
    // 没有初始化
    Person *p2 = new Person();
}
```

## 7.5 析构函数

**析构函数**（destructor）的构造如下

```c++
struct Person {
    ~Person() {
        cout << "~Person()" << endl;
    }
};
```

- `malloc`、`free` 不会调用构造函数和析构函数
- `new`、`delete` 会调用这两个函数，但是必须是 `public`

## 7.6 内存管理

- 对象内创建在堆空间的内容要被释放
- 否则可能出现内存泄露

## 7.7 声明和实现分离

- 头文件
```h
#pragma once

class Person {
private:
    int m_age;
public:
    void setAge(int age);
    int getAge();
    Person();
    ~Person();
};
```
- C++ 文件
```c++
#include "Person.h"

Person::Person() { }
Person::~Person() { }
void Person::setAge(int age) { }
int Person::getAge() { }
```

## 7.8 命名空间

- 命名空间为了解决命名冲突的问题
- 命名空间可以嵌套

```c++
namespace Demo {
    class Person {
        // ...
    };
}
```

- 存在默认命名空间 `::` （没有名称）
- 可以使用 `using Demo::Person` 引用一个名字
- 可以使用 `using namespace Demo;` 引入命名空间的全部内容
- 可以在变量前使用命名空间的符号指代命名空间

下面是声明和实现分离的命名空间版本。

头文件：

```h
#pragma once

namespace MPerson {
    class Person {
    private:
        int m_age;
    public:
        void setAge(int age);
        int getAge();
        Person();
        ~Person();
    };
}
```

C++ 文件：

```c++
#include "Person.h"
namespace MPerson {
    Person::Person() { }
    Person::~Person() { }
    void Person::setAge(int age) { }
    int Person::getAge() { }
}
// 或者使用 using namespace MPerson;
```

命名空间自动合并，多次声明有效。

## 7.9 继承

C++ 没有类似于 Java、OC、Python 的基类。

```c++
struct Person {
    int m_age;
    void run() {
        cout << "Person::run()" << endl;
    }
};
struct Student : Person {
    int m_no;
    void study() {
        cout << "Student::study()" << endl;
    }
};
```

- `Student` 是 **子类**（Subclass，**派生类**）
- `Person` 是 **父类**（Superclass，**超类**）
- 内存布局：父类成员在前面

## 7.10 成员访问权限

- `public` 公共的，任何地方都可以访问
- `protected` 子类内部、当前类内部可以访问
- `private` 私有的，只有当前类内部可以访问

可以在继承时声明权限：

```c++
struct Person {
    int m_age;
    void run() {
        cout << "Person::run()" << endl;
    }
};
struct Student : private Person {
    int m_no;
    void study() {
        cout << "Student::study()" << endl;
    }
};
```

子类内部访问父类成员的权限，是以下两项中权限最小的那个
- 成员本身的访问权限
- 上一级父类的继承方式

其他结论：
- `class` 默认为私有继承
- `struct` 默认为公共继承
- 开发中用的最多的继承方式是 `public`，这样能保留父类原来的成员访问权限
- 访问权限不影响对象的内存布局

# 8. 面向对象 C

## 8.1 初始化列表 1

```c++
struct Person {
    int m_age;
    int m_height;
    void run() {
        cout << "Person::run()" << endl;
    }
    Person(int age, int height) :m_age(age), m_height(height) {
    }
};
```

- 这个操作与直接赋值的效率一致
- `:m_age(func(age) + 1)` 这样写也是可以的
- 初始化顺序只和类的成员顺序有关
- 初始化列表只能用于构造函数
- 可以和默认参数一起使用

```c++
Person(int age = 10, int height = 0) :
    m_age(age), m_height(height) { }
```

- 函数的 **默认参数** 只能放在 **声明** 中
- 如果声明和实现是分离的，只能将 **初始化列表写在实现** 中

## 8.2 初始化列表 2 构造函数的互相调用

构造函数可以相互调用，但是不可以直接调用，只能出现在初始化列表里：

```c++
struct Person {
    int m_age;
    int m_height;
    Person() : Person(10, 20) { }
    Person(int age, int height) {
        m_age = age;
        m_height = height;
    }
};
```

下面的写法是错误的：

```c++
Person() {
    Person(10, 20);
}
```

因为这样就会创建了一个新的、临时的 `Person` 对象，然后传值。

## 8.3 初始化列表 3 父类的构造函数

继承相关的构造函数：

```c++
struct Person {
    int m_age;
    Person () {
        cout << "Person::run()" << endl;
    }
};
struct Student : Person {
    int m_no;
    Student() {
        cout << "Student::run()" << endl;
    }
};
```

- 创建 `Student` 对象时，先后调用了 `Person` 和 `Student` 的构造函数
- 子类的构造函数，默认会调用父类的无参数的构造函数
- 如果子类的构造函数 **显式地调用了父类的有参构造函数**，就不会再去默认调用父类的无参构造函数，但是只能在子类的 **初始化列表** 中使用
- 如果父类缺少无参构造函数，子类的构造函数必须显式调用父类的有参构造函数
- 构造函数与析构函数的执行顺序
    1. 父类构造函数
    2. 子类构造函数
    3. 子类析构函数
    4. 父类析构函数

## 8.4 多态 1

面向对象 3 大特征：
- 封装
- 继承
- 多态

父类指针指向子类对象（安全的）

```c++
// Student: Person
Person *p = new Student();
```

子类指针不允许指向父类对象（不安全、不允许）

```c++
// !危险的代码
Student *p = (Student *) new Person();
```

- 多态
    - 父类指针指向子类对象
    - 同一操作作用于不同的对象，可以有不同的解释，产生不同的执行结果
    - 在运行时，可以识别出真正的对象类型，调用对应子类中的函数

- 重写
    - 子类重新实现父类方法
    - 子类 **重写**（Override）父类的成员函数
    - 父类指针指向子类对象
    - 利用父类指针调用重写的成员函数

C++ 默认情况不会实现多态。

## 8.5 多态 2 虚函数

```c++
struct Animal {
    virtual void speak() {
        cout << "Animal::speak()" << endl;
    }
    virtual void run() {
        cout << "Animal::run()" << endl;
    }
};
struct Dog: Animal {
    void speak() {
        cout << "Dog::speak()" << endl;
    }
    void run() {
        cout << "Dog::run()" << endl;
    }
};
struct Cat: Animal {
    void speak() {
        cout << "Cat::speak()" << endl;
    }
    void run() {
        cout << "Cat::run()" << endl;
    }
};
```

- 父类是 **虚函数**（Virtual Function），子类也自动声明为虚函数
- 虚函数实现了多态

如果没有多态，默认根据 `p` 指针的类型来调用函数：

```c++
// Student: Person
Animal *p = new Cat();
```

汇编的不同：

```x86asm
; 没有使用虚函数 p->speak();
call Animal::speak()
; 使用了虚函数 p->speak();
mov eax, dword ptr [p]
; 取出虚表的地址值
mov edx, dword ptr [eax]
mov esi, esp
mov ecx, dword ptr [p]
mov eax, dword ptr [edx]
call eax
```

- `E8 (call)` 直接调用函数
- `FF (call)` 间接调用函数，内容为函数的地址
- 虚函数：被 `virtual` 修饰的成员函数
- 只要在父类中声明为虚函数，子类中重写的函数也自动变成虚函数

## 8.6 多态 3 虚表

- 包含虚函数的比没有虚函数的情况多了一个指针大小
- 这个指针指向了一个虚表
- 虚函数的实现原理是虚表，这个虚表里面存储着最终需要调用的虚函数地址，这个虚表也叫虚函数表

## 8.7 多态 4 虚表的汇编分析

- 可以参考 ppt 中的表
- 与上一节原理一致

## 8.8 多态 5 虚表的作用

实现多态的 “动态性”。

## 8.9 多态 6 虚表的细节

- 子类如果没有实现父类的虚函数，虚表中会存放父类的虚函数
- 类中有虚函数，那么子类和父类都存在虚表，虚表不一样
- 子类声明为虚函数但父类不声明，则父类不是虚函数

## 8.10 多态 7 调用父类的成员函数

在子类的实现中，如果需要调用父类的方法，可以直接写父类的名称：

```c++
class Animal {
public:
    virtual void speak() {
        cout << "Animal::speak()" << endl;
    }
};
class Cat: public Animal {
public:
    void speak() {
        Animal::speak();
        cout << "Cat::speak()" << endl;
    }
};
```
