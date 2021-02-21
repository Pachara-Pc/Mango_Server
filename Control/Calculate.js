var maxTemp = 0;        //อุณหภูมิสูงสุด
var minTemp = 10000;    //อุณหภูมิต่ำสุด
var ET_Day = 0;         //ความต้อการน้ำของพืชรายวัน
var rainDay = 0;        //ปริมาณน้ำฝนรายวัน
var etInterval = [] ;   //ความต้องการน้ำของพืชสะสม
var rainInterval = [];  //ปริมาณน้ำฝนสะสม
var Kc = 0;             //สัมประสิทธิการใช้น้ำของพืช
var DAP = 10;            //จำนวนวันที่ปลูกพืช
var count = 0;          //นับครั้งที่ push ET_DAY ลงไปใน etInterval
var dayConfig =4;
var Irrigation = 0;
const p = [0.26,0.26,0.27,0.28,0.29,0.29,0.29,0.28,0.28,0.27,0.26,0.25]; 

Kc = (-0.0004 * (DAP * DAP)) + (0.0498 * DAP) - 0.2429;

const findMax = (max)=>{
    if(max>maxTemp){
             
        maxTemp = max;
      //  console.log(`MaxTemp = ${maxTemp} MinTemp =${minTemp}`);
    }
}

const  findMin = (min)=>{
    if(min<minTemp){
        minTemp = min;
       // console.log(`MaxTemp = ${maxTemp} MinTemp =${minTemp}`);
    }

}

const rainUpdate = (rain) =>{
    rainDay+=rain;
}


function etInterval_Push(){
    ET_Day = ( p[1] * ( (0.46 * ( (maxTemp + minTemp) / 2) ) + 8) ) * Kc;
    etInterval.push(ET_Day.toFixed(2));    
    count++;
    
    if(count > dayConfig){
        etInterval.shift();
    }

    if(count % dayConfig == 0){
        Calculate_IR();
    }
    return etInterval

   
}

function Calculate_IR(){
    etInterval.map(x=>{Irrigation+=parseFloat(x)})

}


function showETinterval(){
    return etInterval
}

function showIrrigation(){
    return Irrigation.toFixed(2)
}

function CheckTemp(){

    return `max = ${maxTemp} min = ${minTemp} Rain = ${rainDay} etInterval = ${etInterval} Irrigation =${Irrigation.toFixed(2)}`;
  //  console.log(`MaxTemp = ${maxTemp} MinTemp =${minTemp}`);
}
function setIrrigation(params){
    Irrigation = params;
}

module.exports ={
    findMax,findMin,CheckTemp,etInterval_Push,showETinterval,rainUpdate,showIrrigation,setIrrigation
}