const config = require("../Setting/config")
const {updatefile} = require("./Writefile")
var maxTemp = 0;            // อุณหภูมิสูงสุด
var minTemp = 1000;         // อุญหภูมิต่ำสุด
var DAP = 0;        
var P =0.27;                
var ET_Day =0;              // สัมประสิทธิ์ความต้องการน้ำของพิช
var etInterval=[]           // ผลรวมสัมประสิทธิ์ความต้องการน้ำของพิช
var rainInterval=[]         // ผลรวมปริมาณน้ำฝน
var count = 0;              // ค่าที่ใช้ในการชี้ช่องในตัวแปรอาเรย์
var countday = 0;           // ค่าที่ใช้ในการนับวันของการจ่ายน้ำรอบแรก
var dayCountinValve =[0,0,0,0,0];
var Apx = 0;                // ค่่าโดยประมาณของความต้องการน้ำ
var Sum =0;                 
var SumetInterval =0;       // ผลรวมมประสิทธิ์ความต้องการน้ำของพิช เพื่อใช้ในการคำนวณค่า Apx
var dayConfig = config.dayConfig;           // วันที่เมือครบรอบจ่ายน้ำ    Config
var Irrigation =0;          // ความสูงของปริมาณน้ำ
var Area = config.Area;               // พิ้นที่  Config
var valvestatus = true;    // สถานะของวาล์วน้ำ
var rainDay=0;              // ปริมาณน้ำฝนรายวัน
var pump = config.pump ;              // จำนวนปั้ม ในที่นี้หมายถึงโซนการจ่ายน้ำ โซนละ 4 ปั้ม Config
var countpump = 0;          // จำนวนวาล์วที่นับใช้ในการควบคุมแต่ละวาล์ว
var Round_status = false;   // ค่าที่ใช้ในการเช็คว่าผ่านการให้น้ำรอบแรกไปหริอยัง
var SumrainInterval = 0;    // ผลรวมประมาณน้ำผล
var Ready = false;          // เช็คว่ามี
var pumpRate = config.pumpRate    ;      // อัตราการจ่ายน้ำของปั้ม
var Round_Zone = false ;
var Zone = 1 ;
var countZone = 0 ;
var dueDate = "";  //บอกวันที่จะจ่ายน้ำล่วงหน้า

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
  const Time = new Date();
    ET_Day = P * ((0.46 * (( maxTemp + minTemp) / 2)) + 8);
    
   console.log(`ET = ${ET_Day.toFixed(2)}  maxTemp = ${maxTemp} minTemp =${minTemp}`);
    etInterval[count] = ET_Day.toFixed(2)
    rainInterval[count] = rainDay
    count++;
    countday++;
    
    if(count == 1){
        dueDate = calculateDate(dayConfig)
    }

    

    for(let i =0;i<pump;i++){
        dayCountinValve[i] +=1;
      }
        console.log(`dayCountinValve : ${dayCountinValve[0]}`);
        console.log(`dayCountinValve : ${dayCountinValve[1]}`);
        console.log(`dayCountinValve : ${dayCountinValve[2]}`);
        console.log(`dayCountinValve : ${dayCountinValve[3]}`);

      for(let i=0;i<count;i++){

        Sum +=parseFloat(etInterval[i]);
        SumetInterval = Sum;
      }

     
   
      //  console.log(SumetInterval);
      Sum = 0;
      Apx = ((SumetInterval/count)*(dayConfig+countpump));
      //console.log(`Apx = ${Apx}`);
      console.log(`CountDay = ${countday}`);
      if( countday >= dayConfig){
     
        console.log(etInterval);
     
         ///หาค่าความต้องการน้ำของพืช ตามวันที่วาล์วต้องจ่ายน้ำ
          for(let i=0;i<countday;i++){
                    Irrigation+=parseFloat(etInterval[i]);
            }

            console.log(Irrigation);
            
            console.log(SumrainInterval);
               //หาค่าน้ำฝน ตามวันที่วาล์วต้องจ่ายน้ำ
          for(let i=0;i<countday;i++){
                     SumrainInterval+=parseFloat(rainInterval[i]);
            }

           // console.log(SumrainInterval);
            //นำค่าน้ำฝนมาลบกับค่าความต้องน้ำของพืชและคุณด้วยพื้นที่ไร่
            Irrigation =  (( Irrigation - SumrainInterval)).toFixed(2);

            console.log(`Irrigation = ${Irrigation} Area = ${countpump}` );
            

            valvestatus = false;
            
            
        //countday = 0;
        }
        updatefile(`${Time.getDate()}/${Time.getMonth()}/${Time.getFullYear()},${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()},${maxTemp},${minTemp},${ET_Day.toFixed(3)},${etInterval},${rainDay},${rainInterval},${Irrigation}`)
 
        maxTemp = 0;
        minTemp = 100000;
        rainDay = 0;
}

function Calculate_round_2() {
  const Time = new Date();
    ET_Day = P*((0.46 * (( maxTemp+minTemp )/2) + 8 )) ;
    console.log(ET_Day);
    etInterval[count] = ET_Day.toFixed(2)
    rainInterval[count] = rainDay
    count++;
    countday++;

    if(dayCountinValve[0] ==1){
        dueDate = calculateDate(dayConfig);
    }

    for(let i =0;i<pump;i++){
        dayCountinValve[i] +=1;
      }

      console.log(`dayCountinValve : ${dayCountinValve[0]}`);
      console.log(`dayCountinValve : ${dayCountinValve[1]}`);
      console.log(`dayCountinValve : ${dayCountinValve[2]}`);
      console.log(`dayCountinValve : ${dayCountinValve[3]}`);

      for(let i=0;i<count;i++){

        Sum +=etInterval[i];
        SumetInterval = Sum;
      }
      Sum = 0;
      Apx = ((SumetInterval/count)*(dayConfig+countpump));
      console.log(`CountDay = ${countday}`);
      if((dayConfig == dayCountinValve[0])||(dayConfig == dayCountinValve[1])||(dayConfig == dayCountinValve[2])||(dayConfig == dayCountinValve[3])){

        console.log(etInterval);

        ///หาค่าความต้องการน้ำของพืช ตามวันที่วาล์วต้องจ่ายน้ำ
          for(let i=0;i<dayConfig;i++){
              Irrigation+=parseFloat(etInterval[i]);
            }
      
         //หาค่าน้ำฝน ตามวันที่วาล์วต้องจ่ายน้ำ
          for(let i=0;i<dayConfig;i++){
              SumrainInterval+=parseFloat(rainInterval[i]);
            }
      
            //นำค่าน้ำฝนมาลบกับค่าความต้องน้ำของพืชและคุณด้วยพื้นที่ไร่
            Irrigation =  (( Irrigation - SumrainInterval)).toFixed(2);
            console.log(`Irrigation = ${Irrigation} Area = ${Area}` );

            //console.log(Irrigation);
            //ส่งสถานะไปให้วาล์วปล่อยน้ำ
            
            valvestatus = false;
          // Control_V.setsend(true);
        //countday = 0;
        }
        
        updatefile(`${Time.getDate()}/${Time.getMonth()}/${Time.getFullYear()},${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()},${maxTemp},${minTemp},${ET_Day.toFixed(3)},${etInterval},${rainDay},${rainInterval},${Irrigation}`)
        maxTemp = 0;
        minTemp = 100000;
        rainDay = 0;
}

function Timeopenvalve(){
        let H = Math.floor(((Irrigation*Area)/pumpRate)/60)
        let M = Math.floor(((Irrigation*Area)/pumpRate)-(60*H))
        return `${H>=10?H:"0"+H}:${M>=10?M:"0"+M}`
}

function calculateDate(inputDay){

    let due = new Date();

    let D = due.getDate(), M = due.getMonth()+1, Y = due.getFullYear();

    if (M == 1 || M == 3 || M == 5 || M == 7 || M == 8 || M == 10 || M == 12) {
  
      D = inputDay + D;
      if (D > 31) {
        D -= 31;
  
        M++;
      }
    }
    else if (M == 2) {
      if ((Y % 4 == 0 && Y % 100 != 0) || (Y % 400 == 0))
      {
        D = inputDay + D;
        if (D > 29) {
          D -= 29;
  
          M++;
        }
      }
  
      else
      {
        D = inputDay + D;
        if (D > 28) {
          D -= 28;
  
          M++;
        }
      }
    }
  
  
    else {
      D = inputDay + D;
      if (D > 30) {
        D -= 30;
  
        M++;
      }
    }

    if(D == due.getDate()&& M == due.getMonth()+1 && Y == due.getFullYear()){
      return (``)
    }else{
      
      return (`${D<10?"0"+D:D}/${M<10?"0"+M:M}/${Y}`)
    }
    
    
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

function setRound_status(set){
    Round_status = set;
}

function getArea(){
    return Area;
}

function getpumpRate(){
    return pumpRate;
}

module.exports={
    findMax_Min,Calculate_round_1,Calculate_round_2,
    getIrrigation,getvalvestatus,getcountpump,minusIrrigation,
    setIrrigation,setSumrainInterval,setdayCountinValve,
    pluscountpump,getpump,getRound_status,setRound_status,setcountpump,setcount,
    setcountday,setvalvestatus,getArea,getpumpRate,setZone,getZone,
    getcountzone,plusZone,setcountzone,getdueDate,setdueDate,Timeopenvalve,updateRainday
}