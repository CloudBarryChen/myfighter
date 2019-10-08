
var saveData = function(score) {
    if (localStorage.arr == undefined) {
        var arr = [];
        arr.push(score);
        var str = JSON.stringify(arr);
        localStorage.arr = str;
    } else {
        var obj = JSON.parse(localStorage.arr);
        var arr = [];
        for (let i in obj) {
            arr.push(obj[i]);
        }
        arr.push(score);
        arr.sort(function(a,b){
            return b-a;
        });
        if(arr.length>10){
            arr.length = 10;
        }
        var str = JSON.stringify(arr);
        localStorage.arr = str;
    }
    console.log(localStorage.arr);
    console.log(arr);
}

var readData = function () {
    var str = localStorage.arr;
    var obj = JSON.parse(str);
    var arr = [];
        for (let i in obj) {
            arr.push(obj[i]);
        }
    return arr;
}

window.onunload = function(){
    GAME.save();
}