var maxTemp = 0;        //อุณหภูมิสูงสุด
var minTemp = 10000;    //อุณหภูมิต่ำสุด
var ET_Day = 0;         //ความต้อการน้ำของพืชรายวัน
var rainDay = 0;        //ปริมาณน้ำฝนรายวัน
var etInterval = [] ;   //ความต้องการน้ำของพืชสะสม
var rainInterval = [];  //ปริมาณน้ำฝนสะสม
var Kc = 0;             //สัมประสิทธิการใช้น้ำของพืช
var DAP = 0;            //จำนวนวันที่ปลูกพืช
const p = [0.26,0.26,0.27,0.28,0.29,0.29,0.29,0.28,0.28,0.27,0.26,0.25]; 


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


function etCal(){
    return p[1] * ((0.46 * ((maxTemp + minTemp) / 2)) + 8);
}

function CheckTemp(){

    return `max = ${maxTemp} min = ${minTemp} Rain = ${rainDay}`;
  //  console.log(`MaxTemp = ${maxTemp} MinTemp =${minTemp}`);
}

module.exports ={
    findMax,findMin,CheckTemp,etCal,rainUpdate
}