---
title: Java 多线程
date: 2022-06-03 20:22:14
categories:
  - [Java, Java 语言]
tags:
  - Java
  - 多线程
---

本文是 [*狂神说 Java：多线程详解*](https://www.bilibili.com/video/BV1V4411p7EF) 的课程笔记。

<!-- more -->

# 1. 多线程

## 1.1 多线程简介

为了理解各种概念之间的区别和联系，建议去了解下面的概念的具体含义：
- 并发
- 多线程
- 多进程
- 超线程
- 协程
- 纤程
- 绿色线程

一个进程（Process）可以有多个线程（Thread），例如视频中的声音、图像和其他任务。

程序是指令和数据的集合，其本身没有运行的含义，是一个静态概念。

而进程是程序的一次执行过程，是一个动态的概念，是系统分配资源的单位。

通常在一个进程中可以包含若干个线程，一个进程至少会包含一个线程，线程是 CPU 调度和执行的单位。

<div class="note note-warning">

注意：很多多线程的效果是模拟出来的，因为具体取决于 CPU 的核心数，在一个核心的情况下（没有超线程情况下）在同一个时间，CPU 只能执行一段代码，因为上下文切换比较快，所以有同时执行的错觉。

</div>

其他注意事项：
- Java 程序即使没有创建线程，后台也会有很多线程，例如主线程、gc 线程
- `main()` 函数所在的线程是主线程，是整个程序的入口
- 在一个进程中，如果开辟了多个线程，线程的运行由调度器安排调度，调度器与操作系统密切相关，不能被人为干预
- 对于同一份资源，会存在资源抢夺的问题，需要加入并发控制
- 线程会带来额外的开销，如 CPU 调度时间，并发控制开销
- 每个线程在自己工作的内存内进行交互，如果内存控制不当会造成数据的不一致

## 1.2 线程实现

线程有三种创建方式：
1. 继承 `Thread` 类
2. 实现 `Runnable` 接口
3. 实现 `Callable` 接口

### 1.2.1 继承 `Thread` 类

```java
public class TestThread extends Thread {
    public static void main(String[] args) {
        TestThread t = new TestThread();
        t.start();
        for (int i = 0; i < 1000; i++) {
            System.out.println("main thread");
        }
    }

    @Override
    public void run() {
        System.out.println("run thread");
        for (int i = 0; i < 1000; i++) {
            System.out.println("run thread");
        }
    }
}
```

下面列举一个实例：多线程下载图片。

我们需要导入 `commons-io-2.6.jar` 包，然后编写下面的测试代码：

```java
import org.apache.commons.io.FileUtils;
import java.net.URL;
import java.io.File;
import java.io.IOException;

public class TestThread extends Thread {
    private String url;
    private String fileName;

    public TestThread(String url, String fileName) {
        this.url = url;
        this.fileName = fileName;
    }

    @Override
    public void run() {
        try {
            WebDownloader webDownloader = new WebDownloader();
            webDownloader.download(url, fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        TestThread testThread1 = new TestThread("https://www.baidu.com/img/bd_logo1.png", "baidu1.png");
        TestThread testThread2 = new TestThread("https://www.baidu.com/img/bd_logo2.png", "baidu2.png");
        TestThread testThread3 = new TestThread("https://www.baidu.com/img/bd_logo3.png", "baidu3.png");
        testThread1.start();
        testThread2.start();
        testThread3.start();
    }

}

class WebDownloader {
    public void download(String url, String fileName) throws IOException {
        FileUtils.copyURLToFile(new URL(url), new File(fileName));
    }
}
```

### 1.2.2 实现 `Runnable` 接口

实际开发时建议使用实现 `Runnable` 接口的方式来实现，因为 Java 单继承的局限性，继承 `Thread` 后无法进行扩展。而且实现接口的好处是通过代理，可以让一个对象被多个线程使用。

```java
public class TestThread implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
        }
    }

    public static void main(String[] args) throws IOException {
        TestThread t1 = new TestThread();
        new Thread(t1).start();
        for (int i = 0; i < 100; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
        }
    }
}
```

### 1.2.3 并发问题

我们先模拟一个买票问题：

```java
public class TestThread implements Runnable {

    private int ticketNum = 10;

    @Override
    public void run() {
        while (ticketNum > 0) {
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + ": " + ticketNum--);
        }
    }

    public static void main(String[] args) throws IOException {
        TestThread t = new TestThread();
        new Thread(t, "Alex").start();
        new Thread(t, "Bob").start();
        new Thread(t, "Cindy").start();
    }
}
```

## 1.3 线程状态



## 1.4 线程同步

## 1.5 线程通信问题

## 1.6 高级



