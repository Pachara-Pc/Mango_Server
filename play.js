let Time = new Date();
let H = Time.getHours() ;
let M = Time.getMinutes();

for(let i =1;i<=4;){
 
    console.log(`valve ${i} : ${H}:${Math.floor(M)}`);
      M+=countDown/4
    
    while(M>59){
      console.log(M);
    if(M > 59){
      M-=59;
      H+=1;
    }
    
    console.log("in while");
    }
    

    console.log(`valve ${i} : ${H}:${Math.floor(M)}:${1}`);
    
    timeStop.push(`${H}:${Math.floor(M)}:${1}`);
    i++;
      
    }