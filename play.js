const fs = require('fs')

const Behavior = (data) =>{
    const date = new Date()
    const Behavior = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()+543},${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())},${data}`
    return  Behavior
}

function padZero(input){
    return  input.toString().padStart(2,'0')
}

setInterval(() => {
    const date = new Date()
    console.log(`${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`);
    fs.appendFile('./log.txt',Behavior(30)+"\r\n",function (err) {
    
        if (err) throw err;
        console.log('Updated!');
      });
}, 1000);
