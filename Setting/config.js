const fs = require('fs');

var dayConfig = 0;
var pump = 0;
var Area = 0;
var pumpRate = 0;
var Hour = 0;
var Minute = 0
var Second = 0;


const setdayConfig = (set) => {
    dayConfig =  parseInt(set);
}

const setTotalPump = (set) => {
    pump = parseFloat(set);
}

const setArea = (set) => {
    Area = parseInt(set);
}

const setpumpRate = (set) => {
    pumpRate = parseFloat(set);
}


const setTime = (set) => {
    const Time = set.split(":");
    Hour = Time[0];
    Minute = Time[1];
    Second = Time[2];
}



function show_seting() {
    return (`
dayConfig = ${dayConfig}
pump = ${pump}
Area = ${Area}
pumpRate = ${pumpRate}
Time = ${Hour}:${Minute}:${Second}`);
}


module.exports = {
    dayConfig,
    pump,
    Area,  //ตารางเมตร
    pumpRate,  
    Hour,   
    Minute,
    Second,
    setTime,setpumpRate,setArea,setTotalPump,setdayConfig,show_seting

}