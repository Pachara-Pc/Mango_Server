var date = new Date();

console.log(`${date.getDate()>10?date.getDate():`0${date.getDate()}`}/${date.getMonth()+1>10?date.getMonth():`0${date.getMonth()}`}/${date.getFullYear()+543}`);