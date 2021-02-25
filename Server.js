const express = require("express")
const bodyParser = require("body-parser")
const app =express()
const router = express.Router();
const PORT = process.env.PORT || 8000
const Calculate = require("./Control/Calculate");
const e = require("express");
// Variable sensor from Arduino

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req,res) =>{
            res.send('hello server  ')
})

app.get("/sendData/:value",(req,res)=>{
        const allData = req.params.value;
        const dataArray = allData.split(",");

        Calculate.findMax_Min(parseInt(dataArray[0]))
        
        console.log(`Temp = ${ dataArray [0]} `);
        res.send(`Temp = ${req.params.value}`);
})


app.get("/ControlVavle",(req,res)=>{

        if(Calculate.getIrrigation()!== 0 && Calculate.getvalvestatus() === true){
                res.send(`On_valve : ${Calculate.getcountpump()  } status 1`)
        }
        

        if(Calculate.getIrrigation()<=0 && Calculate.getvalvestatus() !== true){
                res.send(`OFF_valve : ${Calculate.getcountpump()-1} status 0`)
        }
        


})

setInterval(()=>{ 
        const Time = new Date();

        
        if(Calculate.getIrrigation()!== 0 && Calculate.getvalvestatus() === true){
                console.log(`On_valve : ${Calculate.getcountpump()} status 1 IR: ${Calculate.getIrrigation()}`);

                Calculate.minusIrrigation()
        }

        if(Calculate.getIrrigation()<=0 && Calculate.getvalvestatus() === true){

                console.log(`OFF_valve : ${Calculate.getcountpump()} status 0 IR: ${Calculate.getIrrigation()}`);
                Calculate.setvalvestatus(false)
                Calculate.setIrrigation(0);
                Calculate.setSumrainInterval(0);
                Calculate.setdayCountinValve(Calculate.getcountpump())
                Calculate.pluscountpump(1);

                if(Calculate.getcountpump() === Calculate.getpump()){
                        Calculate.setcountpump(0)
                        Calculate.setcountday(0)
                        Calculate.setcount(0)
                        Calculate.setRound_status(true)
                }


        }

                if(Time.getSeconds() % 5 == 0){

                        if(Calculate.getRound_status() == false){
                                Calculate.Calculate_round_1()
                                console.log("Calculate.Calculate_round_1()");
                        }
                        else{
                                Calculate.Calculate_round_2()
                                console.log("Calculate.Calculate_round_2()");
                        }
                        
                        console.log(`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()} `);
                }

               
},1000)

app.listen(PORT,'0.0.0.0',()=>{
            console.log(`Server is running ${PORT}`);
})


