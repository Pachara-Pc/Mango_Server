
var Zone_1 = 0;
var Zone_2 = 0;


const openZone_1 = (x)=>{
    if(x == 1){
        Zone_1 = true;
    }
    else{
        Zone_1 = false;
    }
}

const openZone_2 = (x)=>{
    if(x == 1){
        Zone_2 = true;
    }
    else{
        Zone_2 = false;
    }
}

function getZone_1(){
    return Zone_1
}

function getZone_2(){
    return Zone_2
}

module.exports ={
    openZone_1,openZone_2,getZone_1,getZone_2
}