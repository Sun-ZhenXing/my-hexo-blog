# 基于 hexo fluid 主题的博客

## Demo

页面地址：<https://blog.alexsun.top/> 。

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

提交更改：

```bash
git add .
git commit -m "upload new file"
git push -u origin main
```

## 优化和改进

* [ ] 支持多元的 MarkDown 语法
    - 表情
    - 引用
    - 任务列表
    - 上下标
    - 复杂的表格
    - 分隔栏
* [ ] 使用最新的 KaTeX 代替当前的旧版本
    - `@upupming/hexo-renderer-markdown-it-plus` 的上游依赖需要更新
    - 如果上述方案不可行，尝试 Fork 项目自己更新
* [ ] 优化 CDN 方案避免加载过慢和字体问题
    - 字体问题已经解决
    - CDN 方案结合图床方案需要专门写一份方案
    - 给出一些支持 SVG 的低成本图床方案
* [ ] 更新官方的配置文件，并加入更多注释，提供最佳实践方案
    - 完善配置，增加说明
    - 完善自描述文档和更多元文档，帮助新手入门

## 授权

该项目中的博客内容（包括 `source` 文件夹下所有 `.md` 文件，在文件中特别声明除外）遵循知识共享协议：[CC-BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/)，其他部分的代码遵循 MIT 协议，如果你依据 MIT 协议对此项目中的博客无关的代码进行任何商业或非商业的使用，不需要询问作者。

如果你需要获得更多授权，应该直接联系作者邮箱：<mailto:sun-zhenxing@foxmail.com> 。
