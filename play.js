var IR = 5;
var Area = 100;
var Pumprate = 203;
var Time = ((IR*Area)/Pumprate)
var status = false;
// 1H 15M 0S
function openV(i){
    status =true;
    console.log(`valve ${i} = ${status?1:0}`);
    setTimeout(()=>{
        status = false
        console.log(`valve ${i} = ${status?1:0}`);
        
    },3000)
}
openV(1)
   // console.log(timeConvert(Time));