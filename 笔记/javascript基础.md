## 内置类型
JavaScript中分为七种内置类型，七种内置类型又分为两大类:基本类型和引用类型。

基本类型：null、undefined、boolean、number、string、symbol

引用类型：Object(包括函数function等)

对于基本类型来说，如果使用字面量得方式，那么这个变量只是个字面量。只有在必要时候才会转为对应对的类型。
```
    let a = 111 //只是字面量,不是number类型
    a.toString() //使用的时候才会转为对象类型
```

对于引用类型来说，在使用的过程中牵扯到深拷贝、浅拷贝的问题。基本类型的存储会在内存的栈中，引用类型的实际内容存储会存储在内存的堆中，在栈中会存储引用类型的内存地址。调用一个引用类型的变量时，第一步会去栈中取内存地址，第二步根据栈中的内存地址去堆中获取实际内容。引用类型的赋值实际是内存地址的赋值，也就是浅拷贝。
```
    let a = {name: 'joy'};
    let b = a;
    b.name = "joyKing";
    console.log(a.name); // joyKing
```
a赋值于b，实际上是将a的内存地址赋值给了b,b与a实际上操作的是堆中同一块数据因此改变b.name同时a.name也改变了。

## Typeof 类型判断
typeof对于基本类型，除了null都能显示正确类型
```
    typeof 1 // 'number'
    typeof '1' // 'string'
    typeof undefined // 'undefined'
    typeof true // 'boolean'
    typeof Symbol() // 'symbol'
    typeof b // b 没有声明，但是还会显示 undefined

```
typeof对于引用类型，除了function都会显示object
```
    typeof [] // 'object'
    typeof {} // 'object'
    typeof console.log // 'function'
```
对于null来说，虽然它是基本类型，但是会显示object，这是一个很久的bug
```
    typeof null; // 'object'
```
为什么会出现这种情况呢？因为在JS很早的初期，使用的都是32位操作系统，为了性能考虑使用了低位存储变量的类型信息, 000开头代表是对象，又因为null全部为0，所以将它错误的判断成了object。

如果想获得一个变量的正确类型，可以使用Object.prototype.toString.call(xxx),这样我们就可以获得类似[object Type]的字符串。
```
    Object.prototype.toString.call({a:1})
    "[object Object]"
    Object.prototype.toString.call(1)
    "[object Number]"
    Object.prototype.toString.call(null)
    "[object Null]"
    Object.prototype.toString.call('1')
    "[object String]"
```
## 类型转换
### 转Boolean
在条件判断时，除了 undefined, null, false, NaN, '', 0, -0,其它所有的值都会转为true,包括所有对象。
### 对象转基本类型
对象在转基本类型的时候，首先会调用valueOf 然后调用toString。并且这两个方法可以重写。
```
let a = {
    valueOf() {
    	return 0
    }
}
a + 1; // 1
```
当然你也可以重写 Symbol.toPrimitive,该方法在转基本类型时调用优先级最高。
```
    let a = {
        valueOf() {
            return  0
        },
        toString() {
            return '1'
        },
        [Symbol.toPrimitive]() {
            return 2
        }
    }
    1 + a // 3
    '1' + a // '12'
```

### 四则运算符
只有当加法运算时，其中一方是字符串类型，就会把另一方转换为字符串类型。其它运算只要其中一方是数字，那么另一方就转为数字。并且加法运算会触发三种类型转换:将值转换为原始值，转换为数字，转换为字符串。

```
    1 + '1' // '11'
    2 * '2' // 4
    [1, 2] + [2, 1] // '1,22,1'
    // [1, 2].toString() -> '1,2'
    // [2, 1].toString() -> '2,1'
    // '1,2' + '2,1' = '1,22,1'
```

对于加号需要注意这个表达式 'a' + + 'b'
```
    'a' + + 'b' // -> "aNaN"
    // 因为 + 'b' -> NaN
    // 你也许在一些代码中看到过 + '1' -> 1
```