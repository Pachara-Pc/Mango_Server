var maxTemp = 0;
var minTemp = 1000;
var DAP = 0;
var P =0.27;
var ET_Day =0;
var etInterval=[]
var rainInterval=[]
var count = 0;
var countday = 0;
var dayCountinValve =[0,0,0,0,0];
var Apx = 0;
var Sum =0;
var SumetInterval =0;
var dayConfig =5;
var Irrigation =0;
var Area = 1;
var valvestatus = false;
var rainDay=0;
var pump = 4 ;
var countpump = 0;
var Round_status = false;
var SumrainInterval = 0;

const findMax_Min = (Temp)=>{
    if(Temp>maxTemp){
        maxTemp =Temp
    }

    if(Temp<minTemp){
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
            Irrigation =  (( Irrigation - SumrainInterval)*Area).toFixed(2);
            console.log(`Irrigation = ${Irrigation} Area = ${Area}` );
            

            valvestatus = true;
       
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
      if((dayConfig == dayCountinValve[0])||(dayConfig == dayCountinValve[1])||(dayConfig == dayCountinValve[2])||(dayConfig == dayCountinValve[3])){

        console.log(etInterval);

        ///หาค่าความต้องการน้ำของพืช ตามวันที่วาล์วต้องจ่ายน้ำ
          for(let i=0;i<dayConfig;i++){
              Irrigation+=parseInt(etInterval[i]);
            }
      
         //หาค่าน้ำฝน ตามวันที่วาล์วต้องจ่ายน้ำ
          for(let i=0;i<dayConfig;i++){
              SumrainInterval+=parseFloat(rainInterval[i]);
            }
      
            //นำค่าน้ำฝนมาลบกับค่าความต้องน้ำของพืชและคุณด้วยพื้นที่ไร่
            Irrigation =  (( Irrigation - SumrainInterval)*Area).toFixed(2);
            console.log(`Irrigation = ${Irrigation} Area = ${Area}` );

            //console.log(Irrigation);
            //ส่งสถานะไปให้วาล์วปล่อยน้ำ
            valvestatus = true;
       
        //countday = 0;
        }
}



function getvalvestatus(){
    return valvestatus;
}
function setvalvestatus(set){
    valvestatus =set
}

function getcountpump(){
    return countpump;
}

function getIrrigation(){
    return Irrigation;
}

function setSumrainInterval(set) {
    SumrainInterval = set
}

function setIrrigation(set){
    Irrigation = set
}

function minusIrrigation(){
    Irrigation-=10;
}

function getcountpump(){
    return countpump;
}

function pluscountpump(set){
    countpump+=set;
}

function setcountpump(set){
    countpump = set
}

function setcount(set){
    count =set
}

function setcountday(set){
    countday = set
}

function getpump(){
    return pump;
}

function setdayCountinValve(set){
    dayCountinValve[set]=0;
}

function getRound_status(){
    return Round_status
}

function setRound_status(set){
    Round_status = set;
}

module.exports={
    findMax_Min,Calculate_round_1,Calculate_round_2,
    getIrrigation,getvalvestatus,getcountpump,minusIrrigation,
    setIrrigation,setSumrainInterval,setdayCountinValve,getcountpump,
    pluscountpump,getpump,getRound_status,setRound_status,setcountpump,setcount,
    setcountday,setvalvestatus
}