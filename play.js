var pump = 0
var ValveNumber = [0,0,0,0];
var minTime = 0;
var S = 0;
var timeStop = [];
var start =0;
var Valve =1;

function queueValve(countDown){
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
    

    console.log(`valve ${i} : ${H}:${Math.floor(M)}:${01}`);
    
    timeStop.push(`${H}:${Math.floor(M)}:${30}`);
     if(i===4){
         timeStop.push(`${H}:${Math.floor(M)}:${20}`);

         timeStop.push(`${H}:${Math.floor(M)}:${50}`);
      console.log(timeStop);
       }
    i++;
      
    }
    

      
}
//queueValve(50)

let A = '14:26:30'
let B = '14:26:30'
console.log(`${A==B?true:false}`);
//timeStop.map(e=>{console.log(e>=A?true:false);})