---
title: Django 入门笔记
date: 2022-05-28 16:24:50
mermaid: true
categories:
  - [Python, Web 开发]
tags:
  - Python
  - Web 开发
  - Django
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

<div class="note note-warning">

**版本要求**

注意：本文使用最新的 Django 4.0 开始我们的第一个应用，这要求 Python 版本高于 3.8 。

</div>

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

**命名规则**

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

忽略有关未应用最新数据库迁移的警告，稍后我们处理数据库。

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

`0` 是 `0.0.0.0` 的简写，有关 `runserver` 的信息可以参阅 [`runserver`](https://docs.djangoproject.com/zh-hans/4.0/ref/django-admin/#django-admin-runserver) 。

</div>

## 1.4 开始创建应用

在 Django 中，**每一个应用都是一个 Python 包**，并且遵循着相同的约定。Django 自带一个工具，可以帮你生成应用的基础目录结构，这样你就能专心写代码，而不是创建目录了。

<div class="note note-info">

**项目 VS 应用**

项目和应用有什么区别？应用是一个专门做某件事的网络应用程序 —— 比如博客系统，或者公共记录的数据库，或者小型的投票程序。项目则是一个网站使用的配置和应用的集合。项目可以包含很多个应用。应用可以被很多个项目使用。

</div>

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

<div class="note note-warning">

当包括其它 URL 模式时你应该总是使用 `include()`，`admin.site.urls` 是唯一例外。

</div>

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

# 2. 第二部分：创建数据模型

## 2.1 数据库配置

现在，打开 `mysite/settings.py` 。这是个包含了 Django 项目设置的 Python 模块。

通常，这个配置文件使用 SQLite 作为默认数据库，Python 内置 SQLite，所以你无需安装额外东西来使用它。
如果你想使用其他数据库，你需要安装合适的 [database bindings](https://docs.djangoproject.com/zh-hans/4.0/topics/install/#database-installation)，然后改变设置文件中 [DATABASES](https://docs.djangoproject.com/zh-hans/4.0/ref/settings/#std-setting-DATABASES) `'default'` 项目中的一些键值：

- `ENGINE`：可选值有
    - `'django.db.backends.sqlite3'`
    - `'django.db.backends.postgresql'`
    - `'django.db.backends.mysql'`
    - `'django.db.backends.oracle'`
    - [其它可用后端](https://docs.djangoproject.com/zh-hans/4.0/ref/databases/#third-party-notes)
- `NAME`：数据库的名称
    - 如果你使用 SQLite，数据库将是你电脑上的一个文件，在这种情况下，NAME 应该是此文件完整的绝对路径，包括文件名。默认值 `BASE_DIR / 'db.sqlite3'` 将把数据库文件储存在项目的根目录
    - 如果你不使用 SQLite，则必须添加一些额外设置，比如 `USER`、`PASSWORD`、`HOST` 等等。想了解更多数据库设置方面的内容，请看文档：[DATABASES](https://docs.djangoproject.com/zh-hans/4.0/ref/settings/#std-setting-DATABASES)

<div class="note note-success">

**SQLite 以外的其它数据库？**

如果你使用了 SQLite 以外的数据库，请确认在使用前已经创建了数据库。你可以通过在你的数据库交互式命令行中使用 `"CREATE DATABASE database_name;"` 命令来完成这件事。

另外，还要确保该数据库用户中提供 `mysite/settings.py` 具有 `"create database"` 权限。这使得自动创建的 [test database](https://docs.djangoproject.com/zh-hans/4.0/topics/testing/overview/#the-test-database) 能被以后的教程使用。

如果你使用 SQLite，那么你不需要在使用前做任何事 —— 数据库会在需要的时候自动创建。

</div>

编辑 `mysite/settings.py` 文件前，先设置 [`TIME_ZONE`](https://docs.djangoproject.com/zh-hans/4.0/ref/settings/#std-setting-TIME_ZONE) 为你自己时区。

<div class="note note-success">

**设置时区和语言**

时区默认值 `'America/Chicago'`（即 `GMT -05:00` 时间），创建新项目模板时时区为 `'UTC'`（即 `GMT 0` 时间）。

中国大陆的时区请设置为北京时间：`'Asia/Shanghai'`，其他时区列表参见 [维基百科：时区](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) 。

同时设置语言为简体中文：

```python
LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'
```

设置详情参考：
- [i18n：时区](https://docs.djangoproject.com/zh-hans/4.0/topics/i18n/timezones/)
- [i18n：翻译](https://docs.djangoproject.com/zh-hans/4.0/topics/i18n/translation/)

</div>

此外，关注一下文件头部的 `INSTALLED_APPS` 设置项。这里包括了会在你项目中启用的所有 Django 应用。应用能在多个项目中使用，你也可以打包并且发布应用，让别人使用它们。

通常，`INSTALLED_APPS` 默认包括了以下 Django 的自带应用：
- `django.contrib.admin`：管理员站点，你很快就会使用它
- `django.contrib.auth`：认证授权系统
- `django.contrib.contenttypes`：内容类型框架
- `django.contrib.sessions`：会话框架
- `django.contrib.messages`：消息框架
- `django.contrib.staticfiles`：管理静态文件的框架

这些应用被默认启用是为了给常规项目提供方便。

默认开启的某些应用需要至少一个数据表，所以，在使用他们之前需要在数据库中创建一些表。请执行以下命令：

```bash
python manage.py migrate
```

这个 [`migrate`](https://docs.djangoproject.com/zh-hans/4.0/ref/django-admin/#django-admin-migrate) 命令查看 [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/4.0/ref/settings/#std-setting-INSTALLED_APPS) 配置，并根据 `mysite/settings.py` 文件中的数据库配置和随应用提供的数据库迁移文件（我们将在后面介绍这些），创建任何必要的数据库表。

你会看到它应用的每一个迁移都有一个消息。如果你有兴趣，运行你的数据库的命令行客户端，输入 `\dt`（PostgreSQL），`SHOW TABLES;`（MariaDB，MySQL），`.tables`（SQLite）或 `SELECT TABLE_NAME FROM USER_TABLES;`（Oracle）来显示 Django 创建的表。

<div class="note note-success">

**写给极简主义者**

就像之前说的，为了方便大多数项目，我们默认激活了一些应用，但并不是每个人都需要它们。如果你不需要某个或某些应用，你可以在运行 `migrate` 前毫无顾虑地从 `INSTALLED_APPS` 里注释或者删除掉它们。`migrate` 命令只会为在 `INSTALLED_APPS` 里声明了的应用进行数据库迁移。

</div>

## 2.2 创建模型

在 Django 里写一个数据库驱动的 Web 应用的第一步是定义模型，也就是数据库结构设计和附加的其它元数据。

<div class="note note-success">

**设计哲学**

一个模型就是单个定义你的数据的信息源。模型中包含了不可缺少的数据区域和你存储数据的行为。Django 遵循 [DRY 原则](https://docs.djangoproject.com/zh-hans/4.0/misc/design-philosophies/#dry) 。目的就是定义你的数据模型要在一位置上，而且自动从该位置推导一些事情。

来介绍一下迁移：举个例子，不像 Ruby On Rails，Django 的迁移代码是由你的模型文件自动生成的，它本质上是个历史记录，Django 可以用它来进行数据库的滚动更新，通过这种方式使其能够和当前的模型匹配。

</div>

在这个投票应用中，需要创建两个模型：问题 `Question` 和选项 `Choice` 。`Question` 模型包括问题描述和发布时间。`Choice` 模型有两个字段，选项描述和当前得票数。每个选项属于一个问题。

这些概念可以通过一个 Python 类来描述。按照下面的例子来编辑 `polls/models.py` 文件：

```python
# polls/models.py
from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

每个模型被表示为 `django.db.models.Model` 类的子类。每个模型有许多类变量，它们都表示模型里的一个数据库字段。

每个字段都是 `Field` 类的实例，比如
- 字符字段被表示为 `CharField`
- 日期时间字段被表示为 `DateTimeField`

这将告诉 Django 每个字段要处理的数据类型。

每个 `Field` 类实例变量的名字（例如 `question_text` 或 `pub_date`）也是字段名，所以最好使用对机器友好的格式。你将会在 Python 代码里使用它们，而数据库会将它们作为列名。

你可以使用可选的选项来为 `Field` 定义一个人类可读的名字。这个功能在很多 Django 内部组成部分中都被使用了，而且作为文档的一部分。如果某个字段没有提供此名称，Django 将会使用对机器友好的名称，也就是变量名。在上面的例子中，我们只为 `Question.pub_date` 定义了对人类友好的名字。对于模型内的其它字段，它们的机器友好名也会被作为人类友好名使用。

定义某些 `Field` 类实例需要参数。例如 `CharField` 需要一个 `max_length` 参数。这个参数的用处不止于用来定义数据库结构，也用于验证数据，我们稍后将会看到这方面的内容。

`Field` 也能够接收多个可选参数；在上面的例子中：我们将 `votes` 的 `default` 也就是默认值，设为 `0` 。

注意在最后，我们使用 `ForeignKey` 定义了一个关系。这将告诉 Django，每个 `Choice` 对象都关联到一个 `Question` 对象。Django 支持所有常用的数据库关系：多对一、多对多和一对一。

## 2.3 激活模型

上面的一小段用于创建模型的代码给了 Django 很多信息，通过这些信息，Django 可以：
- 为这个应用创建数据库 `schema`（生成 `CREATE TABLE` 语句）
- 创建可以与 `Question` 和 `Choice` 对象进行交互的 Python 数据库 API

但是首先得把 `polls` 应用安装到我们的项目里。

<div class="note note-success">

**设计哲学**

Django 应用是 “可插拔” 的。你可以在多个项目中使用同一个应用。除此之外，你还可以发布自己的应用，因为它们并不会被绑定到当前安装的 Django 上。

</div>

为了在我们的工程中包含这个应用，我们需要在配置类 `INSTALLED_APPS` 中添加设置。因为 `PollsConfig` 类写在文件 `polls/apps.py` 中，所以它的点式路径是 `'polls.apps.PollsConfig'` 。在文件 `mysite/settings.py` 中 `INSTALLED_APPS` 子项添加点式路径后，它看起来像这样：

```python
# mysite/settings.py
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

现在你的 Django 项目会包含 `polls` 应用。接着运行下面的命令：

```python
python manage.py makemigrations polls
```

你将会看到类似于下面这样的输出：

```log
Migrations for 'polls':
  polls/migrations/0001_initial.py
    - Create model Question
    - Create model Choice
```

通过运行 `makemigrations` 命令，Django 会检测你对模型文件的修改（在这种情况下，你已经取得了新的），并且把修改的部分储存为一次 *迁移*。

迁移是 Django 对于模型定义（也就是你的数据库结构）的变化的储存形式，它们其实也只是一些你磁盘上的文件。如果你想的话，你可以阅读一下你模型的迁移数据，它被储存在 `polls/migrations/0001_initial.py` 里。别担心，你不需要每次都阅读迁移文件，但是它们被设计成人类可读的形式，这是为了便于你手动调整 Django 的修改方式。

Django 有一个自动执行数据库迁移并同步管理你的数据库结构的命令，这个命令是 `migrate`，我们马上就会接触它，但是首先，让我们看看迁移命令会执行哪些 SQL 语句。`sqlmigrate` 命令接收一个迁移的名称，然后返回对应的 SQL：

```sql
-- PostgreSQL
BEGIN;
--
-- Create model Question
--
CREATE TABLE "polls_question" (
    "id" serial NOT NULL PRIMARY KEY,
    "question_text" varchar(200) NOT NULL,
    "pub_date" timestamp with time zone NOT NULL
);
--
-- Create model Choice
--
CREATE TABLE "polls_choice" (
    "id" serial NOT NULL PRIMARY KEY,
    "choice_text" varchar(200) NOT NULL,
    "votes" integer NOT NULL,
    "question_id" integer NOT NULL
);
ALTER TABLE "polls_choice"
  ADD CONSTRAINT "polls_choice_question_id_c5b4b260_fk_polls_question_id"
    FOREIGN KEY ("question_id")
    REFERENCES "polls_question" ("id")
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "polls_choice_question_id_c5b4b260" ON "polls_choice" ("question_id");

COMMIT;
```

请注意以下几点：

- 输出的内容和你使用的数据库有关，上面的输出示例使用的是 PostgreSQL。
数据库的表名是由应用名(polls)和模型名的小写形式( question 和 choice)连接而来。（如果需要，你可以自定义此行为。）
主键(IDs)会被自动创建。(当然，你也可以自定义。)
默认的，Django 会在外键字段名后追加字符串 "_id" 。（同样，这也可以自定义。）
外键关系由 FOREIGN KEY 生成。你不用关心 DEFERRABLE 部分，它只是告诉 PostgreSQL，请在事务全都执行完之后再创建外键关系。
生成的 SQL 语句是为你所用的数据库定制的，所以那些和数据库有关的字段类型，比如 auto_increment (MySQL)、 serial (PostgreSQL)和 integer primary key autoincrement (SQLite)，Django 会帮你自动处理。那些和引号相关的事情 - 例如，是使用单引号还是双引号 - 也一样会被自动处理。
这个 sqlmigrate 命令并没有真正在你的数据库中的执行迁移 - 相反，它只是把命令输出到屏幕上，让你看看 Django 认为需要执行哪些 SQL 语句。这在你想看看 Django 到底准备做什么，或者当你是数据库管理员，需要写脚本来批量处理数据库时会很有用。
如果你感兴趣，你也可以试试运行 python manage.py check ;这个命令帮助你检查项目中的问题，并且在检查过程中不会对数据库进行任何操作。

现在，再次运行 migrate 命令，在数据库里创建新定义的模型的数据表：

## 2.4 初试 API

## 2.5 Django 管理页面

| 配置信息 | 内容              |
| -------- | ----------------- |
| 用户名   | `admin`           |
| 邮箱     | `***@foxmail.com` |
| 密码     | `szx1234567`      |

# 参考

[1] Django 4.0 文档，Django Project，<https://docs.djangoproject.com/zh-hans/4.0/intro/tutorial01/>
