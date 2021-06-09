const {getdayConfig,getArea,getpumpRate,getTotalpump} = require("../Setting/config")
const {updateLog_Zone} = require("../File/Writefile")
var maxTemp = 0;            // อุณหภูมิสูงสุด
var minTemp = 1000;         // อุญหภูมิต่ำสุด
var DAP = 0;        
var P = [0.26,0.26,0.27,0.28,0.29,0.29,0.29,0.28,0.28,0.27,0.26,0.25];                
var ET_Day =0;              // สัมประสิทธิ์ความต้องการน้ำของพิช
var etInterval=[]           // ผลรวมสัมประสิทธิ์ความต้องการน้ำของพิช
var rainInterval=[]         // ผลรวมปริมาณน้ำฝน
var count = 0;              // ค่าที่ใช้ในการชี้ช่องในตัวแปรอาเรย์
var countday = 0;           // ค่าที่ใช้ในการนับวันของการจ่ายน้ำรอบแรก
var dayCountinValve =[0,0,0,0,0];
var Apx = 0;                // ค่่าโดยประมาณของความต้องการน้ำ
var Sum =0;                 
var SumetInterval =0;       // ผลรวมมประสิทธิ์ความต้องการน้ำของพิช เพื่อใช้ในการคำนวณค่า Apx
//var getdayConfig() = getgetdayConfig()();           // วันที่เมือครบรอบจ่ายน้ำ    Config
var Irrigation =0;          // ความสูงของปริมาณน้ำ
//var getArea() = getgetArea()();               // พิ้นที่  Config
var valvestatus = true;    // สถานะของวาล์วน้ำ
var rainDay=0;              // ปริมาณน้ำฝนรายวัน
//var pump = getTotalpump() ;              // จำนวนปั้ม ในที่นี้หมายถึงโซนการจ่ายน้ำ โซนละ 4 ปั้ม Config
var countpump = 0;          // จำนวนวาล์วที่นับใช้ในการควบคุมแต่ละวาล์ว
var Round_status = false;   // ค่าที่ใช้ในการเช็คว่าผ่านการให้น้ำรอบแรกไปหริอยัง
var SumrainInterval = 0;    // ผลรวมประมาณน้ำผล
var Ready = false;          // เช็คว่ามี
//var getpumpRate() = getgetpumpRate()();      // อัตราการจ่ายน้ำของปั้ม
var Round_Zone = false ;
var Zone = 1 ;
var countZone = 0 ;
var dueDate = "";  //บอกวันที่จะจ่ายน้ำล่วงหน้า
var Kc = [1.6,1.52,1.32,1.35,1.34,2.35,2.32,3.13,2.78,2.75,2.54,1.63];


// new variable
var Total_Zone = 2
var CheckDayonValue = "not waterd";
var Zone_Irrigation = [0,0]
var Zone_Rain_Sum = [0,0]
var Zone_ET_Day_Sum = [0,0]
/////////////

const updateRainday = (Rain)=>{
  console.log(`Rain : ${Rain} `);
    rainDay+=Rain;
    console.log(`rainDay : ${rainDay} `);
}
const dateOnvalve =(Day)=>{
    let day = new Date();

}
const findMax_Min = (Temp)=>{
    if(Temp>maxTemp && Temp<70){
        maxTemp =Temp
    }

    if(Temp<minTemp && Temp >5){
        minTemp = Temp
    }
}

function Calculate_round_1() {
//   maxTemp =35
//   minTemp =30
//   rainDay =2 
  const Time = new Date();

    ET_Day = P[Time.getMonth()-1] * ((0.46 * (( maxTemp + minTemp) / 2)) + 8) * Kc[Time.getMonth()-1] ;
    // console.log(P[Time.getMonth()]);
    // console.log(Kc[Time.getMonth()]);
    // console.log(`ET = ${ET_Day.toFixed(2)}  maxTemp = ${maxTemp} minTemp =${minTemp}`) ;
    

    Irrigation = ET_Day - rainDay
    
    // เก็บค่าของโซนทั้ง 2 โซน
    for(let i =0;i<Total_Zone;i++){
      Zone_Irrigation[i] += parseFloat(Irrigation)
      Zone_Rain_Sum[i] += parseFloat(rainDay)
      Zone_ET_Day_Sum[i] += parseFloat(ET_Day)
      
    }

    // console.log(Zone_Irrigation);
    // console.log(Zone_Rain_Sum);
    // console.log(Zone_ET_Day_Sum);

    for(let i =0 ;i<Total_Zone;i++){
      const listData = {
        Number : `${i+1}`,
        Ir : `${Zone_Irrigation[i].toFixed(2)}`,
        Rain_Day:`${rainDay.toFixed(2)}`,
        Rain_sum: `${Zone_Rain_Sum[i].toFixed(2) }`,
        ET_Day:`${ET_Day.toFixed(2)}`,
        ET_sum: `${Zone_ET_Day_Sum[i].toFixed(2)}`
      }
      updateLog_Zone(listData)
    }
    
    console.log(Zone_Irrigation);

      maxTemp = 0;
      minTemp = 100000;
      rainDay = 0;

}


function Timeopenvalve(){
        let H = Math.floor(((Zone_Irrigation[Zone-1]*getArea())/getpumpRate())/60)
        let M = Math.floor(((Zone_Irrigation[Zone-1]*getArea())/getpumpRate())-(60*H))
        return `${H>=10?H:"0"+H}:${M>=10?M:"0"+M}`
}




function showRain(){
    
    return Zone_Rain_Sum[Zone-1]
  }

function setcountzone (set){
    countZone = set
}

function getZone(){
    return Zone
}
function getcountzone(){
    return countZone
}
function plusZone(set){
    Zone+=set;
}

function setZone(set){
    Zone = set
}

function getvalvestatus(){
    return valvestatus;
}

function setvalvestatus(set){
    valvestatus = set;
}

function getcountpump(){
    return countpump;
}

function getIrrigation(){
    return Irrigation;
}

function setSumrainInterval(set) {
    SumrainInterval = set;
    console.log(`Set Sumrain =  ${SumrainInterval}`);
}

function setIrrigation(set){
    Irrigation = set;
    dueDate = calculateDate(1);
}

function minusIrrigation(){
    Irrigation-=10;
}

function pluscountpump(set){
    countpump+=set;
}

function setcountpump(set){
    countpump = set;
}

function setcount(set){
    count =set;
}

function setcountday(set){
    countday = set;
}
function getdueDate(){
    return dueDate;
}
function getpump(){
 let pump = getTotalpump()
    return pump;
}

function setdueDate(set){
   dueDate = set
}

function setdayCountinValve(set){
    dayCountinValve[set]=0;
}

function getRound_status(){
    return Round_status;
}
function getCheckDayonValue(){
    return CheckDayonValue
}

function setCheckDayonValue(set){
  CheckDayonValue = set
}
function setRound_status(set){
    Round_status = set;
}

function getZone_Irrigation(index){
  return Zone_Irrigation[index]
}

function setZone_Irrigation(index){
  Zone_Irrigation[index] = 0
}


function getZone_Rain_Sum(index){
  return Zone_Rain_Sum[index] 
}

function setZone_Rain_Sum(index){
   Zone_Rain_Sum[index] = 0
}

function getZone_ET_Day_Sum(index){
  return Zone_ET_Day_Sum[index]
}


function SetZone_ET_Day_Sum(index){
  Zone_ET_Day_Sum[index] = 0
}


module.exports={

    findMax_Min,Calculate_round_1,
    getIrrigation,getvalvestatus,getcountpump,minusIrrigation,
    setIrrigation,setSumrainInterval,setdayCountinValve,
    pluscountpump,getpump,getRound_status,setRound_status,setcountpump,setcount,
    setcountday,setvalvestatus,setZone,getZone,
    getcountzone,plusZone,setcountzone,getdueDate,setdueDate,
    Timeopenvalve,updateRainday,showRain,
    getCheckDayonValue,setCheckDayonValue,
    getZone_Irrigation,setZone_Irrigation,
    getZone_Rain_Sum,setZone_Rain_Sum,
    getZone_ET_Day_Sum,SetZone_ET_Day_Sum
}