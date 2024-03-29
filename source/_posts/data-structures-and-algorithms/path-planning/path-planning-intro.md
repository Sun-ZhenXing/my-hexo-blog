---
title: 路径规划算法
date: 2022-07-16 08:42:17
math: true
categories:
  - [数据结构和算法, 路径规划]
tags:
  - 路径规划
  - 算法
  - 机器学习
---

本文介绍几种基于图的路径规划算法。

<!-- more -->

在传统路径规划算法中，各种算法的实现原理和应用范围差异很大，但可以将以下五种算法看作一类（Dijkstra、A*、D*、LPA*、D* lite），以下对各算法的基本原理进行阐述，并在搜索原理和应用场景等方面进行了对比区分。

# 1. 算法简述

## 1.1 Dijkstra 算法

Dijkstra 算法是由 E.W.Dijkstra 于 1959 年提出。该算法采用了一种贪心模式，其解决的是有向图中单个节点到另一节点的最短路径问题，其主要特点是每次迭代时选择的下一个节点是当前节点最近的子节点，也就是说每一次迭代行进的路程是最短的。而为了保证最终搜寻到的路径最短，在每一次迭代过程中，都要对起始节点到所有遍历到的点之间的最短路径进行更新。

## 1.2 A* 算法

A* 算法是启发式搜索算法，启发式搜索即在搜索过程中建立启发式搜索规则，以此来衡量实时搜索位置和目标位置的距离关系，使搜索方向优先朝向目标点所处位置的方向，最终达到提高搜索效率的效果。

A* 算法的基本思想如下：引入当前节点 $x$ 的估计函数 $f(x)$，当前节点 $x$ 的估计函数定义为：

$$
f(x) = g(x) + h(x)
$$

其中：
- $g(x)$ 是从起点到当前节点 $x$ 的实际距离量度（代码中可以用两点之间距离代替）
- $h(x)$ 是从节点 $x$ 到终点的最小距离估计，$h(x)$ 的形式可以从欧几里得距离或者曼哈顿距离中选取。

算法基本实现过程为：从起始点开始计算其每一个子节点的 $f$ 值，从中选择 $f$ 值最小的子节点作为搜索的下一点，往复迭代，直到下一子节点为目标点。

基于 A* 的优化算法有很多，例如 AA\*、ARA\* 和 Weighted A* 等。

首先解释一下 ARA\*。A 即 Anytime，在寻路算法中，实时性非常重要，因此对路径规划有严格的时间要求时，比如限制 $\rm 10ms$ 内必须出一次寻路结果。解决这种限时寻路的问题的算法就叫 Anytime 。

第一个解决这个问题且基于 A* 的算法的是 AA\*（Multiple sequence alignment using A\*），然后 ARA* 针对 AA* 进行了改进。

这里就要提到 Weighted A*，它的思想是将 A* 中的启发函数乘上一个大于 $1$ 的因子 $\varepsilon$，这时寻路就会更快地往目标点方向搜索，但是寻出来的路径很可能不是最优的。

AA* 和 ARA* 也将启发因子 $\varepsilon$（ARA\* 论文称为膨胀因子）设为大于 $1$ 的一系列数字来提升寻路效率，然后在时间允许的范围内优化路径。ARA* 比 AA* 能在更短时间内给出更好的次优路径。

## 1.3 D* 算法

基于 A* 算法，Anthony Stentz 在 1994 年提出了 Dynamic A* 算法，也就是 D* 算法。D* 算法是一种反向增量式搜索算法，反向即算法从目标点开始向起点逐步搜索；增量式搜索，即算法在搜索过程中会计算每一个节点的距离度量信息 $H(x)$，在动态环境中若出现障碍物无法继续沿预先路径搜索，算法会根据原先已经得到的每个点的距离度量信息在当前状态点进行路径再规划，无需从目标点进行重新规划。

其中，距离度量信息 $H(x)=H(y)+C(y,\, x)$，$H(y)$ 代表 $x$ 点到目标点的距离度量，$C(y,\,x)$ 代表 $y$ 点到 $x$ 点的距离度量，在算法中均可用两点间实际距离代替。

## 1.4 LPA* 算法

2001 年，由斯文·柯尼格（Sven Koenig）和马克西姆·利卡切夫（Maxim Likhachev）共同提出的 Life Planning A* 算法是一种基于 A* 算法的增量启发式搜索算法。

LPA* 算法实现原理：搜索起始点为所设起点（正向搜索），按照 $\mathrm{Key}$ 值的大小作为搜索前进的原则，迭代到目标点为下一搜索点时完成规划；$\mathrm{Key}$ 值中包含启发式函数 $h$ 项作为启发原则来影响搜索方向；处于动态环境时，LPA* 可以适应环境中障碍物的变化而无需重新计算整个环境，方法是在当前搜索期间二次利用先前搜索得到的 $g$ 值，以便重新规划路径。

其中，$\mathrm{Key}$ 为一个二维数组：

$$
k(n) = \begin{bmatrix}
    k_1(n) \\
    k_2(n)
\end{bmatrix} =
\begin{bmatrix}
    \min\{g(n),\,\mathrm{rhs}(n)\} + h(n,\,\mathrm{goal}) \\
    \min\{g(n),\,\mathrm{rhs}(n)\}
\end{bmatrix}
$$

$g(n)$ 代表起点到当前点的距离度量。$\mathrm{rhs}(n)$ 为 $\min\{g(n') + c(n',\, n)\}$，$n'$ 为 $n$ 的父节点，$h(n,\,\mathrm{goal})$ 为启发项。

搜索原则为：优先判断 $k_1$ 大小，若 $k_1$ 小则优先遍历，若 $k_1=k_2$，则选择 $k_2$ 较小的点。

## 1.5 D* lite 算法

D* lite 算法是 Koenig S 和 Likhachev M 基于 LPA* 算法基础上提出的路径规划算法。D* lite 与 LPA* 的主要区别在于搜索方向的不同，这就将 $\mathrm{Key}$ 定义中涉及到的目标点 $\mathrm{goal}$ 替换为起始点 $\mathrm{start}$ 的相应信息。

D* lite 算法是先在给定的地图集中逆向搜索并找到一条最优路径。在其接近目标点的过程中，通过在局部范围的搜索去应对动态障碍点的出现。增量式算法的优势在于，各个点的路径搜索已经完成，在遇到障碍点无法继续按照原路径进行逼近时，通过增量搜索的数据再利用直接在受阻碍的当前位置重新规划出一条最优路径，然后继续前进。

# 2. 总结

| 算法     | 搜索方向 | 启发式 | 增量式 | 适用范围                                   | 现实应用                       |
| -------- | -------- | ------ | ------ | ------------------------------------------ | ------------------------------ |
| Dijkstra | 正向搜索 | 否     | 否     | 全局信息已知，静态规划                     | 网络通信中的最短路径由选择     |
| A*       | 正向搜索 | 是     | 否     | 全局信息已知，静态规划                     | Apollo、游戏、无人机路径规划   |
| D*       | 反向搜索 | 否     | 是     | 部分信息已知，动态规划                     | 机器人探路、火星探测车路径规划 |
| LPA*     | 正向搜索 | 否     | 是     | 部分信息已知，假设其余为自由通路，动态规划 | 机器人路径规划                 |
| D* lite  | 反向搜索 | 是     | 是     | 部分信息已知，假设其余为自由通路，动态规划 | 机器人路径规划                 |

基于图搜索的路径规划方法，在 2D 地图中效果较好，而当地图扩展为 3D 时，栅格数量激增时，计算量是指数爆炸上升的，因此在 3D 系统中其实并不常用。

<div class="note note-success">

**推荐**

代码仓库：<https://github.com/zhm-real/PathPlanning> 提供了典型路径规划的实现。

</div>

# 参考

[1] 知乎，路径规划五种算法简述及对比，<https://zhuanlan.zhihu.com/p/124232080>
