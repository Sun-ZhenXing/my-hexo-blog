---
title: Rust 学习（一）
date: 2022-08-01 09:23:22
categories:
    - Rust
tags:
    - Rust
---

Rust 学习（一）

<!-- more -->

# 1. 入门指南

## 1.1 Hello World

Rust 语言由 Mozilla 开发，最早发布于 2014 年 9 月。

Rust 语言的特点：

- **高性能**：Rust 速度惊人且内存利用率极高。由于没有运行时和垃圾回收，它能够胜任对性能要求特别高的服务，可以在嵌入式设备上运行，还能轻松和其他语言集成。
- **可靠性**：Rust 丰富的类型系统和所有权模型保证了内存安全和线程安全，让您在编译期就能够消除各种各样的错误。
- **生产力**：Rust 拥有出色的文档、友好的编译器和清晰的错误提示信息， 还集成了一流的工具 —— 包管理器和构建工具， 智能地自动补全和类型检验的多编辑器支持， 以及自动格式化代码等等。

作为一种系统级别的编程语言，Rust 适用于：

- **传统命令行程序**：Rust 编译器可以直接生成目标可执行程序，不需要任何解释程序。
- **Web 应用**：Rust 可以被编译成 WebAssembly，WebAssembly 是一种 JavaScript 的高效替代品。
- **网络服务器**：Rust 用极低的资源消耗做到安全高效，且具备很强的大规模并发处理能力，十分适合开发普通或极端的服务器程序。
- **嵌入式设备**：Rust 同时具有 JavaScript 一般的高效开发语法和 C 语言的执行效率，支持底层平台的开发。

下面是 Hello World 代码：

```rust
fn main() {
    println!("Hello, world!");
}
```

使用下面的命令执行：

```bash
rustc main.rs
# 对于类 Unix 系统
./main
# Windows 下是 .\main.exe
```

- Rust 源文件总是以 `.rs` 扩展名结尾
- Rust 的缩进风格使用 4 个空格，而不是 1 个制表符
- `println!` 调用了一个 Rust 宏（macro），而不是一个函数
- Rust 是编译型语言，`rustc` 是 Rust 语言的编译器
- 类似于 `gofmt`，Rust 提供了一个代码格式化工具 `rustfmt`
- Rust 提供了一个包管理工具 `cargo`，这将在下一节介绍

## 1.2 Hello Cargo

Cargo 是 Rust 默认的包管理工具，查看版本：

```bash
cargo --version
# cargo 1.62.1
```

使用 `cargo` 创建项目：

```bash
cargo new hello_cargo
cd hello_cargo
```

这将创建一个 Hello World 项目到当前目录下，包含初始化的 Git 仓库。

```bash
cargo build
```

这将构建整个项目，并产生对应的二进制文件。下面可以执行这个二进制文件：

```bash
./target/debug/hello_cargo
```

- `cargo new` 创建项目
- `cargo build` 构建项目
- `cargo run` 一步构建并运行项目
- `cargo check` 在不生成二进制文件的情况下构建项目来检查错误

构建 Release 版本的二进制文件：

```bash
cargo build --release
```
