---
title: Java 注解和反射
date: 2022-05-22 14:51:40
categories:
  - [java, java 语言]
tags:
  - java
  - 笔记
---

Java 注解和反射，是 [【狂神说 Java】注解和反射](https://www.bilibili.com/video/BV1p4411P7V3) 的学习笔记。

<!-- more -->

# Java 注解和反射

## 1. 注解概述

许多框架，例如 MyBatis，其底层就是一个个注解和反射。通过注解，程序可以在运行时绑定一些信息或在编译时进行检查。通过反射获得注解可以极大地提高程序的灵活性。

### 1.1 注解入门

注解（Annotation）是 JDK 5.0 开始引入的新技术。

Annotation 的作用：
1. 注解不是程序，但可以对程序做出解释，功能与注释类似
2. 可以被其他程序读取

Annotation 的格式：
- 注解的基本格式为 `@annotation_name`
- 有的注解还可以添加参数，例如下面的代码

```java
class A {
    @SuppressWarnings(value="unchecked")
    public static void test() {
        String[] arr = new String[10];
    }
}
```

Annotation 在哪里使用？
- `package`
- `class`
- `method`
- `field`

注解相当于给它们添加了额外的辅助信息，我们可以通过反射机制编程实现对这些元数据的访问。

下面举例真实的案例：

```java
public class Test {
    @Override
    public String toString() {
        return "Test{}";
    }
}
```

我们还知道 `Thread` 类继承了 `Runnable` 接口：

```java
@FunctionalInterface
public interface Runnable {
    /**
     * ...
     * @see    java.lang.Thread#run()
     */
    public abstract void run();
}
```

还有一些不建议使用或者过时的方法：

```java
@Deprecated
public void destroy() {
    throw new NoSuchMethodError();
}
```

### 1.2 内置注解

内置注解有下面几个：
- `@Override`：定义在 `java.lang.Override` 中，此注解只适用于修饰方法，表示一个方法重写父类的另一个方法
- `@Deprecated`：定义在 `java.lang.Deprecated` 中，此注释用于修饰方法、属性、类，表示不鼓励程序员使用这样的元素，通常是因为危险或存在更好的选择
- `@SuppressWarnings`：定义在 `java.lang.SuppressWarnings` 中，用来抑制编译时的警告信息
    - `@SuppressWarnings("all")` 抑制全部警告
    - `@SuppressWarnings("unchecked")` 未检查的
    - `@SuppressWarnings(value={"unchecked", "deprecation"})` 可以选择多个
    - ……

如果我们想重写 `toString()` 方法，但是不小心将方法写成 `tostring()`，如果此时有 `@Override` 注解，这个时候程序会报错。也就是说，重写注解会帮助我们检查程序是否是真的重写了这个方法。

我们可以看一下 `@SuppressWarnings` 的原型：

```java
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOVAL_VARIABLE})
@Retention(RetentionPolicy.SOURCE)
public @interface SuppressWarnings {
    String[] value();
}
```

### 1.3 元注解

元注解负责解释其他注解，Java 定义了 4 个标准的 meta-annotation 类型，它们被用来提供对其他 annotation 类型作说明。

这些类型和它们所支持的类在 `java.lang.annotation` 包中可以找到：
- `@Target`：用于表述注解的使用范围
- `@Retention`：表示需要在什么级别保存该注释信息，用于描述注解的生命周期，可选值：
    - `SOURCE`
    - `CLASS`
    - `RUNTIME`
- `@Documented`：说明该注解将被包含在 javadoc 中
- `@Inherited`：说明子类可以继承父类中的该注解

下面我们定义一个注解：

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
public @interface MyAnnotation {
}
```

上面的类型仅适用于方法，下面我们在一个类中定义：

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public class Test {
    @MyAnnotation
    public void test() {
    }
}

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@interface MyAnnotation {
}
```

`@Retention` 表示我们的注解在哪些地方有效，规定作用范围是 Runtime > Class > Source 。

## 1.4 自定义注解

使用 `@interface` 自定义注解时，自动继承了 `java.lang.annotation.Annotation` 接口：
- `@interface` 用来声明一个注解，格式为 `public @interface AnnotationName { ... }`
- 其中的每一个方法实际上是声明了一个配置参数，方法的名称就是参数的名称
- 返回值类型就是参数的类型，而且只能是基本类型，例如 `Class`、`String`、`enum`
- 可以通过 `default` 关键字来声明参数的默认值
- 如果只有一个参数成员，一般将参数命名为 `value`，此时参数名可以省略
- 注解元素必须有值，我们定义注解元素时，常常使用 `""`、`0` 等作为默认值

```java
public class Test {
    @MyAnnotation(age = 18)
    public void test() {
    }
}

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@interface MyAnnotation {
    String name() default "";
    int age();
    int id() default -1;
    String[] schools() default {"A", "B"};
}
```

如果注解只有一个值，并且以 `value` 命名，那么它可以省略名称，也就是不需要命名参数。

```java
public class Test {
    @MyAnnotation("Alex")
    public void test() {
    }
}

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@interface MyAnnotation {
    String value();
}
```

## 2. 反射概述

### 2.1 反射机制概述

**动态语言** 可以在运行时改变其结构的语言，主要的动态语言：
- Objective-C
- C#
- JavaScript
- PHP
- Python

**静态语言** 在运行时不能改变其结构：
- Java
- C/C++

Java 不是动态语言，但 Java 可以被称为准动态语言，反射使 Java 这个静态语言获得了动态特性，Java 的动态性可以让编程的时候更加灵活。

Reflection（反射）是 Java 被视为动态语言的关键，反射机制允许程序执行期借助 Reflection API 取得任何类的内部信息，并能直接操作任意对象的内部属性及方法：

```java
Class c = Class.forName("java.lang.String");
```

加载完类之后，在堆内存的方法区中就产生了一个 `Class` 类型的对象（一个类只有一个 `Class` 对象），这个对象就包含了完整的类的结构信息。我们可以通过这个对象看到类的结构，这个对象就像一面镜子，透过镜子看到类的结构，所以我们形象地称之为 **反射** 。

正常的创建对象方式：
1. 引入需要的 *包类* 名称
2. 通过 `new` 实例化
3. 取得实例化对象

反射方式：
1. 实例化对象
2. `getClass()` 方法调用获得类对象
3. 得到完整的 *包类* 名称

Java 反射的优点和缺点：
- 优点：可以实现动态创建对象和编译，体现出很大的灵活性
- 缺点：对性能有影响，反射基本上解释操作，这些操作总是慢于直接执行相同的操作

反射相关的主要的 API：
- `java.lang.Class`：代表一个类
- `java.lang.reflect.Method`：代表类的方法
- `java.lang.reflect.Field`：代表类的成员变量
- `java.lang.reflect.Constructor`：代表类的构造器

Java 的 `Class` 对象是一类特殊的对象，它保留了类的结构信息，并且一个类运行在内存中只会有一个 `Class` 对象。

首先我们定义一个 JavaBean：

```java
public class Student {
    private int id;
    private String name;
    private int score;

    public Student() {
    }

    public Student(int id, String name, int score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getScore() {
        return score;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setScore(int score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "Student(id=" + id +
                ", name=\"" + name +
                "\", score=" + score + ")";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Student student = (Student) obj;
        return id == student.id &&
                score == student.score &&
                name.equals(student.name);
    }
}
```

我们通过反射获取这个类：

```java
public class Test {
    public static void main(String[] args) throws ClassNotFoundException {
        Class<?> c1 = Class.forName("top.alexsun.Student");
        System.out.println(c1);
        // "top.alexsun.Student"
    }
}
```

我们知道 `Object` 类内有一个方法 `getClass()`：

```java
class Object {
    @Contract(pure=true)
    public final native Class<?> getClass();
}
```

因为 `Object` 类被每一个类继承，那么每个对象都有 `getClass` 方法。


### 2.2 理解 `Class` 类并获取 `Class` 实例

对象反射可以得到的信息：
- 某个类的属性
- 某个类的方法
- 某个类实现了哪些接口

对于每个类而言，JRE 都为其保留了一个不变的 `Class` 类型的对象，一个 `Class` 对象包含了特定某个结构（类、接口、数组类或 `void`）的有关的信息:
- `Class` 本身也是一个类
- `Class` 对象只能由系统建立对象
- 一个加载的类在 JVM 中只有一个 `Class` 实例
- 一个 `Class` 对象对应的是一个加载到 JVM 中的一个 `.class` 文件
- 每个类的实例都会保存自己由哪一个 `Class` 实例所生成
- 通过 `Class` 可以完整地得到一个类中的所有被加载的结构
- `Class` 类是 Reflection 的根源，针对任何你想动态加载的类必须首先获得相应的 `Class` 对象

那么 `Class` 对象有哪些方法？

| 方法名                                      | 功能说明                                                           |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `static Class.forName(String name)`         | 返回指定类名 `name` 的 `Class` 对象                                |
| `Object newInstance()`                      | 调用缺省构造函数，返回 `Class` 对象的一个实例                      |
| `String getName()`                          | 返回此 `Class` 对象所表示的实体（类、接口、数组类或 `void`）的名称 |
| `Class getSuperclass()`                     | 获取当前 `Class` 对象的父类 `Class` 对象                           |
| `Class[] getInterfaces()`                   | 获取当前 `Class` 对象的接口                                        |
| `ClassLoader getClassLoader()`              | 返回该类的类加载器                                                 |
| `Constructor[] getConstructors()`           | 返回 `Constructor` 数组                                            |
| `Method getMethod(String name, Class... T)` | 返回一个 `Method` 对象，该对象的形参为 `paramType`                 |
| `Field[] getDeclaredFields()`               | 返回 `Field` 对象的一个数组                                        |

获取 Class 类的实例有几种方法：
1.  若已知具体的类，可以直接通过 `.class` 属性获取，这种方法最可靠且最快  
    ```java
    Class cls = Person.class;
    ```
2.  若已知某个类的实例，可以使用 `.getClass()` 属性获取  
    ```java
    Class cls = person.getClass();
    ```
3.  已知一个类的全名，且该类在类路径下，可以通过 `Class.forName()` 获取，可能抛出 `ClassNotFoundException`  
    ```java
    Class cls = Class.forName("top.alexsun.Person");
    ```
4.  内置的基本数据类型可以使用 `.Type` 属性
5.  可以使用 `ClassLoader` 获取

这是我们的几个类：

```java
class Person {
    public String name;

    public Person(){
    }

    public Person(String name){
        this.name = name;
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "'}";
    }
}

class Student extends Person {
    public Student() {
        this.name = "学生";
    }

}

class Teacher extends Person {
    public Teacher() {
        this.name = "老师";
    }
}
```

下面我们分别通过这几种方法获得 `Class` 对象：

```java
class Test {
    public static void main(String[] args) {
        Person person = new Student();
        System.out.println("这个人是：" + person.name);

        // 通过类获得
        Class c1 = Person.class;
        // 通过对象获得
        Class c2 = person.getClass();
        // 通过 Class.forName() 获得
        Class c3 = Class.forName("top.alexsun.Student");
        // 通过 Type 属性获得
        Class c4 = Integer.Type;

        // 获得父类
        Class c5 = c1.getSuperclass();
    }
}
```

有哪些类型可以获得 `Class` 对象？
- `class`：外部类，成员（成员内部类，静态内部类），局部内部类，匿名内部类
- `interface`：接口
- `[]`：数组
- `enum`：枚举
- `annotation`：注解类型 `@interface`
- `primitive type`：基本数据类型
- `void`：空

```java
class Test {
    public static void main(String[] args) {
        // 类具有 class 对象
        Class c1 = Object.class;
        // 接口具有 class 对象
        Class c2 = Comparable.class;
        // 数组具有 class 对象
        Class c3 = String[].class;
        // 二维数组具有 class 对象
        Class c4 = int[][].class;
        // 注解具有 class 对象
        Class c5 = Override.class;
        // 枚举类型具有 class 对象
        Class c6 = ElementType.class;
        // 具有 class 对象
        Class c7 = Integer.class;
        // 具有 class 对象
        Class c8 = void.class;
        // 具有 class 对象
        Class c9 = Class.class;
    }
}
```

### 2.3 类的加载与 `ClassLoader`

下面是 Java 的内存分析。

- Java 内存
    - 堆
        - 存放 `new` 的对象和数组
        - 可以被所有的线程共享，不会存放别的对象的引用
    - 栈
        - 存放基本变量类型（会包含这个基本类型的具体数值）
        - 引用对象的变量（会存放这个引用在堆里面的具体地址）
    - 方法区
        - 可以被所有的线程共享
        - 包含了所有的 `class` 和 `static` 变量

类的加载与 `ClassLoader` 的理解：
- **加载**：将 `.class` 字节码内容加载到内存中，并将这些静态数据转换成方法区的运行时数据结构，然后生成一个代表这个类的 `java.lang.Class` 对象
- **链接**：将 Java 类的二进制代码合并到 JVM 的运行状态之中
    - 验证：确保加载的类信息符合 JVM 规范，没有安全方面的问题
    - 准备：正式成为类变量（`static`）分配内存并设置类变量默认初始值的阶段，这些内存都将在方法区进行分配
    - 解析：虚拟机常量池内的符号引用（常量名）替换为直接引用（地址）的过程
- **初始化**：
    - 执行类构造器 `<clinit>()` 方法的过程。类构造器 `<clinit>()` 方法是由编译期自动收集类中所有类变量的赋值动作和静态代码块中的语句合并产生的（类构造器是构造类的信息的，不是构造该类对象的构造器）
    - 当初始化一个类的时候，如果发现其父类还没有进行初始化，则需要先出发其父类的初始化
    - 虚拟机会保证一个类的 `<clinit>>()` 方法在多线程环境中被正确加锁和同步

```java
public class Test {
    public static void main(String[] args) {
        A a = new A();
        System.out.println(A.m);
    }
}

class A {
    static {
        System.out.println("A类的静态代码块初始化");
        m = 300;
    }
    public static int m = 100;
}
```












### 2.4 创建运行时类的对象

### 2.5 获取运行时类的完整结构

### 2.6 调取运行时类的指定结构

## 6. 获得反射对象

## 7. 得到 `Class` 类的几种方式

## 8. 所有类型的 `Class` 对象

## 9. 类加载内存分析

## 10. 分析类的初始化

## 11. 类加载器

## 12. 获取类的运行时结构

## 13. 动态创建对象执行方法

## 14.  性能对比分析

## 15. 获取泛型信息

## 16. 获取注解信息

```java
public class Test {
    public static void main(String[] args) {
        Method method = Test.class.getMethod("test01", Map.class, List.class);
        Type[] genericParameterTypes = method.getGenericParameterTypes();

        for (Type genericParameterType: genericParameterTypes) {
            System.out.println("## " + genericParameterType);
            if (genericParameterType instanceof ParameterizedType) {
                Type[] actualTypeArguments = ((ParameterizedType) genericParameterType).getActualTypeArguments();
                for (Type actualTypeArgument : actualTypeArguments) {
                    System.out.println(actualTypeArgument);
                }
            }
        }
        method = Test.class.getMethod("test02", null);
        Type genericReturnType = method.getGenericReturnType();
        if (genericReturnType instanceof ParameterizedType) {
            Type[] actualTypeArguments = ((ParameterizedType) genericReturnType).getActualTypeArguments();
            for (Type actualTypeArgument : actualTypeArguments) {
                System.out.println(actualTypeArgument);
            }
        }
    }
}
```

### 16.1 练习：ORM

什么是 ORM？

ORM（Object Relationship Mapping，对象映射关系），例如：

```java
class Student {
    int id;
    String name;
    int age;
}
```

上面的代码和下面的表结构相对应：

| id  | name | age |
| --- | ---- | --- |
| 001 | Alex | 13  |
| 002 | 鸭梨 | 19  |

- 类和表结构对应
- 属性和字段对应
- 对象和记录对应

下面利用注解和反射完成类和表结构的映射关系。

```java
Annotation[] annotations = c1.getAnnotations();
for (Annotation annotation: annotations) {
    System.out.println(annotation);
}

Table table = (Table)c1.getAnnotation(Table.class);
String value = table.value();
System.out.println(value);
```

## 17. 本章小结
