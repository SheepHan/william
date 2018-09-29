//严格模式下，eval()在运行的时候有自己的词法作用域，不会影响其所在区域原先的作用域
//严格模式下，输出 1 2    非严格模式，输出 1 3
function foo(str,a){
    "use strict" 
    eval (str)
    console.log(a,b)
}
var  b=2
foo('var b=3;',1)