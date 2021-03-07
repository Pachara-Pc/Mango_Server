var names = ["Andrew", "Edward", "Paul", "Chris" ,"John"];

while( (i = names.shift()) !== undefined ) {
    console.log(i);
}
console.log(names);
// var IR = 15*4;
// var rate = 200;
// var Area = 400;

// let H = Math.floor(((IR*Area)/rate)/60)
// let M = Math.floor(((IR*Area)/rate)-(60*H))
// let S = 0;
// let day = new Date();
// let H = day.getHours() ;
// let M = day.getMinutes();
// let S = 0;
// var timeStart = []


// queueValve(4);


// setInterval(() => {
//   let Time = new Date();

//   if(start == 1){
//     console.log(`on Valve ${i}`);
  

//   if(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}` === `${timeStop[i-1]}`){
//     console.log(`off Valve ${i}`);
//     i++;
//   }

//   if(i === 5){
//     start = 0;
//   }
// }

//   console.log(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}`);
  
 
// }, 1000);

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