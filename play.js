var a = 10;
let i =0;
const A = setInterval(()=>{

    
    if(i== 5){
        console.log("clear");
        setTimeout(()=>{
            clearInterval(A);
            
        },3000)
       
    }
    i++;
    console.log(i);
},1000)