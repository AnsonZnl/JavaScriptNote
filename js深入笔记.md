- 预编译
``` JavaScript
console.log(foo);
function foo(){
    console.log("foo");
}
var foo = 1;
```
解析：
上面代码在预编译过程中转化为：
``` JavaScript
var a;
function foo(){console.log('foo')};
console.log(foo);
foo = 1;
```
所以输出： `foo(){ console.log("foo");}`

- bind 原理
> bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
``` JavaScript
var dad = {};
var son = {};
function show(){
  return this;
}
var newShow = show.bind(dad);
var newShow1 = newShow.bind(son)
console.log(newShow() == dad);//true
console.log(newShow1() == son);//false
```
解析：
``` JavaScript
var newShow = show.bind(dad);
//把newShow方法的this绑定到dad对象上
var newShow1 = newShow.bind(son);
//把dad.newShow方法的this绑定到son对象上
```
参考：https://github.com/mqyqingfeng/Blog/issues/12

- bind深入
``` JavaScript
this.a = 1;
var module = {
    a : 2,
    getA: function() {
      return this.a;
    }
}; 
module.getA();//2
var getA1 = module.getA;
// getA在外部调用，此时的this指向了全局对象
getA1();//1
// 再把getA1方法绑定到module环境上
var getA2 = getA1.bind(module);
getA2();//2
```

- call和apply 的作用和区别
>  作用：改变this指向。 区别：传参列表不同。call(this, 参数1, 参数2..) | apply(this, [参数1, 参数2..])。call需要把实参按照形参的个数传进去， apply 需要传一个arguments（数组）
``` JavaScript
function test(){};
test() --> test.call(); test()函数执行就是test.call()
fun.call(指定的this, val1, val2, val3...);  利用别人的方法，实现自己的功能
```
案例：
``` JavaScript
var name = 'www';
var age = 17;
var obj = {
  name: 'zzz',
  age: 18
}
function fun(){
  console.log(this.name, this.age);
}
// fun();//www 17
fun.call(obj);//zzz 18
```

- 借用构造函数继承
``` JavaScript
function Person(name, age, sex){
  this.name = name;
  this.age = age;
  this.sex = sex;
}
function Student(name, age, sex, tel, grade){
  // var this = {name: '', age: '', sex: ''}
  Person.call(this, name, age, sex);//相当于把Person里面的代码复制在这里
  // 相当于
  // this.name = name;
  // this.age = age;
  // this.sex = sex;
  this.tel = tel;
  this.grade = grade;
}
var student = new Student('sunny', 18, 'male', 139, 2017);
console.log(student);
```

- 函数中 参数按值传递

> 原始类型传递副本, 引用类型传递对象的引用。

按值传递很好理解，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。
``` javascript
var value = 1;
function f(v){
  v= 2;
  console.log(v);//2
}
f(value);
console.log(value);//1
```

- 引用类型传递对象的引用
``` javascript
var obj = {
  value: 1
}
function f(o){
  o.value= 2;
  console.log(o.value);//2
}
f(obj);
console.log(obj.value);//2
```

> 参数传递方式说的就是从实参给形参复制的过程,值传递就是把实参在内存栈中的数据传递给形参, 然后你在方法内部就可以使用形参了。
而引用传递是把实参的内存栈的地址编号传递给形参.
按共享传递依然是按值传递，
我也是这样认为的呐，很多人还认为按引用传递也是按值传递，只是值是指针(地址)而已，这个说法也对

- call 和 apply 的模拟实现

> 一句话介绍call : call()方法在使用一个指定的this值和若干个指定过的参数值的前提下调用某个函数或方法

``` javascript
var foo = {
  value: 1
}
var value = 2;
function bar(){
  console.log(this.value);
}
bar();//2
bar.call(foo);//1
```

解析：
当使用bar.call(foo)时，this指向了foo这个对象,我们可以这样写
``` javascript
foo= {
  value: 1,
  fn: function(){ console.log(this.value) }
}
```
这样的话this就指向了foo对象
所以当call()时，我们可以把bar方法放在foo对象当中，执行后在删除这个属性，
所以模拟一个call方法步骤是：
1. 把函数设为这个对象的属性
2. 执行这个函数
3. 删除这个函数

```javascript
Object.prototype.call2 = function(obj){
    obj.fn = this;
    obj.fn();
    delete obj.fn;
}
var foo = {
  value: 1
}
function bar(){
  console.log(this.value);
}
bar.call2(foo);
```

- 继承 圣杯模式

``` javascript
function inherit(Target, Origin){
  function F(){};
  F.prototype = Origin.prototype;
  Target.prototype = new F();
  Target.prototype.consturctor = Target;//设置construct
  Target.prototype.uber = Origin.prototype;//设置他继承自谁
}
Farther.prototype.lastName = 'Deng';
function Farther(){};
function Son(){};
inherit(Son, Farther);
var son = new Son();
var farther = new Farther();
```
- 雅虎的js封装方法
``` javascript
var inherit = (function (){
    var F = function(){};
    return function (Target, Origin){
      F.prototype = Origin.prototype;
      Target.prototype = new F();
      Target.prototype.consturctor = Target;//设置construct
      Target.prototype.uber = Origin.prototype;//设置他继承自谁`
  }
})

```

- 使用闭包私有化变量‘
``` javascript
function Deng(name, wife){
    var prepareWife = 'xiaozhang';
    this.name = name;
    this.wife = wife;
    this.divorce = function(){
      this.wife = prepareWife;
    }
    this.changePrepareWife = function(Target){
      prepareWife = target;
    }
    this.sayPraprewife = function(){
      console.log(this.prepareWife);
    }
}
var deng = new Deng('dneg', 'xiaowang');
```
另一种方法：命名空间,使用对象分层来做命名区分。

- 使用闭包 实现命名空间
``` javascript
var name = 'b'
var init= (function (){
  var name = 'www';
  function callName(){
    console.log(name);
  }
  return function(){
    callName();
  }
}())
init();//'www'

// 模块化开发使用闭包，防止命名污染 ，尤其是开发插件时
```

- 对象枚举 仿jQeury 连续调用
``` javascript
var deng = {
  smoke : function(){
    console.log('smoke.....');
    return this;
    //返回的是deng 然后就可以实现
    // 连续调用 deng.smoke().drink();
  },  
  drink : function(){
    console.log('drink.....');
    return this;
  }
}
deng.smoke().drink();
```

- 对象的属性获取
> 会默认转化为 obj.value --> obj['value']
```javascript
var deng = {
  wife1 : {name: 'xiaozhang'},
  wife2 : {name: 'xiaowan'},
  wife3 : {name: 'xiaoliu'},
  sayWife: function(num){
    return this['wife' + num].name;
  }
}
deng.sayWife(2)
```

- 对象遍历(枚举)
> in 判断对象中是否有该属性 (包含设置在原型上属性)
``` javascript
var obj = {name : 'zzz'};
obj.__proto__.age = 12;
console.log('name' in obj);//true
console.log('age' in obj);//true
```
> Object.keys 可以遍历出对象的所有的属性 (不遍历原型上属性)
```javascript
var obj = {name : 'zzz'};
obj.__proto__.age = 12;
Object.keys(obj);//['name'];
```

- for in  遍历出对象的属性（包含原型）
```javascript
var obj = {name : 'zzz'};
obj.__proto__.age = 12;
for(var value in obj){
  console.log(value);//name age
  console.log(obj[value]);// zzz 12
}
```

- hasOwnProperty 判断是不是自己的属性 一般和for in连用，是遍历的自己的属性（不包含原型）
``` javascript
var obj = {name : 'zzz'};
obj.__proto__.age = 12;
for(var value in obj){
  if(obj.hasOwnProperty(value)){
    console.log(obj[value]);// zzz
  }
  console.log(obj[value]);// zzz 12
}
```

- instanceOf 判断某实例是不是这个构造函数构造出来的
> A instanceOf B  --> 看 A 对象原型链上有没有 B 的原型

**根据这个原理，重写typeof**
```javascript
function typeOf2(value){
  return Object.prototype.toString.call(value).slice(8, -1);
}
typeOf2([]);//Array
typeOf2(1);//Number
typeOf2('1');//String
typeOf2(null);//null
typeOf2({});//Object
typeOf2(undefined);//undefined
```

- parseInt(值， 基数)；
parseInt(100, 2);//二进制的100
```javascript
parseInt(3, 8);// 3
parseInt(3, 2);// NaN
parseInt(3, 0);// 3/NaN
```
- 关于进制
``` javascript
// 满足一个数 从个位进十 满几进十
// 十进制
// 1 = 1
// 10 = 10
// 100 = 10^2
// 1000 = 10^3
// 10000 = 10^4
// 二进制
// 1 = 1
// 10 = 2
// 100 =2^2
// 1000 = 2^3
// 10000 = 2^4
```
- typeOf 返回的结果 
> Number String Boolean undefined Function Object
五大基础类型 + 一个引用类型 = 6,
五大基础类型返回了四种, null归到了object中, 在加一个 Function.


- arguments
> 形参和arguments是映射关系
```javascript
function b(x, y, a){
  arguments[2] = 10;
  console.log(a);
  // a = 10;
  // console.log(arguments[2]);
}
b(1, 2, 3);
```

- call和apply 干什么的 有什么区别
改变this指向 ，传参列表不同 ，call传值，apply 传数组

- 逗号操作符
``` javascript
var a= (1,2);// --> 那就是：var a = 2;
```

- 布尔值转化
> 只有：'', 0, -0, NaN, null, undefined, false 会转换成false
```javascript
var x= 1;
if(function f(){}){
  x+= typeof f;
}
console.log(x);//'1undefined'
//转换成false的六个值：
//'', 0, -0, NaN, null, undefined, false
```

- 关于NaN
> Number('a') -> NaN ， NaN ===NaN -> false 
**写一个判断NaN的方法：**
```javascript
function isNaN(num){
  var ret = Number(num);
  if(''+ ret == 'NaN'){
      return true;
    }else{
      return false;
  }
}
isNaN('1');//false
isNaN('1a');//true
```

- this
**this的指向：**
1. 全局的函数调用，this指向window
2. 作为对象方法的调用，this指向该对象
3. 作为构造函数调用，this指向实例
4. 使用call/apply/bind调用, this指向第一个参数

**this指向的面试题：**
```javascript
var name = '222';
var a = {
  name: '111',
  say: function(){
    console.log(this.name);
  }
}
var fun= a.say;
fun();//
a.say();//
var b={
  name: '333',
  say: function(fun){
    fun();
  }
}
b.say(a.say);//
b.say = a.say;
b.say();//
```
阮一峰 this指向：http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html

