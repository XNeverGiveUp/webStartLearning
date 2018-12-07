# JavaScript简洁使用技巧
## 1.清空或截断数组
在不重新给数组赋值的情况下，清空或截断数组的最简单方法是改变数组length属性值：

```
const arr = [11, 12, 13, 14, 15]
arr.length = 3
console.log(arr);// => [11,12,13]

arr.length = 0;
console.log(arr);// => [];
console.log(arr[2])// undefined
```
## 2.使用对象解构模拟命名参数
当您需要将一组可选变量传递给某个函数时，你很可能已经在使用配置对象了，如下所示：
```
doSomething({foo: 'helo', bar: 'hey', baz: 42});
function doSomething(config) {
    const foo = config.foo !== void 0 ? config.foo : null;
    const bar = config.bar !== void 0 ? config.bar : null;
    const baz = config.baz !== void 0 ? config.baz : null;
    //...
}
```
这是一个古老但有效的模式，它视图在JavaScript中模拟命名参数。函数调用看起来很好。另一方面，配置对象处理逻辑不必要的冗长。使用ES2015的对象解构，可以绕过这个缺点：
```
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 }) {
    // ...
}
```
如果你需要配置对象也可选，也很简单:
```
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) {
    // ...
}
```
## 3.使用对象解构来处理数组
可以使用对象解构将数组项分配给各个变量:
```
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const {2: country, 4: state} = csvFileLine.split(',');
console.log(country); // US
console.log(state); // New York
```
## 4.switch 语句中使用范围值
```
function getWaterState(tempInCelsius) {
   let state;
   switch(true) {
       case (tempInCelsius <= 0):
            state = 'Solid';
            break;
        case (tempInCelsius > 0 && tempInCelsius < 10);
            state = 'Liquid';
            bread;
        default:
            state = 'Gas'
   }
   return state
}
```
## 5.使用async/await 来await 多个async函数
可以使用Promise.all 来 await多个async(异步) 函数
```
    await Promise.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])
```
## 6.创建纯(pure)对象
您可以创建一个100%纯对象,它不会从Object继承任何属性或方法(例如, constructor, toString()等)。
```
    const pureObject = Object.create(null);
    console.log(pureObject); // => {}
    console.log(pureObject.constructor); //=> undefined
    console.log(pureObject.toString); //=> undefined
    console.log(pureObject.hasOwnProperty); //=> undefined
```