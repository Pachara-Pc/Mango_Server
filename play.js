let i =0
const finishJob = setInterval(() => {
    i++
    if(i == 5){
        console.log("finish");
        clearInterval(finishJob);
        i = 0;
    }


    console.log(i);
  }, 1000);