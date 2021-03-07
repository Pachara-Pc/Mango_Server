// var IR = 15*4;
// var rate = 200;
// var Area = 400;

// let H = Math.floor(((IR*Area)/rate)/60)
// let M = Math.floor(((IR*Area)/rate)-(60*H))
// let S = 0;

let Time = new Date();
var minute = 30
var time = 60 // = 30*60
let H = Time.getHours() ;
let M = Time.getMinutes();
let S = 0;

for(let i =1;i<=4;){

console.log(`valve ${i} : ${H}:${M}`);
  M+=60/4

while(M>=59){
if(M >= 60){
  M-=60;
  H+=1;
}
//console.log("in while");
}

console.log(`valve ${i} : ${H}:${M}`);
i++;
  
}

// console.log(`valve ${i} : ${H}:${M}`);
//   M+=60/4

// while(M>=59){
// if(M >= 60){
//   M-=60;
//   H+=1;
// }
// }

// console.log(`valve ${i} : ${H}:${M}`);
// i++;

// console.log(`valve ${i} : ${H}:${M}`);
//   M+=60/4

// while(M>=59){
// if(M >= 60){
//   M-=60;
//   H+=1;
// }
// }

// console.log(`valve ${i} : ${H}:${M}`);
// i++;

// console.log(`valve ${i} : ${H}:${M}`);
//   M+=60/4

// while(M>=59){
// if(M >= 60){
//   M-=60;
//   H+=1;
// }
// }

// console.log(`valve ${i} : ${H}:${M}`);
// i++;
// var x = setInterval(()=> {
//   let Time= new Date();
  
//   if(Time.getHours() === H && Time.getMinutes() === M && Time.getSeconds() === S){

//     console.log(`Time Finish ${Time.getHours()}:${Time.getMinutes()}`);
//     clearInterval(x)
//   }
//   console.log(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}`);

// },1000)