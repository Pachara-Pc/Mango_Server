var a = 10;
let i = 0;
setInterval(()=>{
   
    if(i == 5){
        const A = setInterval(()=>{

            if(i%5 ==0){
                clearInterval(A)
                console.log("clear");
            }
   
        },1000);
    }

    i++;

    console.log(i);
}
,1000);