# 基于 hexo fluid 主题的博客

## 如何开始

首先确保你的电脑中有安装 Node.js（此处用的是 16.x）和其他相关包管理器，下面安装 hexo：

```bash
npm i -g hexo-cli
```

可以克隆并使用 `hexo s` 直接打开查看效果。

```bash
git clone https://github.com/Sun-ZhenXing/my-hexo-blog.git
cd my-hexo-blog
npm i
hexo s
```

新建博客：

```bash
hexo new -p /git/git-leaning-note.md "git 学习笔记"
```

每篇博客可以在头部记录元信息，使用 YAML 语法记录：

```yaml
---
title: git 学习笔记
date: 2022-05-22 10:32:45
categories:
  - git
tags:
  - git
  - 笔记
---
```

`categories` 表示文章分类，而 `tags` 是文章标签。在 `<!-- more -->` 前面可以写摘要，在后面写正文：


```html
---
title: git 学习笔记       # 文章标题
date: 2022-05-22 10:32:45   # 文章日期 
categories:                 # 文章分类
  - git
tags:                       # 文章标签
  - git
  - 笔记
---

这里是摘要。

<!-- more -->

这里是正文。
```

在本地生成静态文件：

```bash
hexo g
```

全部静态文件就生成在 `./public` 文件夹下。

## 授权

该项目中的博客内容（包括 `source` 文件夹下所有 `.md` 文件，在文件中特别声明除外）遵循知识共享协议：[CC-BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/)，其他部分的代码遵循 MIT 协议，如果你依据 MIT 协议对此项目中的博客无关的代码进行任何商业或非商业的使用，不需要询问作者。

如果你需要获得更多授权，应该直接联系作者邮箱：<sun-zhenxing@foxmail.com>
