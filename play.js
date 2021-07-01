

setInterval(() => {
    let day = new Date();

    console.log(`${day.getDate()}/${day.getMonth()+1}/${day.getUTCFullYear()}`);
}, 1000);