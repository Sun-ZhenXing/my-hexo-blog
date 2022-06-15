---
title: MarkDown 技巧
date: 2022-06-07 20:31:39
math: true
categories:
  - [MarkDown]
tags:
  - MarkDown
  - 元定义
---

本文是 MarkDown 技巧的介绍和基本规范定义。

<!-- more -->

# 1. 页面和格式

## 1.1 插入换页符

插入下面的 HTML 代码，可以让 MarkDown 转换为 HTML 或 Word 文档时自动换页。

```html
<div style="page-break-after: always;"></div>
```

## 1.2 使用 `<style>` 标签

使用下面的代码，可以让文档内的表格和图片居中显示，需要在开头插入。

注意：一些 MarkDown 编辑器不支持使用 `<style>` 标签。

### 1.2.1 图片和表格居中

```html
<style>
    img, table {
        margin: 0 auto;
    }
    p>img, div>img {
        display: flex;
    }
</style>
```

### 1.2.2 插入引文

```markdown
> The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life. 
> 
> <cite>- Bill Gates</cite>
```

```html
<style>
    cite {
        display: flex;
        justify-content: right;
    }
</style>
```

# 2. LaTeX

## 2.1 LaTeX 公式包含哪些类型

| 种类  | 含义              | 举例                             |
| :---: | :---------------- | :------------------------------- |
|   1   | Ord（标准符号）   | $1\>\alpha\>\partial\>\delta$    |
|   2   | Op（大型运算符）  | $\displaystyle\int\>\sum\>\prod$ |
|   3   | Bin（二元运算符） | $+\times\pm$                     |
|   4   | Rel（二元关系符） | $=\>\le\>\approx\>\sim$          |
|   5   | Open（左括号）    | $(\>[\>\{\>\langle$              |
|   6   | Close（右括号）   | $)\>]\>\}\>\rangle$              |
|   7   | Punct（标点符号） | $,;$                             |
|   8   | Inner（子公式）   | `\begin{}\end{}`                 |

## 2.2 样式技巧

### 2.2.1 顶标和底标

`\overset` 和 `\underset` 支持顶标和底标：

```latex
\overset{b}{A}
\underset{b}{A}
```

$$
\overset{b}{A},\, \underset{b}{A}
$$

还可以使用 `\mathop` 转换为数学运算符，使用 `\limits` 设置顶标和底标：

语法：

```latex
\mathop{expr1}\limits_{a}^{b}
```

$$
\mathop{A}\limits_{a}^{b}
$$

如果需要将积分符号等设置为上下标，使用 `\limits` ：

$$
\int_{0}^{2 \pi} f(x)\,\mathrm{d}x
$$

语法：

```latex
% \int 可替换为其他大型运算符
\int\limits_{a}^b
```

$$
\int\limits_{0}^{2 \pi} f(x)\, \mathrm{d}x
$$

### 2.2.2 空格

包含 `\ `、`\,`、`\>`、`\;`、`\!`、`\quad`、`\qquad`，例如：

$$
\begin{aligned}
    a \  b \\
    a \, b \\
    a \> b \\
    a \; b \\
    a \! b \\
    a \quad b \\
    a \qquad b
\end{aligned}
$$

### 2.2.3 取模

如果需要取模，使用 `\bmod` 表示二元符号，例如：

$$
a \bmod b
$$

如果需要方程使用，使用 `\pmod`，例如：

$$
x \equiv a \pmod{b}
$$

### 2.2.4 点和三点列

点：

| 类型 | 表示 | 效果 |
|:----:|:---:|:----:|
| 中间的点 | `\cdot` | $a \cdot b$ |
| 圈点 | `\odot` | $a \odot b$ |
| 中间的点 | `\cdotp` | $a \cdotp b$ |
| 下面的点 | `\ldotp` | $a \ldotp b$ |
| 字母上的点 | `\dot{x}` | $\dot{x}$ |
| 字母上的两个点 | `\ddot{x}` | $\ddot{x}$ |
| 字母上的点 | `\dot{x}` | $\dot{x}$ |
| 粗中点 | `\centerdot` | $a \centerdot b$

三点列：

| 类型 | 表示 | 效果 |
|:----:|:---:|:----:|
| 中间的三点 | `\cdots` | $a \cdots b$ |
| 下面的三点 | `\ldots` | $a \ldots b$ |
| 垂直的三点 | `\vdots` | $\vdots$ |
| 对角的三点 | `\ddots` | $\ddots$ |

### 2.2.5 不同的箭头

如果要表达推导出的，可以使用 `\implies` 代替 `\Rightarrow`，例如

$$
\begin{aligned}
    A \implies B \\
    A \Longrightarrow B \\
    A \Rightarrow B
\end{aligned}
$$

可以使用 `\iff`、等：

$$
A \iff B
$$

当然，为了效果一致、简单易用，你仍然可以使用 `\...arrow` 。

可以使用 `\to` 代替部分 `\rightarrow`，使用 `\gets` 代替 `\leftarrow`，这样更加简洁，但效果可能一样：

$$
\begin{aligned}
    a \rightarrow b \\
    a \to b \\
    a \leftarrow b \\
    a \gets b
\end{aligned}
$$

### 2.2.6 分段公式

使用 `\begin{cases}` 代替 `\begin{aligned}`，例如：
$$
\delta(x) =
\begin{cases}
    1 & x = 0, \\
    0 & x \neq 0.
\end{cases}
$$

$$
f(x) =
\begin{cases}
    x^3 + \dfrac{1}{x}, & x \neq 0 \\
    0, & \text{otherwise}
\end{cases}
$$

### 2.2.7 分数

`\dfrac` 将在行内和行间表现一致，`\frac` 将表现为小尺寸，例如 $\frac{1}{2}$ 是一个小尺寸的公式，而 $\dfrac{3}{4}$ 是一个正常大小的公式。

对于行间公式，这没有任何区别：

$$
\dfrac{1}{2},\, \frac{3}{4}
$$

注意，不要在分数环境、上下标环境内再加上分数，这样显得不优雅，使用 `a/b`（即 $a/b$ 表示为行内公式）代替：

$$
\begin{aligned}
    % 不要使用
    \frac{\frac{2}{3}}{4},\,
    \dfrac{\dfrac{2}{3}}{4} \\
    % 建议使用
    \frac{2/3}{4}
\end{aligned}
$$

### 2.2.8 横线

使用 `\bar` 给一个字符加上小短线，使用 `\overline` 或 `\underline` 给一段公式加上水平线：

$$
\bar{c},\, \overline{c \cdot d}
$$

### 2.2.9 微积分

给微分符号前面加上 `\,` 可以更加优雅，例如：

$$
\begin{aligned}
    % 没有 \, d
    \int _0^{\infty} f(x) \mathrm{d} x \\
    % 有 \, d
    \int _0^{\infty} f(x) \,\mathrm{d} x \\
\end{aligned}
$$

当然，在 `\partial` （ $\partial$ 符号）前面也可以加上 `\,` 。

## 2.3 关系代数常用 LaTeX

<div class="note note-warning">

注意，某些运算符可能属于 LaTeX 普通符号，使用 `\mathop{}` 来转换为运算符。例如，将 `\Pi` 转换为运算符 `\mathop{\Pi}` 。

</div>

### 2.3.1 基本

| 操作     |            符号             | $\LaTeX$                    |
| :------- | :-------------------------: | :-------------------------- |
| 投影     |            $\Pi$            | `\Pi`                       |
| 选择     |          $\sigma$           | `\sigma`                    |
| 重命名   |           $\rho$            | `\rho`                      |
| 聚合函数 |        $\mathcal{G}$        | `\mathcal{G}`               |
| 交       |           $\cap$            | `\cap`                      |
| 并       |           $\cup$            | `\cup`                      |
| 差       |             $-$             | `-`                         |
| 自然连接 |           $\Join$           | `\Join` 或者 `\bowtie`      |
| 左外连接 |        $\mathop{\text{⟕}}$         | `\mathop{⟕}`                |
| 右外连接 |        $\mathop{\text{⟖}}$         | `\mathop{⟖}`                |
| 外连接   |        $\mathop{\text{⟗}}$         | `\mathop{⟗}`                |
| 笛卡尔积 |          $\times$           | `\times`                    |
| 除       |           $\div$            | `\div`                      |
| 赋值     |           $\gets$           | `\gets` 或 `\leftarrow`     |
| 非       |           $\lnot$           | `\lnot` 或 `\neg`           |
| 且       |           $\land$           | `\land` 或 `\wedge`         |
| 或       |           $\lor$            | `\lor` 或 `\vee`            |
| 存在     |          $\exist$           | `\exist`                    |
| 任意     |          $\forall$          | `\forall`                   |
| 元组     | $\overset{\frown}{t_r t_s}$ | `\overset{\frown}{t_r t_s}` |
| 比较     |     $\le,\,\ge,\,\neq$      | `\le, \ge, \neq`            |
| 正体下标 |      $R_{\text{name}}$      | `R_{\text{name}}`           |
| 粗体下标 |     $R_{\textbf{name}}$     | `R_{\textbf{name}}`         |
| 顶标     |      $\overset{b}{A}$       | `\overset{b}{A}`            |
| 底标     |      $\underset{b}{A}$      | `\underset{b}{A}`           |

### 2.3.2 复杂示例

条件连接：

$$\underset{A\mathop{\text{θ}}B}{\Join}$$

可以使用下面的语句：

```latex
\mathop{\Join}\limits_{A\mathop{\text{θ}}B}
% 或者
\underset{A\mathop{\text{θ}}B}{\Join}
```
