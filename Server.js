const fs = require('fs');
const express = require("express")
const bodyParser = require("body-parser")
const app =express()
const router = express.Router();
const PORT = process.env.PORT || 8000
const Calculate = require("./Control/Calculate");
const {queueValve,getValveNumber,setStart,getPump,setPump,checkNotify} = require("./Control/Controlvalve")
const {show_seting,setdayConfig, setTotalPump,setpumpRate,setArea,setTime,getTimehour,getTimeminute,getTimesecond} = require("./Setting/config")
const {writeLog} = require("./File/Writefile")
var StatusServer = false;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));





try{
	        const data = fs.readFileSync('./Setting/Config.txt','utf8')

	                        let text = data.split(',');
	                        setdayConfig( parseInt(text[0]))
	                        setTotalPump(parseInt(text[1]))
	                        setpumpRate(parseInt(text[2]))
	                        setArea( parseInt(text[3]))
	                        setTime( text[4])
}catch(err){
	console.error(err);
}


app.get("/", (req,res) =>{
            res.send('hello server  ')
})

app.get("/sendData/:value",(req,res)=>{

        const allData = req.params.value;
        const dataArray = allData.split(",");
   
        Calculate.findMax_Min(parseInt(dataArray[0]))
        Calculate.updateRainday(parseFloat(dataArray[1]))
        console.log(`Temp = ${ dataArray} `);
        console.log(`Temp [0] = ${ dataArray[0]} `);
        res.send(`Updated`);

})

app.get("/CheckZone",(req,res)=>{
   
    res.send(`${Calculate.getZone()-1}`)
})

app.get("/CheckIrrigation/",(req,res)=>{

        res.send(`${Calculate.getZone_Irrigation(Calculate.getZone()-1)}`);
        
})


app.get("/Timeopenvalve",(req,res)=>{

        if(Calculate.getIrrigation != 0){
                res.send(Calculate.Timeopenvalve());
        }else{
                res.send(`0`);
        }
        
 })

app.get("/Setting/dayConfig=:dayConfig&Pump=:pump&pumpRate=:pRate&Area=:area&Time=:time",(req,res)=>{
 

        let setting = `${req.params.dayConfig},${req.params.pump},${req.params.pRate},${req.params.area},${req.params.time}`
        
        fs.writeFile('./Setting/Config.txt',setting,()=>{
               

                console.log("Write file update");
                
        });
       
        fs.readFile('./Setting/Config.txt', function(err, data) {
                // const A = data.toString().split(",")
              const value = data.toString().split(",");
                setdayConfig(value[0]);
                setTotalPump(value[1]);
                setpumpRate(value[2]);
                setArea(value[3])
                setTime(value[4])
              console.log("update ");
        res.send(`update Config file  ====>   ${show_seting()}`)
            });

     
})

app.get("/getTimeonValve/:Time",(req,res)=>{
        const  Minute =  req.params.Time;
        writeLog(Minute)
        queueValve(parseInt(Minute));
        setStart(1);
        setPump(1);
        
        console.log(Minute);
        res.send("")
        
 })

 app.get("/:test&:test1",(req,res)=>{
        const  Minute =  req.params.test;
        const  Minute1 =  req.params.test1;
       // if(Minute<4){}
       
        res.send(`${Minute}`)
        
 })

app.get("/ChangeModeControl",(req,res)=>{

 })


app.get("/checkNotify",(req,res)=>{
        
        res.send(`${checkNotify()}`);
})

app.get("/PumpControl",(req,res)=>{
        res.send(`${getPump()}`);

})


app.get("/ValveControl_1/",(req,res)=>{

        
        res.send(`${getValveNumber(0)}`)
 })


app.get("/ValveControl_2",(req,res)=>{

        res.send(`${getValveNumber(1)}`)
 })


app.get("/ValveControl_3",(req,res)=>{

        res.send(`${getValveNumber(2)}`)
 })

app.get("/ValveControl_4",(req,res)=>{

        res.send(`${getValveNumber(3)}`)
 })

app.get("/showRain",(req,res)=>{
        res.send(`${Calculate.getZone_Rain_Sum(Calculate.getZone()-1)}`)
})


app.get("/getRealtime",(req,res)=>{
        const  Time = new Date()
        res.send(`${Time.getHours()>=10?`${Time.getHours()}`:"0"+Time.getHours()}:${Time.getMinutes()>=10?Time.getMinutes():"0"+Time.getMinutes()}:${Time.getSeconds()>=10?Time.getSeconds():"0"+Time.getSeconds()}`)
       // console.log(`${Time.getHours()>10?Time.getHours():"0"+Time.getHours()}:${Time.getMinutes()>10?Time.getMinutes():"0"+Time.getMinutes()}:${Time.getSeconds()>10?Time.getSeconds():"0"+Time.getSeconds()}`);
 })

 app.get("/getRealdate",(req,res)=>{
        const  date = new Date()
        res.send(`${date.getDate()>=10?date.getDate():`0${date.getDate()}`}/${date.getMonth()+1>=10?date.getMonth():`0${date.getMonth()+1}`}/${date.getFullYear()+543} `);
       // console.log(`${Time.getHours()>10?Time.getHours():"0"+Time.getHours()}:${Time.getMinutes()>10?Time.getMinutes():"0"+Time.getMinutes()}:${Time.getSeconds()>10?Time.getSeconds():"0"+Time.getSeconds()}`);
 })



app.get("/ShowdueDate",(req,res)=>{

        if(Calculate.getCheckDayonValue() === "watered"){
                res.send("Watered")
        }else if(Calculate.getCheckDayonValue() === "not waterd"){
                res.send("Not waterd")
        }else{
                res.send("Watering")
        }
       
               
        // res.send(Calculate.getdueDate())
})

app.get("/ControlServer=:status",(req,res)=>{
        const  status =  req.params.status;
        console.log(status);
        if(status === "ON"){
                StatusServer = true
                res.send(`Server ON`)
        }else if (status === "OFF"){
                StatusServer = false
                res.send(`Server OFF`)
              
        }else{
                res.send(`Show Server Status = ${StatusServer?"ON":"OFF"}`)
        }
        
})

app.get("/Showsetting",(req,res)=>{
	res.send(`update Config file  ====>   ${show_seting()}`)
})

setInterval(()=>{ 
        const Time = new Date();

                //  if(Time.getSeconds()=== 0){
                if(Time.getHours() === getTimehour() && Time.getMinutes() === getTimeminute() && Time.getSeconds()  === getTimesecond()  ){

                     
                          Calculate.Calculate_round_1()
                   
                        console.log("Check");
                       // console.log(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()} `);
                }

                console.log(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()} `);
},1000)



app.get('/Send/dataSensor',(req,res)=>{
	  
	console.log(req.query);

	    res.send("finish");

})


app.listen(PORT,'0.0.0.0',()=>{
            console.log(`Server is running ${PORT}`);
})

