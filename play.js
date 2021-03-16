
let c = [];
let s  = 1;
function show(){
    let sum = 0;
   for(i=0;i<c.length;i++){
    sum+=parseFloat(c[i])
   }

   return sum +s
}

console.log(show());