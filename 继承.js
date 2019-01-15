// console.log(foo);

// function foo(){
//     console.log("foo");
// }

// var foo = 1;
// ------
// var dad = {};
// var son = {};
// function show(){
//   return this;
// }
// var newShow = show.bind(dad);//dad
// var newShow1 = newShow.bind(son);//son
// console.log(newShow() == dad);//true
// console.log(newShow1() == son);//true
// ------
// this.a = 1;
// var module = {
//     a : 2,
//     getA: function() {
//     return this.a;
//     }
// };
// module.getA();//
// var getA1 = module.getA;
// // getA在外部调用，此时的this指向了全局对象
// getA1();//
// // 再把getA1方法绑定到module环境上
// var getA2 = getA1.bind(module);
// getA2();
// ----
// call 和 apply  作用：改变this指向。 区别：传参列表不同。
// call(this, 参数1, 参数2..) | apply(this, [参数1, 参数2..])
//   call需要把实参按照形参的个数传进去， apply 需要传一个arguments（数组）
// function test(){};
// test() --> test.call(); test()函数执行就是test.call()
// fun.call(指定的this, val1, val2, val3...);  利用别人的方法，实现自己的功能

// var name = 'www';
// var age = 17;
// var obj = {
//   name: 'zzz',
//   age: 18
// }
// function fun(){
//   console.log(this.name, this.age);
// }
// // fun();//www 17
// fun.call(obj);//zzz 18

// 借用构造函数继承
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
