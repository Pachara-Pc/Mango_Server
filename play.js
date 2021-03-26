
var fs = require('fs');

  fs.readFile('./Setting/test.txt', function(err, data) {
      const A = data.toString().split(",")
    console.log(A);
  });
