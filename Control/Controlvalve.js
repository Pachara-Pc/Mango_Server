const Calculate = require("./Calculate")
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
    

    console.log(`valve ${i} : ${H}:${Math.floor(M)}:${1}`);
    
    timeStop.push(`${H}:${Math.floor(M)}:${30}`);
     if(i===4){
         timeStop.push(`${H}:${Math.floor(M)}:${20}`);
      console.log(timeStop);
       }
    i++;
      
    }
    

      
}

setInterval(() => {
    let Time = new Date();

    if(start == 1){
        console.log(`on Valve ${Valve}`);
        ValveNumber[Valve-1] = 1;

       

        console.log(`pump ON = ${pump}`);
        if(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}` === `${timeStop[4]}`){
          pump = 0;

          console.log(`pump OFF = ${pump}`);
        }

      if(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}` === `${timeStop[Valve-1]}`){
        ValveNumber[Valve-1] = 0;
        
        console.log(`off Valve ${Valve}`);
        Valve++;
      }
      
      if(Valve === 5){
        start = 0;
        Valve = 1;
        
        timeStop = [];

    // Calculate.setdayCountinValve(Calculate.getcountpump());
    // Calculate.pluscountpump(1);
    // Calculate.setIrrigation(0)

    // if(Calculate.getcountpump() == Calculate.getpump()){

    //     Calculate.setcountpump(0);
    //     Calculate.setcountday(0);
    //     Calculate.setcount(0);
    //     Calculate.setRound_status(true);
    //     Calculate.setdueDate("");
    //     console.log(`Clear Round `);
    // }
      }

    }
    
      console.log(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}`);
      
    
}, 1000);


function getValveNumber(i){
    return ValveNumber[i];
}
function getPump(){
  return pump;
}

function setPump(set) {
  pump = 1;
}

function setStart(set){
    start = set;
}



module.exports ={
    queueValve,getValveNumber,setStart,getPump,setPump
}