var i = 0;
var j = 1;
var count = 0
setInterval(()=>{

    console.log(`${j} , ${i}   count = ${count}`);
    
    
    if(count == 3){
        count = 0
        i = 1;
        j+=1;
    }
    if(j > 4){
        j = 1;
    }

    count+=1;
},1000)