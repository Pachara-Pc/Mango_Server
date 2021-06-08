var fs = require('fs');


function padZero(input){
    return  input.toString().padStart(2,'0')
}

const Behavior = (data) =>{
    const date = new Date()
    const Time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()+543},${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`
    const Behavior = `${Time},${data}`
    return  Behavior
}

// บันทึกข้อมูลของแต่ละโซน
function updateLog_Zone(zone){
    const date = new Date()
    const Time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()+543},${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`
    const Log = `${Time},${zone.Number},${ET_Day},${ET_sum},${Rain_Day},${Rain_Day},${Ir}\r\n`

    fs.appendFile(`./Zone_${zone.Number}`, Log , function (err) {
        if (err) throw err;
        console.log('Updated! updateLog_Zone');
      });

}

//บันทึกข้อมูลผู้ใช้งาน เวลาในการจ่ายน้ำ
function writeLog(Data){
    fs.appendFile('./File/Behavior.csv'.Behavior(Data)+"\r\n",function (err) {
        if (err) throw err;
        console.log('Updated! writeLog');
      });
}


module.exports={
    writeLog,updateLog_Zone
}