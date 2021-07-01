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

// บันทึกข้อมูลของแต่ละโซน  && เขียนไฟล์ Backup
function updateLog_Zone(zone){
    const date = new Date()
    const Time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()+543},${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`
    const Log = `${Time},${zone.Number},${zone.Max},${zone.Min},${zone.ET_Day},${zone.ET_sum},${zone.Rain_Day},${zone.Rain_sum},${zone.Ir}\r\n`
    

    /// Backup
    const Backup = {
        "currnet":parseInt(`${zone.currnet}`),
        "Zone": parseInt(`${zone.Number}`),
        "Max_Temp": parseFloat(`${zone.Max}`),
        "Min_Temp": parseFloat(`${zone.Min}`),
        "ET_Day" : parseFloat(`${zone.ET_Day}`),
        "ET_Sum" : parseFloat(`${zone.ET_sum}`),
        "Rain_Day" : parseFloat(`${zone.Rain_Day}`),
        "Rain_Sum" : parseFloat(`${zone.Rain_sum}`),
        "Irrigation" : parseFloat(`${zone.Ir}`)
    }
     
    const data = JSON.stringify(Backup);
    fs.writeFile(`./File/Backup_Zone_${zone.Number}.json`, data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    })

    /// Datalog
    console.log('updateLog_Zone');
    console.log(Log);
    fs.appendFile(`./File/Zone_${zone.Number}.csv`, Log , function (err) {
        if (err) throw err;
        console.log('Updated! updateLog_Zone');
      });

}



//บันทึกข้อมูลผู้ใช้งาน เวลาในการจ่ายน้ำ
function writeLog(Data,Zone){
    console.log('writeLog');
    console.log(Data);
    fs.appendFile('./File/Behavior.csv',Behavior(Data,Zone)+"\r\n",function (err) {
        if (err) throw err;
        console.log('Updated! writeLog');
      });
}


module.exports={
    writeLog,updateLog_Zone
}