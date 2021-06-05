const Calculate = require("./Calculate")
var pump = 0
var ValveNumber = [0,0,0,0];
var minTime = 0;
var S = 0;
var timeStop = [];
var timeStart = [];
var timeReset = [];
var start =0;
var Valve =1;
var Notify = false


function queueValve(countDown){
    Calculate.setCheckDayonValue(true)
    timeStop = [];
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
    
    timeStop.push(`${H}:${Math.floor(M)}:${50}`);
    timeStart.push(`${H}:${Math.floor(M)}:${40}`);

     if(i===4){
         timeStop.push(`${H}:${Math.floor(M)}:${40}`);
         timeReset.push(`${H}:${Math.floor(M)}:${50}`);
        console.log(Calculate.getCheckDayonValue());
       console.log(timeStart);
       console.log(timeStop);
       console.log(timeReset);

       }
       
    i++;
      
    }
    

      
}

setInterval(() => {
    let Time = new Date();

    if(start == 1){
      Notify = false;
      //console.log(`on Valve ${Valve}`);
        
        ValveNumber[Valve-1] = 1;


        //เปิดวาล์วถัดไป
        if(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}` === `${timeStart[Valve-1]}`){
          ValveNumber[Valve] = 1;
        }


       

      //console.log(`pump ON = ${pump}`);
        //ปิดปั้มน้ำ
        if(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}` === `${timeStop[4]}`){
          pump = 0;

      //console.log(`pump OFF = ${pump}`);
        }

        //ปิดวาล์ว
      if(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}` === `${timeStop[Valve-1]}`){
        ValveNumber[Valve-1] = 0;
        
      //  console.log(`off Valve ${Valve}`);
        Valve++;
      }
      
      if(Valve === 5){
        //console.log("Start Next Round");
        start = 0;
        Valve = 1;
      }
      
    }
    
      //console.log(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}`);
      
      if(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}` === `${timeReset[0]}`){

      
        console.log("update Zone reset IR");
        Calculate.setdayCountinValve(Calculate.getcountpump());
        // Calculate.pluscountpump(1);
        Calculate.setIrrigation(0)
        timeStop = [];
        timeStart = []
        timeReset = []
    
    Notify = true;
    setTimeout(()=>{Notify = false},40000)
    
    

    if(Calculate.getcountpump() == Calculate.getpump()){
        console.log("rest All ");
        Calculate.setcountpump(0);
        Calculate.setcountday(0);
        Calculate.setcount(0);
        Calculate.setRound_status(true);
        Calculate.setdueDate("");

        console.log(`Clear Round `);
      }
      }

      if(Time.getMinutes()% 7 === 0 && Time.getSeconds()%30 === 0 && Calculate.getCheckDayonValue() === true){
       if( Calculate.getZone()===1){
        Calculate.setZone(2) 
        Calculate.setCheckDayonValue(false)
       }else{
        Calculate.setZone(1)
        Calculate.setCheckDayonValue(false)
       }
     
       
      }
     

      
}, 500);


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

function checkNotify(){
  return Notify;
}

module.exports ={
    queueValve,getValveNumber,setStart,getPump,setPump,checkNotify
}

