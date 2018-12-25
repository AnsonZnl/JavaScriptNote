/*

a=100;
function demo(e){
    console.log(arguments[0] === e);
    function e(){};
    
    arguments[0]=2;
    console.log(e);//2 y
    if(a){
        var b=123;
        function c(){
            console.log('猪都能做出来')
            //猪都能做出来
        }
    }
    var c;
    a=10;
    console.log(b);//undefined x ?? 123
    f=123;
    console.log(c);//function c(){...} y
    console.log(a);//10 y
}
var a;
demo(1);
console.log(a);//10 y
console.log(f);//123 y
*/


//arguments[0] 和参数是互相映射的关系

//闭包的防范
/*
闭包会导致多个执行函数共用一个共有变量，
如果不是特殊需要，应尽量繁殖这种情况发生

*/



//写一个参数 计算字符串 的字节长度 使用charCodeAt（）
/*
function strLen(str){
    var num=0;
    for(var i=0; i<str.length; i++){
        if(str.charCodeAt(i)<=255){
            num++
        }else if(str.charCodeAt(i)>255){
            num+=2;
        }
    }
    console.log(num);
}

strLen("啦阿a啦");
*/

//简化版 思考 ：汉字比基础字节要大一字节 所以可以这样写 想一想 换一种方法写
//编程就是找规律 找的规律越简单 写代码越简单  找到规律锁定规律 抽象规律
/*
function strLen(str){
    var num= str.length;
    for(var i=0; i<str.length; i++){
        if(str.charCodeAt(i)>255){
            num++;
        }
    }
    console.log(num);
}

strLen('asla啦啦')
*/
//最终 最高效的方法0
/*
function strLen(str){
    var num,
        strLength;
        num = strLength= str.length;
    for(var i=0;i<strLength; i++){
        if(str.charCodeAt(i)>255){
            num++
        }
    }
    console.log(num);    
}
strLen('ijh啦')
*/

//逗号运算符 会先计算 然后把 逗号后面的值赋给变量 反正都是吧后面的值取出来

// var a= (1+2,1+6);//7
// console.log(a);//7

/*
var x=1;
if(function f(){}){
//1. () 会把fun 变成表达式 所以从此f不复存在了 
//2. if() 会判断里面的fun 并未得到声明 最终把它转化成true 然后在执行
    x+= typeof f;
//任何未经声明的值 放在typeof 中都不会报错 统一返回undefined
//1+'undefined' = '1undefined' 否则就是 NaN
}
console.log(x);

*/

//学会调试 7天项目 2天开发 5天调试改错



//对象
/*
var mrNiu={
    name: 'MrNiu',
    sex:'girl',
    eat: "orange",
    age: 19,
    love: function(){
        console.log('我爱'+'znl ')
    }
}

mrNiu.love();
mrNiu.hobby="跑步";//增加

delete(mrNiu.age); //删除

mrNiu.eat= "手擀面"; //修改

console.log(mrNiu.eat);//查找

console.log(mrNiu.abc);//undefined 访问对象里没有的属性返回undefined
*/
// console.log(abc);//报错
//当一个变量未经声明就使用会报错
//当一个对象的属性 未经声明就使用 会返回undefined


//对象的创建方法

/*
1. var obj={}; 
plainObject 对象字面量/对象直接量
2. 构造函数
  2.1 系统自带的构造函数 Object()
  2.2 自定义 的构造函数
  使用 new 操作符
  var obj= new Object();
3.   


PS: 构造函数和普通函数没有任何区别
function Abc(){} 这也可以是一个构造函数
使用大驼峰式命名 首字母大写
但是要使用 new 操作符 var abc= new Abc();
*/

//构造函数

/*
function Car(color){
    this.color = color;
    this.name = "BMW";
    this.height = "1400";
    this.lang = '4900';
    this.weight = 1000;
    this.health = 100;
    this.run = function (){
        this.health --;
    }
}

var car = new Car('red');
var car1 = new Car('orange');
*/

//构造函数的内部原理 三段式
// 1. 在函数体最前面隐式的加上this={}
// 2. 执行this.xxx = xxx;
// 3. 隐式的返回this

/*
function Person(name,height){
    //1. var this= {}; * AO{var this={name:'znl'..}}
    this.name= name;
    this.height= height;
    this.say = function (){
        console.log(this.say);
    }
    //3. return this; *返回这个对象
}

console.log(new Person('znl', '180').name);//znl
*/

//模拟一个构造函数
/*
function Person(name, age){
    var that={};
    that.name = name;
    that.age = age;
    return that;
}
var z= Person('znl',18);
var w= Person('wjr',19);
*/
//冷门知识 new 之后的构造函数  总结一句话 有new了就不能返回原始值
//如果return 原始值 那么会忽略原始值 替换成this返回出去 
//如果返回的是一个对象类型（Obj fun arr Math..）的 那么可以返回


//包装对象
//只有对象才有属性和方法
//原始值没有属性和方法 他能够使用的属性和方法是在调用属性和方法之后转换成了对应的包装类 
//执行完毕后又把执行结果返回的回来
//基础数据类型 只能借助包装对象 才会有属性和方法 使用完方法之后又变回原始值

/*
var num = new Number(123);
var str = new String('ing');
var bal = new boolean('true');

//undefined 和 null 没有包装对象 所以没有任何方法

//包装类 
var num =4;
num.len = 3;
console.log(num.len);//undefined 访问一个对象中不存在属性会返回一个undefined
*/

//解析：
//new Number(4).len = 3;
//delet len
//new Number(4).len --> undefined 
//每次new Number(4) 都是一个独一无二的对象

/*
var s = '123';
s.length = 1;
console.log(s);//123
//解析：
/*
s.length = 1; -> new String('123').length = 1 -> delete
console.log(s); -> '123' 
console.log(s.length)//3
*/

//解析：
/*
s.length; -> new String('123').length -> 3
*length 是String这个构造函数中自带的方法*
*/

//包装类型 面试题
/*
var str = 'abc';
str +=1;//'abc1'
var test = typeof(str);//'string'
if(test.length == 6){//'string == 6'-> true 
    test.sign = "typeof 的返回结果可能是String";
    //new String('string').sign= "typeof 的返回结果可能是String" -> delete
}
console.log(test.sign);//undefined
*/
// typeof 的返回值： boolean string  number undefined null object function

/*
*总结一句话  给原始值赋值跟没赋一样  如果访问 统一返回undefined
*/

//面试题
// 运行test() 和 new test() 的结果分别是什么
/*
var a = 5;
function test(){
    a = 0;
    console.log(a);
    console.log(this.a);
    var a;
    console.log(a);
}
test();//0 0 0  错了 0 5 0
new test();//0 undefined 0 这个好好看看
*/

//面试题

// 2.分析下面的JavaScript代码段
/*
function employee(name, code) {
      this. name="wangli";
      this. code="A001" ;
    }

newemp = new employee (" zhangming", ' A002');
document.write ("雇员姓名:"+newemp. name+ "<br>");
document.write("雇员代号:"+ newemp.code +"<br>");
*/
// 输出的结果是(选择一项 我的答案：A 正确答案：A
// A.雇员姓名:wangli 雇员代码:A001
// B.雇员姓名zhangming雇员代码A002
// C.雇员姓名:null,雇员代码: null
// D.代码有错误，无输出结果



//面试题
/*
function Person(name, age, sex){
    var a=0;
    this.name= name;
    this.age= age;
    this.sex= sex;
    function s(){
        a ++;
        console.log(a);
    }
    this.say = s;
} 
var oPerson = new Person();
oPerson.say();//1
oPerson.say();//2
var oPerson1= new Person();
oPerson1.say();//1
*/


//百度2013面试题
/*
var  x= 1,y= z= 0;

function add(n){
    return n= n+ 1;
}

y= add(x);
function add(n){
    return n= n + 3;
}
z= add(x);

console.log(x,y,z);
//          1 4 4    
// x y z 错误  预编译环节会覆盖函数
// 1 2 4

*/

/*

8.写-一个方法，求一个字符串的字节长度。  
(提示:字符串有一个方法charCodeAt0;一个中文占两个字节， 一个英文占 一个字节 定义和用法）
charCodeAtO方法可返回指定位置的字符的Unicode编码。这个返回值是0 -65535之间的整数。
(当返回值是<= 255时，为英文，当返回值> 255时为中文)

    语法：
    stringObject.charCodeAt(index)

    eg:

    var str= "Hello world!"
    document.wirte(str.charCodeAl(0));/ /输出101</script>
*/

/*
function strLen(str){
    var num = 0;
    for(var i=0; i<str.length; i++){
        if(str.charCodeAt(i)<=255){
            num++;
        }else if(str.charCodeAt(i)>255){
            num+=2;
        }
    }
    return num;
}

var str= "goodGey 2018 Hello 2019"
var len= strLen(str);
console.log(len);
*/

// 简写
function strLen(str){
    var num,
        length;
    num = length = str.length;
    for(var i = 0;i < length;i++){
        if(str.charCodeAt(i)>255){
            num++;
        }
    }
    return num;
}
var str= "goodGey 2018 Hello 2019啦"
var len= strLen(str);
console.log(len);