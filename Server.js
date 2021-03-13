const express = require("express")
const bodyParser = require("body-parser")
const app =express()
const router = express.Router();
const PORT = process.env.PORT || 8000
const Calculate = require("./Control/Calculate");
const {queueValve,getValveNumber,setStart,getPump,setPump} = require("./Control/Controlvalve")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req,res) =>{
            res.send('hello server  ')
})



app.get("/resetIrrigation/",(req,res)=>{

    Calculate.setdayCountinValve(Calculate.getcountpump());
    Calculate.pluscountpump(1);
    Calculate.setIrrigation(0)

    if(Calculate.getcountpump() == Calculate.getpump()){

        Calculate.setcountpump(0);
        Calculate.setcountday(0);
        Calculate.setcount(0);
        Calculate.setRound_status(true);
        Calculate.setdueDate("");
        console.log(`Clear Round `);
    }
  
    console.log(`reseted  Irrigation  = 0`);
    res.send(`reseted  Irrigation  = 0`);
})

app.get("/sendData/:value",(req,res)=>{

        const allData = req.params.value;
        const dataArray = allData.split(",");
        if(Calculate.getIrrigation() <= 0){
   
        Calculate.findMax_Min(parseInt(dataArray[0]))
        Calculate.updateRainday(parseFloat(dataArray[1]))
        console.log(`Temp = ${ dataArray} `);
        console.log(`Temp [0] = ${ dataArray[0]} `);
        res.send(`Updated`);             
}else{
        console.log(`Wait Watering Data = ${ dataArray} `);
        res.send(`Wait Watering`); 
}
})

app.get("/CheckZone",(req,res)=>{
   
    res.send(`${Calculate.getcountpump()}`)
})

app.get("/CheckIrrigation/",(req,res)=>{

        res.send(`${Calculate.getIrrigation()}`);
})

 app.get("/Timeopenvalve",(req,res)=>{

        if(Calculate.getIrrigation != 0){
                res.send(Calculate.Timeopenvalve());
        }else{
                res.send(`0`);
        }
        
 })

 app.get("/getTimeonValve/:Time",(req,res)=>{
        const  Minute =  req.params.Time;
        queueValve(parseInt(Minute));
        setStart(1);
        setPump();
        console.log(Minute);
        res.send("")
        
 })


app.get("/setStart",(req,res)=>{
        
        res.send(`0`);
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


app.get("/getRealtime",(req,res)=>{
        const  Time = new Date()
        
        res.send(`${Time.getHours()>10?Time.getHours():"0"+Time.getHours()}:${Time.getMinutes()>10?Time.getMinutes():"0"+Time.getMinutes()}:${Time.getSeconds()>10?Time.getSeconds():"0"+Time.getSeconds()}`)
        console.log(`${Time.getHours()>10?Time.getHours():"0"+Time.getHours()}:${Time.getMinutes()>10?Time.getMinutes():"0"+Time.getMinutes()}:${Time.getSeconds()>10?Time.getSeconds():"0"+Time.getSeconds()}`);

 })





app.get("/ShowdueDate",(req,res)=>{
        
        res.send(Calculate.getdueDate())
})

setInterval(()=>{ 
        const Time = new Date();
                if(Time.getMinutes() % 1 === 0 && Time.getSeconds() === 0 && Calculate.getIrrigation() === 0){

                        if(Calculate.getRound_status() == false){
                                Calculate.Calculate_round_1()
                                console.log("Calculate.Calculate_round_1()");
                        }
                        else{
                                Calculate.Calculate_round_2()
                                console.log("Calculate.Calculate_round_2()");
                        }
                        
                       // console.log(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()} `);
                }

               console.log(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()} `);
},1000)

app.listen(PORT,'0.0.0.0',()=>{
            console.log(`Server is running ${PORT}`);
})

