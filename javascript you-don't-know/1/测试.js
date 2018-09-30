
var funcs = [];
for(let i = 0; i < 10; i++){
    funcs.push(function(){
        //输出10次10
        console.log(i);
    });
}
funcs.forEach(function(func){
    func();
})