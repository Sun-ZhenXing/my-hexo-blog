---
title: Python 迭代器和生成器杂谈
date: 2022-05-25 16:19:17
categories:
  - [Python, Python 语言]
tags:
  - Python
  - 迭代器和生成器
---

本文是 [*迭代器深入讲解*](https://www.bilibili.com/video/BV1sS4y1b7qb/) 的笔记。

<!-- more -->

# 1. 迭代器

## 1.1 迭代器接口

```python
iterable = 'abcd1234'
for c in iterable:
    print(c)
```

在 Python 中，任何可以使用 `for` 来枚举的对象都是可迭代对象，那么可迭代对象到底和普通对象有什么不同？

我们可以使用 Python 强大的内省能力来找到它：

```python
def common_attrs(*objs):
    """ 找出一些对象共同的属性 """
    assert len(objs) > 0
    attrs = set(dir(objs[0]))
    for obj in objs:
        attrs &= set(dir(obj))
    # 去除对象共同的属性
    attrs -= set(dir(object))
    return attrs

print(common_attrs('', [], (), {}, set()))
```

我们得到了：

```python
{'__contains__', '__iter__', '__len__'}
```

显然，`__iter__` 是可迭代对象的共同接口。

迭代一个对象，可以使用 `iter(iterable)` 构造一个迭代器，然后不断使用 `next()` 函数进行枚举。

迭代的三个步骤：
1. 调用 `iter(iterable)` 构建迭代器
2. 多次调用 `next(iterator)` 来获取值
3. 最后捕获 `StopIteration` 来结束迭代

因此，上面的 `for` 循环所做的事情可以用下面的代码表示：

```python
iterable = 'abcd1234'
iterator = iter(iterable)
while True:
    try:
        print(next(iterator))
    except StopIteration:
        break
```

它们的本质是一致的。

## 1.2 迭代器协议

Python 规定，迭代器必须同时实现 `__next__()` 方法和 `__iter__()` 方法，这称之为迭代器协议。也就是说，迭代器必须是一种可迭代对象。

```python
class MyIterator:
    def __init__(self, actions) -> None:
        self.actions = actions
        self.index = 0

    def __next__(self):
        while self.index < len(self.actions):
            action =  self.actions[self.index]
            self.index += 1
            return action
        raise StopIteration

    def __iter__(self):
        return self

class MyActions:
    def __init__(self, actions) -> None:
        self.actions = actions

    def __iter__(self):
        return MyIterator(self.actions)

for action in MyActions(['work1', 'work2', 'work3']):
    print(action)
```

## 1.3 迭代器的意义

通过统一的 `next()` 来简化接口，简化编程方式。

两种可迭代对象：
1. 容器类型
    - 列表、元组、字典等
    - 只有 `__iter__` 接口
    - 静态的数据
    - 需要额外的迭代器支持
    - 支持多次迭代
2. 迭代器类型
    - 文件、StringIO 等
    - 同时实现了 `__iter__` 和 `__next__` 接口
    - 动态的
    - 只能迭代一次

也就是说：
- 一个可迭代对象可以构建任意多的迭代器
- 一种迭代器可以应用于任意多个可迭代对象

迭代器构建了一种数据管道，或者称为数据流，在管道中，一次只会通过一份数据，避免一次加载所有数据。但是迭代器也不是按顺序返回这么简单，而是有选择地，按照一定逻辑去处理数据。

# 2. 生成器

## 2.1 生成器的定义

`yield` 定义在函数内，在函数内的任何地方出现这个关键字，这个函数都会变成生成器。

在 Python 中，生成器的定义是能够返回 **生成器迭代器对象** 的函数。一个生成器返回的结果就是 **生成器迭代器对象**，这就是一个迭代器，在生成器中 `return` 的作用变成抛出 `StopIteration` 错误，而 `return` 的结果被包含在错误对象中了。

## 2.2 生成器的状态

生成器具有四个状态：
1. 当调用生成器函数得到生成器对象时，创建了一个生成器迭代器对象
2. 通过 `next()` 调用生成器对象，对应的函数代码开始执行
3. 执行中遇到了 `yield`，`next()` 获得返回值
4. 执行到函数结束，抛出 `StopIteration`

## 2.3 生成器的应用场景

生成器有下面的应用场景：
1. 为一个可迭代的类实现 `__iter__()` 方法
2. 定义一个处理其他可迭代对象的迭代器
3. 定义一个不依赖数据储存的数据生成器

这里我们先实现第一种情况，我们将上一节的例子改造一下：

```python
class MyActions:
    def __init__(self, actions) -> None:
        self.actions = actions

    def __iter__(self):
        def _gen():
            i = 0
            while i < len(self.actions):
                yield self.actions[i]
                i += 1
        return _gen()

for action in MyActions(['work1', 'work2', 'work3']):
    print(action)
```

我们仍然能实现上述功能，但实际上，我们的 `__iter__()` 方法也可以是迭代器，我们不需要嵌套一层函数来实现：

```python
class MyActions:
    def __init__(self, actions) -> None:
        self.actions = actions

    def __iter__(self):
        i = 0
        while i < len(self.actions):
            yield self.actions[i]
            i += 1

for action in MyActions(['work1', 'work2', 'work3']):
    print(action)
```

如果这里理解了上面的例子，那么其他的两种场景应该也就不难理解了。

# 3. 生成器的技术内幕

## 3.1 函数对象和代码对象

在 Python 中，类也可以看做是函数，只是一种特殊的、只返回一类对象的函数。而 Python 中的函数是第一类对象，这也就是为什么 Python 中万物皆对象。每定义一个函数后，就得到了一个函数对象，函数中的代码保存在代码对象中。

```python
def func():
    print('hello')

print(func)
print(func.__code__)
```

有了这两个对象还不够，这些对象还是静态的，不能让 Python 动起来。当函数运行的时候，还需要一个对象保存函数的运行状态，这种对象叫做 **帧对象**（Frame Object），每次调用这个函数，都会构造一个帧对象来储存函数的运行状态，函数运行结束也会自动销毁。

代码对象的属性一般以 `co_` 开头，而帧对象一般以 `f_` 开头。如果需要获得帧对象，需要使用 Python 反射模块支持。

```python
import inspect

def foo():
    return inspect.currentframe()

frame = foo()
print(frame)
```

## 3.2 函数运行栈

# 4. 协程

# 5. 实现协程
