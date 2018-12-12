# 1.原型继承
```
function Parent() {
    this.name = 'Kevin';
}
function Child() {
    
}
Child.prototype = new Parent();

let child1 = new Child();
console.log(child1); // Kevin
```
问题1:引用类型属性会被所有的实例共享。
```
    function  Parent() {
        this.names = ["张三", "李四"]
    }
    function Child() {
        
    }
    Child.prototype = new Parent();
    let child1 = new Child();
    child1.names.push("王五")；
    console.log(child1); // ["张三", "李四", "王五"]
    
    let child2 = new Child();
    console.log(child2); // ["张三", "李四", "王五"]
```
问题2：在创建Child实例时不能向Parent传参。

# 2. 借用构造函数
```
    function Parent() {
        this.names = ["张三", "李四"];
    }
    function Child() {
        Parent.call(this);
    }
    let child1 = new Child();
    
    child1.names.push("王五");
    console.log(child1.names); //["张三", "李四", "王五"]
    
 let child2 = new Child();
    console.log(child2); // ["张三", "李四"] 
```
优点: 1.避免了引用类型的属性被所有实例共享
      2.可以在Child中向Parent传参
      
```
    function Parent(name) {
        this.name = name;
    }
    function Child(name) {
        Parent.call(this, name)
    }
    let child1 = new Child("王五");
    let child2 = new Child("李四");
    console.log(child1.name); // "王五"
    console.log(child2.name); // "李四"
```

缺点: 方法都在构造函数中定义，每次创建实例都会创建一遍方法。

# 3.组合继承

```
    function Parent(name) {
        this.name = name;
        this.colors =["red", "green"]
    }
    
    Parent.prototype.sayName = function () {
        console.log(this.name);
    }
    function Child(name,age) {
        Parent.call(this, name);
        this.age = age
    }
    Child.prototype = new Parent();
   
    let child1 = new Child("张三", 18);
    child1.colors.push("blue");
    console.log(child1.name); // 张三
    console.log(child1.age); // 18
    console.log(child1.colors); // ["red", "green", "blue"]
    
    let child2 = new Child("李四", 28);
    console.log(child2.name); // 李四
    console.log(child2.age); // 28
    console.log(child2.colors); // ["red", "green"]
```

优点:融合原型链继承和构造函数的优点，是javaScript中最常用的继承方式。

# 4.原型继承
```
    function createObj (o) {
        function F() {
            
        }
        F.prototype = o;
        return new F()
    }
```

就是ES5 Object.create()的模拟实现，将传入的对象作为新对象的原型。

缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

```
    var person = {
        name: "张三",
        friends:["李四", "王五"]
    }
    
    var person1 = createObj(person);
    var person2 = createObj(person);
    
    person1.name = "person1";
    console.log(person2.name); // 张三
    
    person1.friends.push("张二");
    console.log(person2.friends); //["李四", "王五", "张二"]
```
注意:修改person1.name值，person2.name值并未改变，并不是person1与person2有独立的name值，而是因为person1.name = "person1", 给person1添加了name属性，并非修改原型上的值。

# 5.寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来增强对象，最后返回对象。

```
function createObj(o) {
    var clone = Object.create(o);
    clone.sayName = function() {
        console.log("Hi")
    }
    return clone;
 }
```

缺点: 跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

# 6. 寄生组合式继承

