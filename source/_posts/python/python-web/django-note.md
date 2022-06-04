---
title: Django 入门笔记
date: 2022-05-28 16:24:50
categories:
  - [Python, Web 开发]
tags:
  - Python
  - Web 开发
---

由于课程作业需要，简单入门 Django 学习开发，这是一篇入门笔记。

<!-- more -->

<div class="note note-success">

本文所介绍的例子都可以在 Django Project 网站上找到：
1. 第 1 部分：<https://docs.djangoproject.com/zh-hans/4.0/intro/tutorial01/>
2. 第 2 部分：<https://docs.djangoproject.com/zh-hans/4.0/intro/tutorial02/>
3. 第 3 部分：<https://docs.djangoproject.com/zh-hans/4.0/intro/tutorial03/>
4. 第 4 部分：<https://docs.djangoproject.com/zh-hans/4.0/intro/tutorial04/>
5. 第 5 部分：<https://docs.djangoproject.com/zh-hans/4.0/intro/tutorial05/>
6. 第 6 部分：<https://docs.djangoproject.com/zh-hans/4.0/intro/tutorial06/>
7. 第 7 部分：<https://docs.djangoproject.com/zh-hans/4.0/intro/tutorial07/>
8. 如何编写可重用程序：<https://docs.djangoproject.com/zh-hans/4.0/intro/reusable-apps/>
9. 下一步阅读什么：<https://docs.djangoproject.com/zh-hans/4.0/intro/whatsnext/>

</div>

# 1. 第一个 Django 应用

## 1.1 Django 简介

Django 最初被设计用于具有快速开发需求的新闻类站点，目的是要实现简单快捷的网站开发。以下内容简要介绍了如何使用 Django 实现一个数据库驱动的网络应用。

让我们通过示例来学习，通过这个教程，我们将带着你创建一个基本的投票应用程序。

它将由两部分组成：
1. 一个让人们查看和投票的公共站点
2. 一个让你能添加、修改和删除投票的管理站点

## 1.2 安装 Django

注意：本文使用最新的 Django 4.0 开始我们的第一个应用，这要求 Python 版本高于 3.8 。

```bash
pip install Django
```

测试是否安装成功：

```bash
python -m django --version
```

## 1.3 配置应用

创建我们的第一个 Django 应用：

```bash
django-admin startproject mysite
```

<div class="note note-warning">

你的项目名不应该是任何 Python 关键字或者保留字，也不应该使用除了英文之外的其他语言，尽量不要包含空格。最好避免和其他内置库或者第三方模块的名字冲突。

</div>

命令执行成功后会在当前文件夹下创建 `mysite` 文件夹，其目录结构为：
- `mysite`
    - `manage.py`
    - `mysite/`
        - `asgi.py`
        - `settings.py`
        - `urls.py`
        - `wsgi.py`
        - `__init__.py`

这些目录和文件的用处是：
- 最外层的 `mysite/` 根目录只是你项目的容器
- `manage.py`：一个让你用各种方式管理 Django 项目的命令行工具。你可以阅读 [`django-admin` 和 `manage.py`](https://docs.djangoproject.com/zh-hans/4.0/ref/django-admin/) 获取所有 `manage.py` 的细节
- 里面一层的 `mysite/` 目录包含你的项目，它是一个纯 Python 包
- `mysite/__init__.py`：一个空文件
- `mysite/settings.py`：Django 项目的配置文件。可参考 [Django 配置](https://docs.djangoproject.com/zh-hans/4.0/topics/settings/)
- `mysite/urls.py`：Django 项目的 URL 声明，可参考 [URL 调度器](https://docs.djangoproject.com/zh-hans/4.0/topics/http/urls/)
- `mysite/asgi.py`：作为你的项目的运行在 ASGI 兼容的 Web 服务器上的入口。可参考 [如何使用 ASGI 来部署](https://docs.djangoproject.com/zh-hans/4.0/howto/deployment/asgi/)
- `mysite/wsgi.py`：作为你的项目的运行在 WSGI 兼容的 Web 服务器上的入口。可参考 [如何使用 WSGI 进行部署](https://docs.djangoproject.com/zh-hans/4.0/howto/deployment/wsgi/)

下面启动 **开发版本服务器**：

```bash
python manage.py runserver
```

然后在浏览器打开你的服务地址 <http://127.0.0.1:8000/> 来查看效果。

你已经启动了 Django 开发服务器，这是一个用纯 Python 编写的轻量级网络服务器。我们在 Django 中包含了这个服务器，所以你可以快速开发，而不需要处理配置生产服务器的问题。

<div class="note note-success">

如果需要修改端口：

```bash
python manage.py runserver 8080
```

如果需要监听到 `0.0.0.0`，可以：

```bash
python manage.py runserver 0:8000
```

用于开发的服务器在需要的情况下会对每一次的访问请求重新载入一遍 Python 代码。所以你不需要为了让修改的代码生效而频繁的重新启动服务器。然而，一些动作，比如添加新文件，将不会触发自动重新加载，这时你得自己手动重启服务器。

</div>

## 1.4 开始创建应用

在 Django 中，每一个应用都是一个 Python 包，并且遵循着相同的约定。Django 自带一个工具，可以帮你生成应用的基础目录结构，这样你就能专心写代码，而不是创建目录了。

确保你在 `manage.py` 同级的目录下面，下面我们创建一个应用：

```bash
python manage.py startapp polls
```

这将会创建 `polls` 目录，其结构如下：

- `polls/`
    - `__init__.py`
    - `admin.py`
    - `apps.py`
    - `models.py`
    - `tests.py`
    - `views.py`
    - `migrations/`
        - `__init__.py`

这个目录结构包括了投票应用的全部内容。可以在 VS Code 或者 PyCharm 中打开 `mysite` 项目，以便编写代码。

你的目录结构如下：

- `db.sqlite3`
- `manage.py`
- `mysite/`
    - `__init__.py`
    - `asgi.py`
    - `settings.py`
    - `urls.py`
    - `wsgi.py`
- `polls/`
    - `__init__.py`
    - `admin.py`
    - `apps.py`
    - `migrations/`
        - `__init__.py`
    - `models.py`
    - `tests.py`
    - `views.py`

打开 `polls/views.py`，编辑：

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse(
        "Hello, world. You're at the polls index.")
```

其类型可以被注解：

```python
from django.http import HttpRequest, HttpResponse

def index(request: HttpRequest) -> HttpResponse:
    return HttpResponse(
        "Hello, world. You're at the polls index.")
```

在 `polls` 目录下新建 `urls.py` 文件，然后输入下面的代码：

```python
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

修改 `mysite/urls.py` 代码，现在它看上去应该是这样的：

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

> 当包括其它 URL 模式时你应该总是使用 `include()`，`admin.site.urls` 是唯一例外。

现在运行服务器：

```bash
python manage.py runserver
```

访问 <http://127.0.0.1:8000/polls/>，可以看到我们返回的结果：

```text
Hello, world. You're at the polls index.
```

## 1.5 path 函数解析

函数 `path()` 具有四个参数，两个必须参数：`route` 和 `view`，两个可选参数：`kwargs` 和 `name` 。

### 1.5.1 route 参数

路由，即 `route` 是一个匹配 URL 的准则（类似正则表达式）。当 Django 响应一个请求时，它会从 `urlpatterns` 的第一项开始，按顺序依次匹配列表中的项，直到找到匹配的项。

这些准则不会匹配 `GET` 和 `POST` 参数或域名。例如，`URLconf` 在处理请求 `https://www.example.com/myapp/` 时，它会尝试匹配 `myapp/` 。处理请求 `https://www.example.com/myapp/?page=3` 时，也只会尝试匹配 `myapp/` 。

### 1.5.2 view 参数

当 Django 找到了一个匹配的准则，就会调用这个特定的视图函数，并传入一个 `HttpRequest` 对象作为第一个参数，被 “捕获” 的参数以关键字参数的形式传入。

### 1.5.3 kwargs 参数

任意个关键字参数可以作为一个字典传递给目标视图函数。

### 1.5.4 name 参数

`name` 将为你的 URL 取名，这能使你在 Django 的任意地方唯一地引用它，尤其是在模板中。这个有用的特性允许你只改一个文件就能全局地修改某个 URL 模式。

# 8. 如何编写可重用程序

# 9. 下一步阅读什么

# 参考

[1] Django 4.0 文档，Django Project，<https://docs.djangoproject.com/zh-hans/4.0/intro/tutorial01/>
