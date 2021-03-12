var fs = require('fs');

function updatefile(Datalog) {
    console.log("Write File ");
    fs.appendFile('./Control/Datalog.csv', Datalog+"\r\n", function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
}

module.exports={
    updatefile
}