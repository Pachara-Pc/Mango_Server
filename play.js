var i = 0;
var j = 1;
var count = 0
const A = setInterval(()=>{

    if(i == 10){
        setTimeout(()=>{console.log(`Time OUT 3 sec`);},3000)
        setTimeout(()=>{console.log(`Time OUT 5 sec `);},5000)
        console.log(i);
        clearInterval(A)
    }
    i++;
    console.log(i);
},200)