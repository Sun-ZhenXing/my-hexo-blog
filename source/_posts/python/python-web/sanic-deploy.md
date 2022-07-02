---
title: Sanic 部署实战
date: 2022-06-18 10:39:43
categories:
  - [Python, Web 开发]
tags:
  - Python
  - Web 开发
  - Sanic
---

本文是如何部署 Sanic 的一些实践总结。

<!-- more -->

<div class="note note-primary">

**环境说明**

如果没有特别说明，本文的环境都是针对 CentOS 7 的，如果是别的 Linux 发行版也可以参考，命令基本一致。

</div>

# 1. 应用配置

## 1.1 使用 YAML 进行配置

使用 YAML 定义配置已经变得越来越流行。如果你不希望引入更多冗余的库可以跳过本章，继续使用 [上一篇文章介绍的配置方式](./sanic-intro.md#1-sanic-应用配置)<!-- TODO：修改路径 --> 。

YAML 是一种简洁的配置方式，支持和 JSON 类似的数据结构但更加简洁。也就是说，YAML 不仅仅是配置，也可以支持对象格式的数据。

Python 需要安装第三方库以支持 YAML，`pyyaml` 是非常流行的第三方库，用于解析 YAML，安装命令如下：

```bash
pip install pyyaml
```

使用 `pyyaml` 导入配置：

```python

```

# 2. 服务器部署

## 2.1 运行 Sanic 服务器

## 2.2 使用 Nginx 挂载

实际部署的时候，可以使用 Sanic 直接运行作为服务器。当然，代理服务器是更加推荐的，大量的静态文件请求通过 Nginx 要比 Sanic 服务器快得多。

将 Sanic 提供的 RESTful 接口挂载到 `/api/` 路径下面，然后由 Nginx 提供静态文件的服务是一个比较不错的选择。

```python
# server.py
from sanic import Sanic, text

app = Sanic("app")
app.config.SERVER_NAME = "example.com/api"

@app.route("/foo")
def handler(request):
    url = app.url_for("handler", _external=True)
    return text(f"URL: {url}")
```
```yaml
# docker-compose.yml
version: "3.7"
services:
  app:
    image: nginx:alpine
    ports:
      - 80:80
    volumes:
      - type: bind
        source: ./conf
        target: /etc/nginx/conf.d/default.conf
```
```nginx
# conf
server {
    listen 80;

    location /api/ {
        proxy_pass http://<YOUR IP ADDRESS>:9999/;
        proxy_set_header Host example.com;
    }
}
```

部署你的应用：

```bash
docker-compose up -d
sanic server.app --port=9999 --host=0.0.0.0
```

这是使用 Nginx 代理的最简单的方式，而不一定是实践的最佳方式，有许多方式可以让你的系统更加高效且可扩展，例如使用 Nginx 开启：
- 文本文件压缩
- 开启长连接
- 配置负载均衡

如果你想了解更多实践策略，请继续阅读本文的剩余部分。

## 2.3 开启压缩

## 2.4 Docker 部署

### 2.4.1 安装 Docker 和 Docker Compose

安装 Docker：

```bash
yum install docker
```

检查 Docker 安装是否成功：

```bash
docker --version
```

启动 Docker 容器：

```bash
systemctl start docker
```

安装 Docker Compose，最新版本的安装命令可以参考 [官网提示](https://docs.docker.com/compose/install/compose-plugin/)：

```bash
curl -SL https://github.com/docker/compose/releases/download/v2.6.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

查看 Docker Compose 版本：

```bash
docker-compose version
```

如果安装后 `docker-compose` 命令不能使用，可以使用下面的命令进行链接：

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```





