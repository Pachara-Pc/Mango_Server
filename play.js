
setInterval(()=>{
  let time = new Date()

  if(time.getSeconds() === 26){
    console.log(true);
    console.log(time.getSeconds());
  }else{
    console.log(false);
    console.log(time.getSeconds());
  }

},1000)