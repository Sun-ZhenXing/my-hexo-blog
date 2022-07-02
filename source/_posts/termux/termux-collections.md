---
title: Termux 合集
date: 2022-06-21 14:51:20
categories:
  - Termux
tags:
  - Termux
  - Android
---

本文收集了一些 Termux 上的精彩应用。

<!-- more -->

# 1. Termux 入门

## 1.1 Termux 简介

## 1.2 Termux 安装

## 1.3 Termux 切换源

# 2. 文件共享

## 2.1 HTTP 协议共享

### 2.1.1 使用 Python

Python3 自带 HTTP 服务器，但速度远远慢于下面要介绍的 Nginx 和 `http-server` 服务器程序。

安装 Python3：

```bash
pkg install python
```

启动服务器：

```bash
python -m http.server 8888
```

### 2.1.2 使用 Nginx

Nginx 是目前速度最快的服务器程序之一，安装 Nginx 的命令如下：

```bash
pkg install nginx
```

配置方式和传统的 Nginx 没有差别，除了配置文件在 `/data/data/com.termux/files/usr/etc/nginx/` 目录下面。

如果您没有使用过 Nginx，您可以在网络上查找 Nginx 的资料，有大量配置 Nginx 的视频和文章。

### 2.1.3 使用 http-server

`http-server` 是基于 Node.js 的 Web 文件服务器，所以需要安装 Node.js：

```bash
# 安装 Node.js
pkg install nodejs-lts

# 安装 http-server
npm i -g http-server
```

启动服务器：

```bash
http-server -p 8080 -g
```

## 2.2 SFTP 协议

首先需要安装下面的组件

```bash
pkg install openssh
pkg install pure-ftpd
```

为了能远程登录，需要知道用户名和密码，并开启 SSH 服务：

```bash
# 查看 ip 地址
ip addr

# 查看用户名
whoami

# 修改密码，重复输入两遍即可
passwd

# 启动 ssh  服务
sshd

# 启动 SFTP 服务
pure-ftpd
```

然后可以在同一个局域网下，使用 SFTP 协议登录手机 IP 。用户名为 `$(whoami)`，密码为刚才修改的密码，端口为 `8022` 。登录成功即可远程管理手机上全部文件（必须是有权限的文件）。

使用 SFTP 协议复制、删除、移动文件的速度很快，实测传输超过 30 MB/s 。

`Ctrl+C` 即可中断服务，然后关闭 SSH 服务：

```bash
pkill sshd
```

# 3. Web 服务

在上一节我们介绍了一些 Web 服务器程序的安装，本节系统介绍如何搭载 Web 常见的 Web 服务。

## 3.1 Java 前后端分离

目前还没有官方支持 Docker，只有虚拟机方案，等支持 Docker 时本文将更新相关内容。

### 3.1.1 基本组件安装

安装 OpenJDK，不选择 17 默认也会安装 OpenJDK 17：

```bash
pkg install openjdk-17
```

如果需要安装 `redis`：

```bash
pkg install redis
```

目前还没有支持 MySQL，不过可以使用 MySQL 的替代品 MariaDB：

```bash
pkg install mariadb
```

## 3.2 Python Sanic 项目

### 3.2.1 Sanic 安装

Sanic 由于使用了 `uvloop`，而 `uvloop` 一直没有支持 Termux，本文也是等到 `uvloop` 支持了 Termux 才更新。

<div class="note note-warning">

目前 Termux 下直接安装 `uvloop` 会导致无法加载：

```bash
pip install uvloop
python -c 'import uvloop'
```

报错：

```text
ImportError:
    dlopen failed: cannot locate symbol "uv_pthread_sigmask"
```

由于 Termux 是通过库 `libuv` 来支持支持异步 I/O 的，必须加上 `--use-system-libuv` 才能正确安装，请继续阅读下面的安装方法。

</div>

目前可用的安装方法是首先安装 `uvloop`：

```bash
# 安装 libuv 支持
pkg install libuv -y

# 下载 uvloop 包
pip download uvloop
```

目前下载的包是 `uvloop-0.16.0.tar.gz`，如果更新的包出现问题，可用退回到这个版本：

```bash
tar -zxvf uvloop-0.16.0.tar.gz
cd uvloop-0.16.0.tar.gz
python setup.py build_ext --use-system-libuv
python setup.py install
```

如果没有报错就是安装成功，打开 Python 检查安装是否成功：

```bash
cd ..
python -c 'import uvloop'
```

如果没有报错代表 `uvloop` 已经可以正常使用了。

然后安装 `sanic`：

```bash
pip install sanic
```

安装成功后测试是否可以使用：

```bash
sanic . --simple
```

显示下面的内容说明安装正常：

```text
[2022-06-21 16:13:55 +0800] [16522] [INFO]
  ┌────────────────────────────────────────────────────────────────────┐
  │                           Sanic v22.3.2                            │
  │                 Goin' Fast @ http://127.0.0.1:8000                 │
  ├───────────────────────┬────────────────────────────────────────────┤
  │                       │     mode: production, single worker        │
  │     ▄███ █████ ██     │   server: sanic                            │
  │    ██                 │   python: 3.10.4                           │
  │     ▀███████ ███▄     │ platform: Linux-4.14.116-aarch64-with-libc │
  │                 ██    │ packages: sanic-routing==22.3.0            │
  │    ████ ████████▀     │                                            │
  │                       │                                            │
  │ Build Fast. Run Fast. │                                            │
  └───────────────────────┴────────────────────────────────────────────┘

[2022-06-21 16:13:55 +0800] [16522] [WARNING] Sanic is running in PRODUCTION mode. Consider using '--debug' or '--dev' while actively developing your application.
[2022-06-21 16:13:55 +0800] [16522] [INFO] Starting worker [16522]
```


# 4. 系统设置

## 4.1 阻止休眠

