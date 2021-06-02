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
    pump = parseInt(set);
}

const setArea = (set) => {
    Area = parseInt(set);
}

const setpumpRate = (set) => {
    pumpRate = parseInt(set);
}


const setTime = (set) => {
    const Time = set.split(":");
    Hour = parseInt(Time[0]);
    Minute = parseInt(Time[1]);
    Second = parseInt(Time[2]);
}



function show_seting() {
  
    return (`
dayConfig = ${dayConfig}
pump = ${pump}
Area = ${Area}
pumpRate = ${pumpRate}
Time = ${Hour}:${Minute}:${Second}`);
}

function getdayConfig (){
    return dayConfig
}

function getArea (){
    return Area
}

function getTotalpump(){
    return pump
}

function getpumpRate (){
    return pumpRate
}

function getTimehour(){
    return Hour
}

function getTimeninute(){
    return Minute
}

function getTimesecond(){
    return Second
}

module.exports = {
    getdayConfig,getTotalpump,getArea,getpumpRate,  
    getTimehour,getTimeninute,getTimesecond,setTime,
    setpumpRate,setArea,setTotalPump,setdayConfig,show_seting

}
