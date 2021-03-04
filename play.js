// var IR = 15*4;
// var rate = 200;
// var Area = 400;

// let H = Math.floor(((IR*Area)/rate)/60)
// let M = Math.floor(((IR*Area)/rate)-(60*H))


// console.log(H);
// console.log(M);
function calculateDate(inputDay){
  let due = new Date()
let D = due.getDay(), M = due.getMonth()+1, Y = due.getFullYear();
  if (M == 1 || M == 3 || M == 5 || M == 7 || M == 8 || M == 10 || M == 12) {

    D = inputDay + D;
    if (D > 31) {
      D -= 31;

      M++;
    }
  }
  else if (M == 2) {
    if ((Y % 4 == 0 && Y % 100 != 0) || (Y % 400 == 0))
    {
      D = inputDay + D;
      if (D > 29) {
        D -= 29;

        M++;
      }
    }

    else
    {
      D = inputDay + D;
      if (D > 28) {
        D -= 28;

        M++;
      }
    }
  }


  else {
    D = inputDay + D;
    if (D > 30) {
      D -= 30;

      M++;
    }
  }
  return (`${D}/${M}/${Y}`)
}
console.log(calculateDate(1));