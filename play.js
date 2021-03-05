// var IR = 15*4;
// var rate = 200;
// var Area = 400;

// let H = Math.floor(((IR*Area)/rate)/60)
// let M = Math.floor(((IR*Area)/rate)-(60*H))
// let S = 0;

// console.log(H);
// console.log(M);
var countDownDate = 1702009600000
var time = 60 // = 30*60

var x = setInterval(()=> {
  if(time <=0 ){
    clearInterval(x,time=0)
  } 
  console.log(time);
  time -=1;
  
},1000)