const express = require("express")
const bodyParser = require("body-parser")
const app =express()
const router = express.Router();
const PORT = process.env.PORT || 8000
const {findMax,findMin,CheckTemp,etInterval_Push,showETinterval,rainUpdate,showIrrigation} = require('./Control/Calculate')
const {checkWater,checkStatus,checkvalveNumber,openValve,closeValve} = require("./Control/Controlvalve");
let count = 0 ;

// Variable sensor from Arduino


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req,res) =>{
            res.send('hello server  ')
})

app.get("/sendData/:value",(req,res)=>{
        const allData = req.params.value;
        const dataArray = allData.split(",");
        
        findMax(parseInt(dataArray[0]))         /// [0] Temperature
        findMin(parseInt(dataArray[0]))         /// [0] Temperature
        rainUpdate(parseFloat(dataArray[1]))    /// [1] Rain

        console.log(`Temp = ${ dataArray} `);
        res.send(`Temp = ${req.params.value}`);
})

app.get("/Openvalue",(req,res)=>{

        if(showIrrigation()>checkWater()){
                openValve();
                console.log(`IN OPEN => IR = ${showIrrigation()} Water = ${checkWater()} Status = ${checkStatus()}, valveNumber =${checkvalveNumber()}`);
                res.send(`IN OPEN => IR = ${showIrrigation()} Water = ${checkWater()} Status = ${checkStatus()}, valveNumber =${checkvalveNumber()}`);
        }
        else if(showIrrigation()<checkWater()){
                closeValve()
                console.log(`IN OPEN => IR = ${showIrrigation()} Water = ${checkWater()} Status = ${checkStatus()}, valveNumber =${checkvalveNumber()}`);
                res.send(`IN CLOSE => IR = ${showIrrigation()} Water = ${checkWater()} Status = ${checkStatus()}, valveNumber =${checkvalveNumber()-1}`);
        }
        else{
                console.log(`IN OPEN => IR = ${showIrrigation()} Water = ${checkWater()} Status = ${checkStatus()}, valveNumber =${checkvalveNumber()}`);
                res.send(`IN NOTING => IR = ${showIrrigation()} Water = ${checkWater()} Status = ${checkStatus()}, valveNumber =${checkvalveNumber()}`);

        }
        
})

app.get("/Check",(req,res)=>{
        //console.log(showETinterval()); 
        //console.log(`MaxTemp = ${maxTemp} MinTemp =${minTemp}`);
        res.send(CheckTemp());
})


setInterval(()=>{  

        console.log("PUSH ! "); etInterval_Push(); 
        console.log(`ET = ${showETinterval()}`); 
        console.log(`IR =   ${showIrrigation()}`);

},5000);



app.get("/sendSum/",(req,res)=>{
        if(count % 3 === 0){
                console.log(`count = ${count}`);
                res.send(`1,3`);
        }
        else if(count %10 === 0){
                res.send(`0,3`);
        }
        else{   res.send(`0`);
                console.log("count mod not equal 3");}
})

app.listen(PORT,'0.0.0.0',()=>{
            console.log(`Server is running ${PORT}`);
})


