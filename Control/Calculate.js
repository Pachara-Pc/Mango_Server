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
var dayConfig =2;           // วันที่เมือครบรอบจ่ายน้ำ    Config
var Irrigation =0;          // ความสูงของปริมาณน้ำ
var Area = 1;               // พิ้นที่  Config
var valvestatus = true;    // สถานะของวาล์วน้ำ
var rainDay=0;              // ปริมาณน้ำฝนรายวัน
var pump = 1 ;              // จำนวนปั้ม ในที่นี้หมายถึงโซนการจ่ายน้ำ โซนละ 4 ปั้ม Config
var countpump = 1;          // จำนวนวาล์วที่นับใช้ในการควบคุมแต่ละวาล์ว
var Round_status = false;   // ค่าที่ใช้ในการเช็คว่าผ่านการให้น้ำรอบแรกไปหริอยัง
var SumrainInterval = 0;    // ผลรวมประมาณน้ำผล
var Ready = false;          // เช็คว่ามี
var pumpRate = 2    ;      // อัตราการจ่ายน้ำของปั้ม
var Round_Zone = false
var Zone = 1 ;
var countZone = 0 ;


const findMax_Min = (Temp)=>{
    if(Temp>maxTemp && Temp<70){
        maxTemp =Temp
    }

    if(Temp<minTemp && Temp >5){
        minTemp = Temp
    }
}

function Calculate_round_1() {
    ET_Day = P * ((0.46 * (( maxTemp + minTemp) / 2)) + 8);
    
   console.log(`ET = ${ET_Day.toFixed(2)}  maxTemp = ${maxTemp} minTemp =${minTemp}`);
    etInterval[count] = ET_Day.toFixed(2)
    rainInterval[count] = rainDay
    count++;
    countday++;
    
    for(let i =0;i<pump;i++){
        dayCountinValve[i] +=1;
      }
        console.log(`dayCountinValve : ${dayCountinValve[0]}`);
        console.log(`dayCountinValve : ${dayCountinValve[1]}`);
        console.log(`dayCountinValve : ${dayCountinValve[2]}`);
        console.log(`dayCountinValve : ${dayCountinValve[3]}`);
      for(let i=0;i<count;i++){

        Sum +=parseInt(etInterval[i]);
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
               //หาค่าน้ำฝน ตามวันที่วาล์วต้องจ่ายน้ำ
          for(let i=0;i<countday;i++){
                     SumrainInterval+=parseFloat(rainInterval[i]);
            }
           // console.log(SumrainInterval);
            //นำค่าน้ำฝนมาลบกับค่าความต้องน้ำของพืชและคุณด้วยพื้นที่ไร่
            Irrigation =  (( Irrigation - SumrainInterval)).toFixed(2);
            console.log(`Irrigation = ${Irrigation} Area = ${Area}` );
            

            valvestatus = false;
            
            
        //countday = 0;
        }
        maxTemp = 0;
        minTemp = 100000;
        rainDay = 0;
}

function Calculate_round_2() {
    ET_Day = P*((0.46 * (( maxTemp+minTemp )/2) + 8 )) ;
    console.log(ET_Day);
    etInterval[count] = ET_Day.toFixed(2)
    rainInterval[count] = rainDay
    count++;
    countday++;

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

function getpump(){
    return pump;
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
    getcountzone,plusZone,setcountzone
}