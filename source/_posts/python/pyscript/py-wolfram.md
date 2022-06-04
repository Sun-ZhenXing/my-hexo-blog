---
title: PyWolfram 项目
date: 2022-06-01 19:50:04
hide: true
math: true
categories:
  - Python
tags:
  - Python
  - 未来计划
  - PyScript
---

本文是一篇设想，期望使用纯前端并依赖 SymPy 实现一个简易的 Wolfram Alpha，虽然不一定会实现，但是这是一种想法，希望以后实现的时候能回想起来。

<!-- more -->

# 1. 项目设想

不依赖后端实现一个简易的 Wolfram Alpha，仅实现计算和绘图功能。编写的时候使用 Python 语法，执行 Python 语句并获得结果，可以扩展模块或使用自己的模块。

<div class="note note-success">

*项目灵感来源*：

几年前我还在上高中的时候，就自己编写了一个简易的 [Python 代数计算器](https://github.com/Sun-ZhenXing/VisualMath)，大概长这个样子：

![](https://pic.rmb.bdstatic.com/bjh/e4813caf014f57742f4e6fa1090b2769.jpeg)

可以将输入的表达式交给 Python 执行，然后使用 SymPy 计算，转换为 LaTeX 并在前端渲染。例如，我输入 `solve x^3 - 2x^2 - 3` 的时候，下面会渲染：

$$
\left[ \frac{2}{3} + \left(- \frac{1}{2} - \frac{\sqrt{3} i}{2}\right) \sqrt[3]{\frac{\sqrt{113}}{6} + \frac{97}{54}} + \frac{4}{9 \left(- \frac{1}{2} - \frac{\sqrt{3} i}{2}\right) \sqrt[3]{\frac{\sqrt{113}}{6} + \frac{97}{54}}}, \  \frac{2}{3} + \frac{4}{9 \left(- \frac{1}{2} + \frac{\sqrt{3} i}{2}\right) \sqrt[3]{\frac{\sqrt{113}}{6} + \frac{97}{54}}} + \left(- \frac{1}{2} + \frac{\sqrt{3} i}{2}\right) \sqrt[3]{\frac{\sqrt{113}}{6} + \frac{97}{54}}, \  \frac{4}{9 \sqrt[3]{\frac{\sqrt{113}}{6} + \frac{97}{54}}} + \frac{2}{3} + \sqrt[3]{\frac{\sqrt{113}}{6} + \frac{97}{54}}\right]
$$

解方程 $x^3 - 2x^2 - 3 = 0$ 完全依赖 SymPy 进行，而且还在 B 站录了一个视频 <https://www.bilibili.com/video/BV1o7411Q7U5>，我的项目收获了 3 颗星星，就再也没更新过。

上面的项目只能是一种想法，而不能是一个项目，因为这只能用于炫耀而不能用于实际。

</div>

## 1.1 项目计划

用过 Wolfram Alpha 的朋友一定知道它的强大，通过简单的一句话就能判断你想获得哪些数据，

我希望实现几个页面，并加入一些可选功能。当然，这取决于我到底想做成什么样：
- 基础计算
- 代码编写执行
- 图表和函数可视化
- 过程推导
- 自定义模块

```python
def f(x: int) -> int:
    return x + 3
```

下面需要将这个项目分割成几个子项目，正常开发的时候，很多情况下我们都会碰到相似的需求：
- 公式渲染
    - 使用 KaTeX
    - KaTeX 对比 MathJax 性能好很多，而且比较精美
- 公式编辑
- 文本框代码编辑

## 1.2 场景细分

