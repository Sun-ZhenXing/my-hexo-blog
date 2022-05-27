---
title: git 学习笔记
date: 2022-05-22 10:32:45
categories:
  - git
tags:
  - git
---

本文是 git 学习笔记，结合了以前记录的内容和相关网站，在此进行总结。

<!-- more -->

# 1. git 安装和配置

git 是目前世界上最先进的分布式版本控制系统。

管理 Linux 源码复杂曲折，Linus 花了两周时间自己用 C 写了一个分布式版本控制系统，这就是 git！

<div class="note note-success">

为什么使用分布式版本控制系统？

集中式版本控制系统最大的问题就是必须联网才能工作，分布式版本控制系统每个人都有一份副本。和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人电脑里都有完整的版本库，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。而集中式版本控制系统的中央服务器要是出了问题，所有人都没法干活了。

</div>

命令速查：

| git 命令 | 含义 |
| -------- | ---- |


对于 Debian 系列系统：

```bash
sudo apt-get install git
```

对于 RedHat 系列系统：

```bash
sudo yum install git
```

Windows 用户直接从官网下载安装包即可。

git 全局设置：

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

# 2. 创建版本库

```bash
mkdir learngit
cd learngit
pwd
```

初始化仓库：

```bash
git init
```

<div class="note note-warning">

所有的版本控制系统，其实只能跟踪文本文件的改动，比如 `.txt` 文件，`.html` 网页，所有的程序代码等等，git 也不例外。版本控制系统可以告诉你每次的改动，比如在第 5 行加了一个单词 `"Linux"`，在第 8 行删了一个单词 `"Windows"` 。而图片、视频这些二进制文件，虽然也能由版本控制系统管理，但没法跟踪文件的变化，只能把二进制文件每次改动串起来

</div>

在当前目录下面新建 `README.md` 文件，然后写入两行内容：

```
Git is a version control system.
Git is free software.
```

使用 `git add` 把文件添加到仓库：

```bash
git add README.md
```

第二步，用命令 `git commit` 告诉 git，把文件提交到仓库：

```bash
git commit -m "add a readme file"
```

简单解释一下 `git commit` 命令，`-m` 后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。

# 3. 版本管理

## 3.1 提交新版本

查看版本状态：

```bash
git status
```

如果需要比较哪些地方被改动了，使用 `git diff` 查看：

```bash
git diff README.md
```

如果我们需要提交被修改后的 `README.md` 文件，需要先添加文件：

```bash
git add README.md
```

我们可以继续查看仓库的状态：

```bash
git status
```

下面我们可以提交修改：

```bash
git commit -m "add distributed"
```

下面，再次查看状态：

```bash
git status
```

显示下面的结果则表示提交成功：

```
On branch master
nothing to commit, working tree clean
```

## 3.2 版本回退

使用 `git log` 查看哪些版本被提交到了 git 仓库中：

```bash
git log
```

加上 `--pretty=oneline`







# 4. 远程仓库

# 5. 分支管理

# 6. 标签管理

# 7. 使用 GitHub

# 8. 自定义

## 8.1 忽略特殊文件

有些时候，你必须把某些文件放到 git 工作目录中，但又不能提交它们，比如保存了数据库密码的配置文件。

在 git 工作区的根目录下创建一个 `.gitignore` 文件，然后把要忽略的文件名填进去，git 就会自动忽略这些文件。

> 各种常用的 `.gitignore` 文件在 GitHub 上有仓库：<https://github.com/github/gitignore>，可以根据工程性质复制它们。另外有很多工程初始化就加上了这个文件，例如 Vue 项目创建时。

忽略文件的原则是：
1. 忽略操作系统自动生成的文件，比如缩略图等
2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如 Java 编译产生的 `.class` 文件
3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件

可以使用通配符确定文件或文件夹的名称：

```gitignore
# Windows 下自动生成
Thumbs.db
ehthumbs.db
Desktop.ini

# Mac 下自动生成
.DS_Store

# 编译目标
dist

# 编译中间结果
*.py[cdo]

# 其他配置文件和二进制文件
*.so
*.egg
*.egg-info

# 秘钥等信息
secret_key.key
```

如果你的文件被 `.gitignore` 忽略了，可以使用下面的命令强制加入：

```bash
git add -f Application.class
```

使用 `git check-ignore` 检查规则是否有错误：

```bash
git check-ignore
```

如果不希望使用强制添加，又希望有例外情况使用 `!` 加入即可：

```gitignore
!.gitignore
!Application.class
```


# 参考

[1] 廖雪峰的官方网站，git 教程，<https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192>
