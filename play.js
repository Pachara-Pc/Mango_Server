var A = 10;

const Run = setInterval(()=>{


    console.log("get = "+ getA());
    setA(2)
if(A ===0){
    clearInterval(Run)
}

},1000)

function getA(){
    return A;
}
function setA(set){
    A -= set
}