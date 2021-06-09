var fs = require('fs');


function padZero(input){
    return  input.toString().padStart(2,'0')
}

const Behavior = (data,zone) =>{
    const date = new Date()
    const Time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()+543},${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`
    const Behavior = `${Time},${data},${zone}`
    return  Behavior
}

// บันทึกข้อมูลของแต่ละโซน
function updateLog_Zone(zone){
    const date = new Date()
    const Time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()+543},${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`
    const Log = `${Time},${zone.Number},${zone.ET_Day},${zone.ET_sum},${zone.Rain_Day},${zone.Rain_Day},${zone.Ir}\r\n`
    console.log('updateLog_Zone');
    console.log(Log);
    fs.appendFile(`./File/Zone_${zone.Number}.csv`, Log , function (err) {
        if (err) throw err;
        console.log('Updated! updateLog_Zone');
      });

}

//บันทึกข้อมูลผู้ใช้งาน เวลาในการจ่ายน้ำ
function writeLog(Data){
    console.log('writeLog');
    console.log(Data);
    fs.appendFile('./File/Behavior.csv',Behavior(Data)+"\r\n",function (err) {
        if (err) throw err;
        console.log('Updated! writeLog');
      });
}


module.exports={
    writeLog,updateLog_Zone
}