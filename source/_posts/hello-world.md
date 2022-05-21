---
title: 博客配置指南
math: true
banner_img: /img/default.jpg
categories:
  - META
tags:
  - 博客页面配置
  - 博客维护
  - META
---
本文是博客的配置说明。

## 配置说明

### 从零开始

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

### 更换公式引擎

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

下面是更多的公式：

$$
\boldsymbol{F}(\vec{x},\, \mathcal{A}) = \begin{cases}
    \mathsf{K}, & \text{for } x \in \mathbb{C} \\
    \lim_{x \to \infty} g(x), & \text{otherwise}
\end{cases}
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

### 美化授权许可卡片

创建 `scripts/addon.js` 并加入的代码：

```js
hexo.extend.injector.register('body_end', `<script>
// 美化 license 框
$('.license-box').addClass('note note-warning');
</script>`, 'post');
```

重新编译即可。

## 快速开始

### 创建新的博客

``` bash
hexo new "新的博客"
```

更多信息：[hexo 写作](https://hexo.io/docs/writing.html)

### 运行服务

``` bash
hexo server
```

更多信息：[hexo 服务器](https://hexo.io/docs/server.html)

### 生成静态文件

``` bash
hexo generate
```

更多信息：[hexo 生成静态](https://hexo.io/docs/generating.html)

### 部署到远程站点

``` bash
hexo deploy
```

更多信息：[hexo 部署](https://hexo.io/docs/one-command-deployment.html)
