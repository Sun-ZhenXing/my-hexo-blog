---
title: Github 使用技巧
date: 2022-05-21 15:06:20
categories:
  - git
tags:
  - GitHub
  - git
---

本文介绍 GitHub 的各种小技巧。

<!-- more -->

# 1. 搜索技巧

GitHub 的搜索支持各种不同的操作，下面是一些常见搜索的快速技巧。如需更多信息，请访问 [搜索帮助](https://docs.github.com/articles/about-searching-on-github/) 。

提示：按 `S` 可以快速搜索。

## 1.1 基础搜索

| This search                        | Finds repositories with…                                  |
| ---------------------------------- | --------------------------------------------------------- |
| `cat stars:>100`                   | Find cat repositories with greater than 100 stars.        |
| `user:defunkt`                     | Get all repositories from the user defunkt.               |
| `tom location:"San Francisco, CA"` | Find all tom users in `"San Francisco, CA"`.              |
| `join extension:coffee`            | Find all instances of join in code with coffee extension. |
| `NOT cat`                          | Excludes all results containing cat.                      |

## 1.2 仓库搜索

仓库搜索可以查看你在 GitHub 上可以访问的项目，你还可以过滤结果。

| This search               | Finds repositories with…                                     |
| ------------------------- | ------------------------------------------------------------ |
| `cat stars:>100`          | Find cat repositories with greater than 100 stars.           |
| `user:defunkt`            | Get all repositories from the user defunkt.                  |
| `pugs pushed:>2013-01-28` | Pugs repositories pushed to since Jan 28, 2013.              |
| `node.js forks:<200`      | Find all node.js repositories with less than 200 forks.      |
| `jquery size:1024..4089`  | Find jquery repositories between the sizes 1024 and 4089 kB. |
| `gitx fork:true`          | Repository search includes forks of gitx.                    |
| `gitx fork:only`          | Repository search returns only forks of gitx.                |

## 1.3 代码搜索

代码搜索查看 GitHub 上的文件，你也可以过滤结果。

| This search                        | Finds repositories with…                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| `install repo:charles/privaterepo` | Find all instances of install in code from the repository charles/privaterepo. |
| `shogun user:heroku`               | Find references to shogun from all public heroku repositories.                 |
| `join extension:coffee`            | Find all instances of join in code with coffee extension.                      |
| `system size:>1000`                | Find all instances of system in code of file size greater than 1000kbs.        |
| `examples path:/docs/`             | Find all examples in the path /docs/.                                          |
| `replace fork:true`                | Search replace in the source code of forks.                                    |

## 1.4 问题搜索

问题搜索可以查看 GitHub 上的问题和拉动请求，你还可以过滤结果。

| This search                     | Finds issues…                                   |
| ------------------------------- | ----------------------------------------------- |
| `encoding user:heroku`          | Encoding issues across the Heroku organization. |
| `cat is:open`                   | Find cat issues that are open.                  |
| `strange comments:>42`          | Issues with more than 42 comments.              |
| `hard label:bug`                | Hard issues labeled as a bug.                   |
| `author:mojombo`                | All issues authored by mojombo.                 |
| `mentions:tpope`                | All issues mentioning tpope.                    |
| `assignee:rtomayko`             | All issues assigned to rtomayko.                |
| `exception created:>2012-12-31` | Created since the beginning of 2013.            |
| `exception updated:<2013-01-01` | Last updated before 2013.                       |

## 1.5 用户搜索

用户搜索可以找到在 GitHub 上有账户的用户，你还可以过滤结果。

| This search                        | Finds repositories with…                                 |
| ---------------------------------- | -------------------------------------------------------- |
| `fullname:"Linus Torvalds"`        | Find users with the full name "Linus Torvalds".          |
| `tom location:"San Francisco, CA"` | Find all tom users in "San Francisco, CA".               |
| `chris followers:100..200`         | Find all chris users with followers between 100 and 200. |
| `ryan repos:>10`                   | Find all ryan users with more than 10 repositories.      |

# 2. 文件查找

快捷指令：
- 按 `T` 可以快速查找文件
- 按 `L` 可以快速跳转到某一行
- 点击行号可以快速复制这行代码或生成链接
- 按 `B` 可以查看该文件的改动记录

> 查看 GitHub 的快捷指令：[官方网站](https://docs.github.com/en/get-started/using-github/keyboard-shortcuts) 。

命令面板：按 `Ctrl + K`（或 `Command + K` 在 Mac 上）可以输入快捷命令。

# 3. 阅读和运行项目

在仓库页面按 `.` 可以在一个在线版本的 VS Code 打开 GitHub 中的项目，可以安装插件来查看和编辑项目。

我们也可以使用 <https://gitpod.io> 这个网站来在线运行项目：

```
https://gitpod.io/#/github.com/Megvii-BaseDetection/YOLOX
```

我们可以在网页编辑器中打开项目，还可以自动安装依赖，提供完整的虚拟环境。
