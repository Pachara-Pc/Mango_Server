var ValveNumber = [0,0,0,0];
var minTime = 0;
var S = 0;
var timeStop = [];
var start =0;
var Valve =1;

function queueValve(countDown){
    var Time = new Date();
    let H = Time.getHours() ;
    let M = Time.getMinutes();


    for(let i =1;i<=4;){
 
    console.log(`valve ${i} : ${H}:${Math.floor(M)}`);
      M+=countDown/4
    
    while(M>59){
      console.log(M);
    if(M >= 60){
      M-=60;
      H+=1;
    }
    console.log("in while");
    }
    

    console.log(`valve ${i} : ${H}:${Math.floor(M)}:${1}`);
    
    timeStop.push(`${H}:${Math.floor(M)}:${1}`);
    i++;
      
    }
    

      
}

setInterval(() => {
    let Time = new Date();
    if(start == 1){
        console.log(`on Valve ${Valve}`);
        ValveNumber[Valve-1] = 1;
        


      if(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}` === `${timeStop[Valve-1]}`){
        ValveNumber[Valve-1] = 0;
        console.log(`off Valve ${Valve}`);
        Valve++;
      }
    
      if(Valve === 5){
        start = 0;
        Valve = 1;

        timeStop = [];
        
      }

    }
    
      console.log(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}`);
      
    
}, 1000);


function getValveNumber(i){
    return ValveNumber[i];
}

function setStart(set){
    start = set;
}


module.exports ={
    queueValve,getValveNumber,setStart
}