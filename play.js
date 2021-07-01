// const fs = require('fs')

// const Behavior = (data) =>{
//     const date = new Date()
//     const Behavior = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()+543},${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())},${data}`
//     return  Behavior
// }

// function padZero(input){
//     return  input.toString().padStart(2,'0')
// }

// setInterval(() => {
//     const date = new Date()
//     console.log(`${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`);
//     fs.appendFile('./log.txt',Behavior(30)+"\r\n",function (err) {
    
//         if (err) throw err;
//         console.log('Updated!');
//       });
// // }, 1000);
const fs = require('fs');
const json = require("./user.json")
// create a JSON object
const user = {"current":1,
"Zone_1":{"max":20},
"Zone_2":{"max":20}

}

// convert JSON object to string
const data = JSON.stringify(user);

// write JSON string to a file
fs.writeFile('user.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
})



console.log( json);