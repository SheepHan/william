var a=2
;(function () {  //此处要记得加分号
    var a=3
    console.log(a)
})()

console.log(a)


//等价于
(function () {  //此处要记得加分号
    var a=3
    console.log(a)
}())

