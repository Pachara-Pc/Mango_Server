const {setIrrigation} = require("./Calculate")
var Status = 0;
var valveNumber =0;
var Water = 0;
var pumpRate =0;
var totalPump = 2;



function openValve(){
    Water+=2;
    Status=1;
}


function closeValve(){

    if(valveNumber == totalPump){
        valveNumber = 0;
    }

    setIrrigation(0);
    Status=0;
    
    Water = 0;
    valveNumber++;
}

function checkWater(){
    return Water
}

function checkStatus(){
    return Status
}

function checkvalveNumber(){
    return valveNumber
}
module.exports ={
    checkWater,checkStatus,checkvalveNumber,openValve,closeValve
}