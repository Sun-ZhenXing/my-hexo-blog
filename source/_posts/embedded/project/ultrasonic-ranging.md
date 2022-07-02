---
title: 超声波测距
date: 2022-06-13 15:12:23
categories:
  - [嵌入式, 课程设计]
tags:
  - 嵌入式
  - 课程设计
  - 超声波
  - 数码管
  - Mbed
  - Arduino
---

本文是嵌入式的课程设计，设计超声波测距并使用数码管渲染。本文是使用 Arduino 和 Mbed 设计的，仅供参考。

<!-- more -->

# 1. 主要设计

## 1.1 设计目标

设计一个超声波测距仪，测量的结果需要在三位的七段数码管上显示出来。

传感器：
- 数码管型号为 **3361AS**（共阴极）
- 超声波传感器型号为 **HC-SR04**

数码管的原理图如下：

![](https://pic.imgdb.cn/item/62a6e7be094754312986ad2d.jpg)

主要难点：
- 如何使用七段数码管
    - 如何正确表示数字
    - 如何以较快的速度绘制，利用视觉延迟防止闪烁
    - 如何使用数码管模块
- 如何使用超声波测距

# 2. Arduino 设计

一开始是使用 Arduino UNO 设计的，因为 Arduino 设计比较简单，很多库可以直接用，使用 Arduino 测量的结果也比较精确。

<!-- TODO：插入连线图和效果图 -->

```c++
#define LED_A 2
#define LED_B 3
#define LED_C 4
#define LED_D 5
#define LED_E 6
#define LED_F 7
#define LED_G 8

// 分别连接三个灯 S1、S2、S3
#define LED_1 9
#define LED_2 10
#define LED_3 11

#define pingPin 13  // 超声波 Pin
#define echoPin 12  // 超声波 Echo

// 默认延迟时间
#define LED_DELAY 1

// 数字的字形
// 每一个位分别对应 Dot|G|F|E|D|C|B|A
const unsigned char NUM_7_SEG[] = {
    0b0111111,
    0b0000110,
    0b1011011,
    0b1001111,
    0b1100110,
    0b1101101,
    0b1111101,
    0b0000111,
    0b1111111,
    0b1101111
};

// 将测量时间换算为距离
long microsecondsToCentimeters(long microseconds) {
    return microseconds / 29 / 2;
}

// 清空屏幕
void clear() {
    digitalWrite(LED_1, HIGH);
    digitalWrite(LED_2, HIGH);
    digitalWrite(LED_3, HIGH);
    digitalWrite(LED_A, LOW);
    digitalWrite(LED_B, LOW);
    digitalWrite(LED_C, LOW);
    digitalWrite(LED_D, LOW);
    digitalWrite(LED_E, LOW);
    digitalWrite(LED_F, LOW);
    digitalWrite(LED_G, LOW);
}

// 绘制一个数字
void draw_digital(int number, int s) {
    if (s == 1) {
        digitalWrite(LED_1, LOW);
        digitalWrite(LED_2, HIGH);
        digitalWrite(LED_3, HIGH);
    } else if (s == 2) {
        digitalWrite(LED_1, HIGH);
        digitalWrite(LED_2, LOW);
        digitalWrite(LED_3, HIGH);
    } else {
        digitalWrite(LED_1, HIGH);
        digitalWrite(LED_2, HIGH);
        digitalWrite(LED_3, LOW);
    }
    unsigned char seg = NUM_7_SEG[number];
    int i = 0;
    for (i = 0; i < 7; i++) {
        if (seg & 1) {
            digitalWrite(LED_A + i, HIGH);
        } else {
            digitalWrite(LED_A + i, LOW);
        }
        seg >>= 1;
    }
}

// 绘制一个数值
void show_number(int num) {
    int hund = num / 100;
    int tens = (num % 100) / 10;
    int ones = num % 10;
    if (num >= 100) {
        draw_digital(hund, 1);
        delay(LED_DELAY);
    }
    if (num >= 10) {
        draw_digital(tens, 2);
        delay(LED_DELAY);
    }
    draw_digital(ones, 3);
    delay(LED_DELAY);
}

void setup() {
    Serial.begin(9600);
    pinMode(pingPin, OUTPUT);
    pinMode(echoPin, INPUT);

    pinMode(LED_1, OUTPUT);
    pinMode(LED_2, OUTPUT);
    pinMode(LED_3, OUTPUT);
    pinMode(LED_A, OUTPUT);
    pinMode(LED_B, OUTPUT);
    pinMode(LED_C, OUTPUT);
    pinMode(LED_D, OUTPUT);
    pinMode(LED_E, OUTPUT);
    pinMode(LED_F, OUTPUT);
    pinMode(LED_G, OUTPUT);
    clear();
    delay(LED_DELAY);
}

void loop() {
    long duration, cm;
    digitalWrite(pingPin, LOW);
    delayMicroseconds(2);
    digitalWrite(pingPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(pingPin, LOW);

    duration = pulseIn(echoPin, HIGH);
    cm = microsecondsToCentimeters(duration);
    Serial.print(cm);
    Serial.println("cm");
    int i = 15;
    // 延迟绘制
    while (i--) {
        if (cm < 1000 && cm >= 0) {
            show_number(cm);
        }
        delay(10);
        clear();
        delay(LED_DELAY);
    }

}
```

# 2. Mbed 设计

Mbed 设计过程很相似，甚至有一些代码都一致。

<!-- TODO：插入连线图和效果图 -->

```c++
#include "mbed.h"

BusOut Disp(p5, p6, p7, p8, p9, p10, p11);
DigitalOut ctrl1(p12);
DigitalOut ctrl2(p13);
DigitalOut ctrl3(p14);

DigitalOut trigger(p15);
DigitalIn echo(p16);

Timer timer;

// 默认延迟时间
const int LED_DELAY = 1;

// 数码管数字
const unsigned char NUM_SEG[] = {
    0b0111111,
    0b0000110,
    0b1011011,
    0b1001111,
    0b1100110,
    0b1101101,
    0b1111101,
    0b0000111,
    0b1111111,
    0b1101111
};

void clear() {
    ctrl1 = 0;
    ctrl2 = 0;
    ctrl3 = 0;
    Disp = (unsigned char)0;
    wait_ms(LED_DELAY);
}

long microsecondsToCentimeters(long microseconds) {
    return microseconds / 53;
}

/**
 * @brief 写数字到数码管
 * @param number 数字
 * @param s 第几个灯
 */
void draw_digital(int number, int s) {
    if (s == 1) {
        ctrl1 = 1;
        ctrl2 = 1;
        ctrl3 = 0;
    } else if (s == 2) {
        ctrl1 = 1;
        ctrl2 = 0;
        ctrl3 = 1;
    } else {
        ctrl1 = 0;
        ctrl2 = 1;
        ctrl3 = 1;
    }
    Disp = NUM_SEG[number];
    wait_ms(LED_DELAY);
}

/**
 * @brief 显示数字
 * @param number 0-999 的数字
 */
void show_number(int number) {
    int hund = number / 100;
    int ten = (number - hund * 100) / 10;
    int one = number - hund * 100 - ten * 10;
    if (number >= 100) {
        draw_digital(hund, 1);
        wait_ms(LED_DELAY);
    }
    if (number >= 10) {
        draw_digital(ten, 2);
        wait_ms(LED_DELAY);
    }
    draw_digital(one, 3);
    wait_ms(LED_DELAY);
}

/**
 * @brief 计算误差时间
 * @return int
 */
int get_correction() {
    timer.reset();
    timer.start();
    while (echo == 2)
        ;
    timer.stop();
    return timer.read_us();
}

int main() {
    int correction = get_correction();
    while (true) {
        trigger = 1;
        timer.reset();
        wait_us(10);
        trigger = 0;
        while (echo == 0)
            ;
        timer.start();
        while (echo == 1)
            ;
        timer.stop();
        int distance = microsecondsToCentimeters(timer.read_us() - correction);
        int i = 15;
        while (i--) {
            if (distance < 1000 && distance >= 0) {
                show_number(distance);
            }
            wait_ms(LED_DELAY * 10);
            clear();
            wait_ms(LED_DELAY * 10);
        }
    }
}
```
