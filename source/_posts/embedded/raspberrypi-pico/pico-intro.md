---
title: 树莓派 Pico 入门
date: 2022-06-17 15:36:10
categories:
  - [嵌入式, 树莓派 Pico]
tags:
  - 嵌入式
  - 树莓派
  - 树莓派 Pico
  - MicroPython
---

本文讲解树莓派 Pico 的一些特性和开发参考，以及如何使用 MicroPython 开发 Pico。

<!-- more -->

# 1. 树莓派 Pico

## 1.1 Pico 简介

2021 年 1 月 21 日，树莓派基金会发布了微处理器级新品 Raspberry Pi Pico。该产品基于树莓派基金会自研的 RP 2040 芯片构建，售价仅为 4 美元。据介绍，Pico 作为一款微处理器，它擅长低时延的 I/O 通信和模拟信号输入，功耗低，可以弥补树莓派在与物理世界互动方面的不足。

## 1.2 电路配置

<!-- TODO：插入描述图片 -->

主要配置：
- 搭载 RP2040 芯片
- 双核 ARM Cortex M0+ @133 MHz
- 搭载 264 KB 的片上 RAM，板载 2 MB 闪存
- 主机和设备支持的 USB1.1
- 支持低功耗的睡眠和休眠模式
- 采用拖放式编程
- 拥有 26 个 GPIO 引脚，其中 3 个可用于模拟信号输入（即 3 路 12 位 ADC）
- 拥有 2 个 SPI、2 个 I2C、2 个 UART、16 路 PWM
- 片上时钟、计时器；片上浮点库
- 搭载温度传感器
- 可通过 Micro USB 供电，也支持 1.8-5.5 V 直流电源供电
- 配备 1 个 LED 灯
- 和一个开关按钮，该按钮用于向 Pico 烧录程序时控制 Pico 进入 USB 大容量存储模式，也可用于通用的输入
- 40 个引脚均为 “焊孔 + 齿状边缘” 的形态，由用户灵活选择安装方式，便于与其他开发板焊接

## 1.3 参考文档链接

MicoPython 关于 RP2 的文档：<https://docs.micropython.org/en/latest/rp2/quickref.html> 。

Pico 的参考资料和芯片手册都可以在 <https://datasheets.raspberrypi.com/> 内找到。

这些参考书可能对你有很大帮助，都可以在上面的地址下载：

| 参考书                             | 内容                 |
| ---------------------------------- | -------------------- |
| `pico-datasheet.pdf`               | Pico 数据手册        |
| `pico-product-brief.pdf`           | Pico 产品简介        |
| `raspberry-pi-pico-c-sdk.pdf`      | Pico C SDK 手册      |
| `raspberry-pi-pico-faq.pdf`        | Pico 问答            |
| `raspberry-pi-pico-python-sdk.pdf` | Pico Python SDK 手册 |

如果需要杂志，可以在树莓派杂志官网注册下载。

## 1.4 MicroPython 开发

Pico 支持使用 C/C++ 或者 MicroPython 进行开发，下面我们使用 MicroPython 进行开发，详细的开发流程我会在后面的文章中详细阐述。

固件下载更新：<https://micropython.org/download/rp2-pico/> 。例如，你下载的文件名称应该类似于 `rp2-pico-20220117-v1.18.uf2` 。

下载方法是按住按键不松手，然后使用 USB 插入到电脑上，电脑会将 Pico 识别为储存设备。我们将 `rp2-pico-20220117-v1.18.uf2` 文件拖放到 Pico 中，然后重启 Pico，Pico 中就可以使用 MicroPython 了。

将下面的代码保存为 `main.py`，然后复制到 Pico 中，就可以点亮 Pico 上自带的 LED 灯了。当然我们也建议使用 Thonny 这款 Python 开发工具完成这些操作。

下面是 `main.py` 的代码

```python
from machine import Pin
import utime

led = Pin(25, Pin.OUT)
while True:
    led.value(1)
    utime.sleep(1)
    led.value(0)
    utime.sleep(1)
```

如果没有出错，LED 灯会每隔一秒闪动一次。

## 1.5 Pico 生态

由于 Pico 发行到现在不是很久，其优势没有完全体现，但是其发展势头迅猛，在创客社区内 Pico 正在逐渐流行变为新宠。

Pico 搭载了 RP 2040 芯片作为其 CPU，基于 RP 2040 芯片的开发生态一定程度上决定了 Pico 的生态。不过 RP 2040 系列加入了 Arduino 让原本擅长开发 Arduino 的创客也能快速接受基于 RP 2040 系列的产品了。

除了 Pico，树莓派基金会也与其他合作伙伴联合开发了搭载 RP 2040 芯片的其他微处理器开发板，包括 Adafruit Feather RP 2040、Adafruit ItsyBitsy RP 2040、Arduino Nano RP2040 Connect、Pimoroni PicoSystem、Pimoroni Pico Explorer Base、SparkFun Thing Plus – RP2040、SparkFun MicroMod RP2040 Processor、SparkFun Pro Micro – RP2040 等开发板，力图开拓 RP 2040 芯片在 IoT、游戏掌机、教育领域的应用。

<!-- TODO：Arduino Nano RP2040 Connect：Raspberry Pi+Arduino. -->

# 2. 配置 IDE

## 2.1 开发环境

根据树莓派官网的提示，目前对 Pico 支持性最好的 IDE 是 [Thonny](https://thonny.org/)，建议安装最新版本的 Thonny 来调试 Pico 。

在 Thonny 中，如果你想将文件下载到 Pico 中，只需要保存到 Pico 即可，而且 Thonny 支持交互模式的 Pico 。如果你想删除一个文件，只需要选择打开 Pico 上的文件，然后右键删除你想删除的文件即可。

但是 Thonny 开发 Python 效率较低，缺少 Hints（语法提示和错误提示），我们需要功能健全的 IDE 开发 Python。

很多情况下，我们只是需要开发的 IDE 支持 Hints，而不需要安装整个 MicroPython 环境，下面我们举例几种 IDE 支持 MicroPython Hints 的方法。

下面举例 VS Code 开发 MicroPython 应用和 IntelliJ 系列 IDE 安装 MicroPython 插件。

## 2.2 VS Code 非破坏性修改

下面的设置依赖于 Pylance 插件，确保你的 VS Code 的 Python 插件是 Pylance 。

引入 MicroPython 的存根文件（Stub files，即 `.pyi` 文件）即可，可以克隆下面的项目：

```bash
git clone https://github.com/vlasovskikh/intellij-micropython
```

例如，我将其放到 `D:\WorkSpace\intellij-micropython` 下面，那么只需要配置 VS Code 工作区设置即可（添加文件 `.vscode/settings.json`）：

```json
{
    "python.analysis.extraPaths": [
        "D:\\WorkSpace\\intellij-micropython\\typehints\\rpi_pico",
        "D:\\WorkSpace\\intellij-micropython\\typehints\\micropython",
        "D:\\WorkSpace\\intellij-micropython\\typehints\\stdlib"
    ],
    "python.analysis.diagnosticSeverityOverrides": {
        "reportMissingModuleSource": "none"
    }
}
```

使用 `reportMissingModuleSource` 配置原因是如果 Pylance 发现了 `.pyi` 存根文件，但是没有发现源文件，Pylance 就会认为这个库无法加载，并给出警告。但是一般情况下这种问题不会发生，所以我们禁用了这个警告。

由于我只用于开发 RaspberryPi Pico，所以我只引入了标准库和 `rpi_pico` 依赖，你可以根据需求选择自己的依赖。

此时，我可以正常开发任何 MicroPython 应用了，代码自动补全还包含英文的注解，免去许多查文档的麻烦。

## 2.3 用于 IntelliJ 系列产品

我们注意到上面的项目其实是为 IntelliJ 打造的插件，包括 PyCharm 等在内都可以使用，直接装在 IDE 里面。下载地址：<https://plugins.jetbrains.com/plugin/9777-micropython>，可以使用插件获得完整开发体验。

目前（2022-05-15）支持的开发板：
- ESP8266
- PyBoard
- BBC Micro:bit
- Raspberry Pi Pico

## 2.4 全局设置

<div class="note note-warning">

**破坏性警告**

这可能对你的 Python 产生破坏性修改，所以请创建虚拟环境或使用新环境专门用于 MicroPython 的开发。

</div>

如果你想为大多数 MicroPython 程序设置自动补全，可以使用下面的库：

```bash
pip install micropython-stubber
```

对于这个库本文作者没有进行测试，而且可能和很多库的配置有冲突，我就暂且不使用它了。

# 3. Pico 编程实战

## 3.1 点亮一个 LED

上面我们已经完成了 LED 闪亮的操作，`main.py` 是默认启动文件，如果 Pico 的根目录内含有文件 `main.py` 就会运行这个文件。

如果你还没有尝试这个例子，快去尝试一下吧！

使用 Thonny 打开 Pico 开发环境，编辑文件 `main.py`，然后将此文件保存到 Pico 上。

```python
from machine import Pin
import utime

led = Pin(25, Pin.OUT)
while True:
    led.value(1)
    utime.sleep(1)
    led.value(0)
    utime.sleep(1)
```

## 3.2 

# 参考

[1] 树莓派新成员：Raspberry Pi Pico 初探，少数派，<https://sspai.com/post/64602#!>

[2] 树莓派官网，树莓派，<https://www.raspberrypi.com/>

[3]
