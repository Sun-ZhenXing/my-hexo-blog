---
title: RESTful API 设计
date: 2022-06-08 15:00:04
categories:
  - [计算机网络, RESTful 规范]
tags:
  - RESTful
---

本文总结了一些 RESTful 设计规范和一些最佳实践。

<!-- more -->

# 1. 什么是 RESTful

<div class="note note-success">

REST 是 Representational State Transfer（表述性状态转移）的缩写，如果一个架构符合 REST 原则，就称它为 RESTful 架构。

RESTful 架构可以充分的利用 HTTP 协议的各种功能，是 HTTP 协议的最佳实践。

RESTful API 是一种软件架构风格、设计风格，可以让软件更加清晰，更简洁，更有层次，可维护性更好。

</div>

## 1.1 设计概览

| API                            | 功能                         |
| ------------------------------ | ---------------------------- |
| `GET /zoos`                    | 列出所有动物园               |
| `POST /zoos`                   | 新建一个动物园               |
| `GET /zoos/:id`                | 获取某个指定动物园的信息     |
| `PUT /zoos/:id`                | 更新某个指定动物园的全部信息 |
| `PATCH /zoos/:id`              | 更新某个指定动物园的部分信息 |
| `DELETE /zoos/:id`             | 删除某个动物园               |
| `GET /zoos/:id/animals`        | 列出某个指定动物园的所有动物 |
| `DELETE /zoos/:id/animals/:id` | 删除某个指定动物园的指定动物 |

**核心概念：请求 = 动词 + 宾语**

- **动词** 使用五种 HTTP 方法，对应 `CRUD` 操作
- **宾语** URL 应该全部使用名词复数，可以有例外，比如搜索可以使用更加直观的 `search`
- **过滤信息**（Filtering）如果记录数量很多，API 应该提供参数，过滤返回结果
    - `?limit=10` 指定返回记录的数量
    - `?offset=10` 指定返回记录的开始位置
    - `?page=2&per_page=100` 指定第几页，以及每页的记录数
    - `?sortby=name&order=asc` 指定返回结果按照哪个属性排序，以及排序顺序
    - `?animal_type_id=1` 指定筛选条件

参数的设计允许存在冗余，即允许 API 路径和 URL 参数偶尔有重复。比如，`GET /zoo/ID/animals` 与 `GET /animals?zoo_id=ID` 的含义是相同的。

## 1.2 设计约束

与任何其他架构风格一样，REST 也有自己的六个引导约束，如果接口需要被称为 RESTful，则必须满足这些约束。这些原则如下：
- **客户端 - 服务器**：通过将用户接口问题与数据存储问题分开，我们通过简化服务器组件来提高跨多个平台的用户接口的可移植性并提高可伸缩性。
- **无状态**：从客户端到服务器的每个请求都必须包含理解请求所需的所有信息，并且不能利用服务器上任何存储的上下文。因此，会话状态完全保留在客户端上。
- **可缓存**：缓存约束要求将对请求的响应中的数据隐式或显式标记为可缓存或不可缓存。如果响应是可缓存的，则客户端缓存有权重用该响应数据以用于以后的等效请求。
- **统一接口**：通过将通用性的软件工程原理应用于组件接口，简化了整个系统架构，提高了交互的可见性。为了获得统一的接口，需要多个架构约束来指导组件的行为。RESTful 由四个接口约束定义：
    - 资源识别
    - 通过陈述来处理资源
    - 自我描述性的信息
    - 超媒体作为应用程序状态的引擎
- **分层系统**：分层系统风格允许通过约束组件行为来使体系结构由分层层组成，这样每个组件都不能“看到”超出与它们交互的直接层。
- **按需编码**（可选）：RESTful 允许通过以小程序或脚本的形式下载和执行代码来扩展客户端功能。这通过减少预先实现所需的功能数量来简化客户端。

# 2. 设计 API

## 2.1 API 请求

| 动词     | 功能                           |
| -------- | ------------------------------ |
| `GET`    | 读取（Read）                   |
| `POST`   | 新建（Create）                 |
| `PUT`    | 更新（Update）                 |
| `PATCH`  | 更新（Update），通常是部分更新 |
| `DELETE` | 删除（Delete）                 |

下面都是错误的：
- `/getAllCars`
- `/createNewCar`
- `/deleteAllRedCars`

## 2.2 API 响应

状态码：
- 1xx 相关信息
- 2xx 操作成功
- 3xx 重定向
- 4xx 客户端错误
- 5xx 服务器错误

客户端的每一次请求，服务器都必须给出回应。回应包括 HTTP 状态码和数据两部分。

五大类状态码，总共 100 多种，覆盖了绝大部分可能遇到的情况。每一种状态码都有约定的解释，客户端只需查看状态码，就可以判断出发生了什么情况。API 不需要 1xx 状态码。

<div class="note note-success">

[*菜鸟：HTTP 状态码参考*](https://www.runoob.com/http/http-status-codes.html)

</div>

| 状态码 | 名称                   | 含义                                                                                  |
| ------ | ---------------------- | ------------------------------------------------------------------------------------- |
| `400`  | Bad Request            | 服务器不理解客户端的请求，未做任何处理                                                |
| `401`  | Unauthorized           | 用户未提供身份验证凭据，或者没有通过身份验证                                          |
| `403`  | Forbidden              | 用户通过了身份验证，但是不具有访问资源所需的权限                                      |
| `404`  | Not Found              | 所请求的资源不存在，或不可用                                                          |
| `405`  | Method Not Allowed     | 用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内                            |
| `410`  | Gone                   | 所请求的资源已从这个地址转移，不再可用                                                |
| `415`  | Unsupported Media Type | 客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式 |
| `422`  | Unprocessable Entity   | 客户端上传的附件无法处理，导致请求失败                                                |
| `429`  | Too Many Requests      | 客户端的请求次数超过限额                                                              |

- 客户端请求时，要明确告诉服务器，接受 JSON 格式，请求的 HTTP 头的 ACCEPT 属性要设成 `application/json`
- 服务端返回的数据，不应该是纯文本，而应该是一个 JSON 对象。服务器回应的 HTTP 头的 `Content-Type` 属性要设为 `application/json`
- 错误处理 如果状态码是 4xx，就应该向用户返回出错信息。一般来说，返回的信息中将 `error` 作为键名，出错信息作为键值即可：`{error: "Invalid API key"}`
- 认证 RESTful API 应该是无状态，每个请求应该带有一些认证凭证。推荐使用 JWT 认证，并且使用 SSL
- Hypermedia 即返回结果中提供链接，连向其他 API 方法，使得用户不查文档，也知道下一步应该做什么

API 的身份认证应该使用 [OAuth 2.0](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html) 框架。

## 2.3 服务器和域名

API 与用户的通信协议，尽量使用 HTTPS 协议。

应该尽量将 API 部署在专用域名之下。

```text
https://api.example.com
```

如果确定 API 很简单，不会有进一步扩展，可以考虑放在主域名下：

```text
https://example.org/api/
```

应该将 API 的版本号放入 URL：

```text
https://api.example.com/v1/
```

另一种做法是，将版本号放在 HTTP 头信息中，但不如放入 URL 方便和直观。也可以参考 [GitHub 采取的做法](https://docs.github.com/en/rest/overview/media-types) 。

## 2.4 路径

路径又称 “终点”（endpoint），表示 API 的具体网址。

在 RESTful 架构中，每个网址代表一种资源（Resource），所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的 “集合”（Collection），所以 API 中的名词也应该使用复数。

举例来说，有一个 API 提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样：

```text
https://api.example.com/v1/zoos
https://api.example.com/v1/animals
https://api.example.com/v1/employees
```

对于资源的具体操作类型，由 HTTP 动词表示。

常用的 HTTP 动词有五个，还有两个不常用的 HTTP 动词。

- `HEAD`：获取资源的元数据
- `OPTIONS`：获取信息，关于资源的哪些属性是客户端可以改变的

# 3. 动词覆盖

# 4. Hypermedia

RESTful API 最好做到 Hypermedia，即返回结果中提供链接，连向其他 API 方法，使得用户不查文档，也知道下一步应该做什么。

比如，当用户向 `api.example.com` 的根目录发出请求，会得到这样一个文档：

```json
{
    "link": {
        "rel":   "collection https://www.example.com/zoos",
        "href":  "https://api.example.com/zoos",
        "title": "List of zoos",
        "type":  "application/vnd.yourformat+json"
    }
}
```

上面代码表示，文档中有一个 `link` 属性，用户读取这个属性就知道下一步该调用什么 API 了。`rel` 表示这个 API 与当前网址的关系（Collection 关系，并给出该 Collection 的网址），`href` 表示 API 的路径，`title` 表示 API 的标题，`type` 表示返回类型。

Hypermedia API 的设计被称为 [HATEOAS](https://zhuanlan.zhihu.com/p/96027191) 。Github 的 API 就是这种设计，访问 `api.github.com` 会得到一个所有可用 API 的网址列表。

```json
{
  "current_user_url": "https://api.github.com/user",
  "authorizations_url": "https://api.github.com/authorizations",
  // ...
}
```

从上面可以看到，如果想获取当前用户的信息，应该去访问 `api.github.com/user`，然后就得到了下面结果：

```json
{
  "message": "Requires authentication",
  "documentation_url": "https://developer.github.com/v3"
}
```

上面代码表示，服务器给出了提示信息，以及文档的网址。

## 参考

[1] RESTful：一种流行的 API 设计风格，<https://restfulapi.cn/>

[2] 什么是 REST，<http://restful.p2hp.com/>
