---
title: 博客配置指南
math: true
banner_img: /img/default.jpg
categories:
  - META
tags:
  - 博客维护
  - META
---

本文是博客的配置说明，用于记录和自动部署的参考，后续如果有修改还会继续完善。

<!-- more -->

# 1. 配置过程

## 1.1 从零开始

首先安装 hexo，确保你的电脑安装了 Node.js 和 npm：

```bash
npm install -g hexo-cli
```

然后初始化仓库：

```bash
hexo init myblog
cd myblog
npm install
```

使用 Fluid 主题：

```bash
npm install --save hexo-theme-fluid
```

修改 `_config.yml` 中的一些配置：

```yaml
theme: fluid
language: zh-CN
```

然后在仓库根目录下新建 `_config.fluid.yml` 其内容为 `_config.yml` 的内容。

创建关于页面：

```bash
hexo new page about
```

关于页面在 `@/source/about/index.md` 下面，然后编辑这个文件即可：

```yaml
---
title: 标题
layout: about
---

这里是关于的内容。
```

剩余的许多配置都可以在 [官方配置指南](https://hexo.fluid-dev.com/docs/guide/) 上找到，如果找不到就到 [GitHub 仓库/`_config.yml`](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/_config.yml) 下面去找即可。

## 1.2 更换公式引擎

这里需要说的是，公式的支持性比较差，hexo 官方维护的版本是静态模板编辑的，也就是说和 MarkDown 无关，是侵入式的插入方式。

这里使用 KaTeX 引擎，原因是 MathJax 加载太慢，而且 Bug 比较多、渲染到页面上比较丑。

KaTeX 引擎可以按照官方说明配置，但是修改一些配置，否则公式就不是很美观，最后查看源码发现上游依赖的插件版本比较老，是 KaTeX 0.10.2，于是将 CDN 版本全部退回到 0.10.2，而官方在用 0.15.3，渲染起来和预期差别很大。

官方使用的 baomitu CDN 在加载字体的时候出现问题，所以就将 CDN 换为 bootcdn，这在国内也是很快速的。

```bash
# 卸载原有的渲染引擎，安装新的引擎
npm uninstall hexo-renderer-marked --save
npm install @upupming/hexo-renderer-markdown-it-plus --save

# 清除编译
hexo clean
```

在 `_config.fluid.yml` 中建议这样配置：

```yaml
post:
  math:
    enable: true
    specific: true
    engine: katex

static_prefix:
  katex: https://cdn.bootcdn.net/ajax/libs/KaTeX/0.10.2/
```

在 `_config.yml` 中配置：

```yml
math:
  engine: katex
  katex:
    css: https://cdn.bootcdn.net/ajax/libs/KaTeX/0.10.2/katex.min.css
    js: https://cdn.bootcdn.net/ajax/libs/KaTeX/0.10.2/katex.min.js
    config:
      throwOnError: false
      errorColor: "#cc0000"

markdown_it_plus:
  plugins:
    - plugin:
      name: '@neilsustc/markdown-it-katex'
      enable: true
      options:
        strict: false
```

测试使用 KaTeX 去渲染 $\LaTeX$ 公式：

$$
\int_{0}^{\infty}f(x)\,\mathrm{d}x
$$

下面是更多的公式（无任何含义）：

$$
\boldsymbol{F}(\vec{x},\, \mathcal{A}) = \begin{cases}
    \mathsf{K}, & \text{for } x \in \mathbb{C} \\
    \lim\limits_{x \to \infty} g(x), & \text{otherwise}
\end{cases}
$$

$$
\begin{aligned}
    f'(x) = g''(x) \\
    \oiint,\sum,\prod,\frac{\pi}{m}
\end{aligned}
$$

> 注意，每一篇写了公式的文章需要加入标记：
> ```yaml
> math: true
> ```

如果 Tag 正常的话，应该能看到绿色标记：

{% note success %}
文字 或者 `markdown` 均可
{% endnote %}

支持文字或者 HTML：

```html
{% note success %}
文字 或者 `markdown` 均可
{% endnote %}

<span class="label label-primary">Label</span>
```

详细的配置可以参考文末链接。

## 1.3 美化授权许可卡片

创建 `scripts/addon.js` 并加入的代码：

```js
hexo.extend.injector.register('body_end', `<script>
// 美化 license 框
$('.license-box').addClass('note note-warning');
</script>`, 'post');
```

重新编译即可，这里直接给标签插入两个类，当以后有需要可以直接在此代码中插入新的代码。

# 2. 快速开始

## 2.1 创建新的博客

``` bash
hexo new "新的博客"
```

有的时候我们希望创建的博客是按照类别分在不同的文件夹下面的，例如：

```bash
hexo new -p /git/git-leaning-note.md "git 学习笔记"
```

## 2.2 运行服务

输入下面的命令：

``` bash
hexo server
```

或者

```bash
hexo s
```

这样可以在本地查看运行效果了，不过每次有修改的时候最好清空一下生成：

```bash
hexo clean
```

这样可以避免很多问题。

## 2.3 生成静态文件

``` bash
hexo generate
```

或者

```bash
hexo g
```

## 2.4 部署到远程站点

``` bash
hexo deploy
```

更多信息：[hexo 部署](https://hexo.io/docs/one-command-deployment.html)

这里直接使用 git 进行提交，比较方便，而且可以自动部署。

# 3. 使用 git 和 GitHub Actions 管理项目

## 3.1 git 拉取

```bash
git pull origin main
```

创建并提交请求：

```bash
git add .
git commit -m "upload new"
git push -u origin main
```

如果此时已经部署了 GitHub Actions，那么此时会自动编译部署。

## 3.2 GitHub Actions

在 `.github/workflows/main.yaml` 中填写如下内容，其中 `<>` 标注的地方是你的信息：

```yaml
name: Blog CI/CD

# 触发条件
on:
  push:
    branches:
      - main

env:
  TZ: Asia/Shanghai

jobs:
  blog-cicd:
    name: Hexo blog build & deploy
    runs-on: ubuntu-latest

    steps:
    - name: Checkout codes
      uses: actions/checkout@v2

    - name: Setup node
      # 设置 node.js 环境
      uses: actions/setup-node@v1
      with:
        node-version: '16.x'

    - name: Cache node modules
      # 设置包缓存目录，避免每次下载
      uses: actions/cache@v1
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

    - name: Install hexo dependencies
      # 下载 hexo-cli 脚手架及相关安装包
      run: |
        npm install -g hexo-cli
        npm install

    - name: Generate files
      # 编译 markdown 文件
      run: |
        hexo clean
        hexo generate

    - name: Deploy hexo blog
      env: 
        # Github 仓库，修改为你的仓库
        GITHUB_REPO: github.com/<你的GitHub用户名>/<你的GitHub用户名>.github.io
        PASSWORD: ${{secrets.ACCESS_TOKEN}}
      # 将编译后的博客文件推送到指定仓库
      run: |
        cd ./public && git init && echo "<你的域名>" > CNAME && git add .
        git config user.name "<你的GitHub用户名>"
        git config user.email "<你的邮箱>"
        git add .
        git commit -m "GitHub Actions Auto Builder at $(date +'%Y-%m-%d %H:%M:%S')"
        git push --force --quiet "https://$PASSWORD@$GITHUB_REPO" master:master
```

上面的 `ACCESS_TOKEN` 需要申请并设置两遍，另外：

```bash
cd ./public && git init && echo "<你的域名>" > CNAME && git add .
```

对于上面的命令，如果你没有域名，直接改为下面的命令。

```bash
cd ./public && git init && git add .
```

关于如何使用 GitHub Pages 和 GitHub Actions 就不再讨论了，如果需要可以在网上搜索，如果对于博客有任何问题可以在 [该项目](https://github.com/Sun-ZhenXing/my-hexo-blog) 下提出 Issue 。

# 4. 关键配置

## 4.1 文章的元信息

基本信息不再介绍：

```yaml
title: Github 使用技巧
date: 2022-05-21 15:06:20
categories:
  - git
tags:
  - GitHub
  - git
  - 技巧
index_img: /img/example.jpg       # 文章首页封面
banner_img: /img/post_banner.jpg  # 背景大图
```

## 4.2 分类和标签

标签最好和 `.md` 文件分类的路径一致，如果需要多个类，可以这样分：

```yaml
categories:
  - [git]
  - [技巧]
```

一般不需要多个类，更多需要的可能是设置子类：

```yaml
categories:
  - [git, git 学习]
```

而标签就可以独立加多个。

## 4.3 一些效果

网页的图标：

```yaml
favicon: /img/fluid.png
```

代码块：

```yaml
code:
  copy_btn: true
  highlight:
    enable: true
    line_number: true
    lib: "highlightjs"
    highlightjs:
      style: 'Github Gist'
      bg_color: false
    prismjs:
      style: "default"
      preprocess: true
```

# 5. 部署结果

可以看到每次都会生成自动构建，然后提交到另一个仓库 `<user-name>.github.io` 中，然后在此仓库下面设置 GitHub Pages 和 HTTPS，即可让你的博客网站。

{% note success %}

注：以任何不在许可内的形式使用该项目的任何内容需要联系作者授权，对于博客的 MarkDown 文件可以参考但不能直接复制，否则追究责任，并关闭项目访问权限。对于博客内疑似侵权的内容也要联系作者撤销。

项目地址：<https://github.com/Sun-ZhenXing/my-hexo-blog>

部署地址：<https://github.com/Sun-ZhenXing/Sun-ZhenXing.github.io>

{% endnote %}
