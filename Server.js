const express = require("express")
const bodyParser = require("body-parser")
const app =express()
const router = express.Router();
const PORT = process.env.PORT || 8000
const Calculate = require("./Control/Calculate");
var checkClose =false;
var AA = true;
// Variable sensor from Arduino

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req,res) =>{
            res.send('hello server  ')
})

app.get("/OnMaster", (req,res) =>{
    console.log("Master On ");
    if(Calculate.getIrrigation() != 0 ){
        res.send('O1');   //// O = on
    }else{
        res.send('C0');   //// C = close
    }
    
})

app.get("/sendData/:value",(req,res)=>{

        const allData = req.params.value;
        const dataArray = allData.split(",");

        Calculate.findMax_Min(parseInt(dataArray[0]))
        
        console.log(`Temp = ${ dataArray} `);
        res.send(`Temp = ${req.params.value}`);
})


app.get("/ControlVavle/",(req,res)=>{

        if(Calculate.getIrrigation()!== 0 && Calculate.getvalvestatus() === true){
                rememValve = Calculate.getcountpump()+1;
                res.send(`${rememValve},1`);
                checkClose = true;
                        }

        else if((Calculate.getIrrigation()<0 && Calculate.getvalvestatus() !== true) || (checkClose == true) ){

                                res.send(`${rememValve},0`);

                                checkClose = false ;
        //                      reset = true
                        }
        else {
                res.send(`nothing`)
                        }





})

setInterval(()=>{ 
        const Time = new Date();
        
        
        // if(Calculate.getIrrigation()!== 0 && Calculate.getvalvestatus() === true){
               

        //         console.log(`On_valve : ${Calculate.getcountpump()} status 1 IR: ${Calculate.getIrrigation()}`);

        //         //Calculate.minusIrrigation()
        // }

        // if(Calculate.getIrrigation()<=0 && Calculate.getvalvestatus() === true){

        //         console.log(`OFF_valve : ${Calculate.getcountpump()} status 0 IR: ${Calculate.getIrrigation()}`);
        //         Calculate.setvalvestatus(false)
        //         Calculate.setIrrigation(0);
        //         Calculate.setSumrainInterval(0);
        //         Calculate.setdayCountinValve(Calculate.getcountpump())
        //         Calculate.pluscountpump(1);

        //         if(Calculate.getcountpump() === Calculate.getpump()){
        //                 Calculate.setcountpump(0)
        //                 Calculate.setcountday(0)
        //                 Calculate.setcount(0)
        //                 Calculate.setRound_status(true)
        //         }
        

        // }

        if( Calculate.getIrrigation() != 0 ){

                        if(Calculate.getcountpump() == 1 && Calculate.getvalvestatus() == true){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 2 && Calculate.getvalvestatus()  == true){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 3 && Calculate.getvalvestatus()  == true){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 4 && Calculate.getvalvestatus()  == true){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 5 && Calculate.getvalvestatus() == true){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 6 && Calculate.getvalvestatus()  == true){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 7 && Calculate.getvalvestatus()  == true){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 8 && Calculate.getvalvestatus()  == true){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);
                }
                else{
                    console.log("system run");
                }
                
            
            }else{

                console.log("system run");

            }


                if(Time.getSeconds() % 30 == 0 && Calculate.getIrrigation() == 0){

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


function OnZone(Area,pumpRate) {
        
        let Ir_new = Calculate.getIrrigation()
        console.log(`IR_NEW = ${Ir_new}`);
        Calculate.setvalvestatus(false)

        const Run = setInterval(()=>{
            
            Ir_new-=Calculate.getpumpRate();
    
    
            if(Ir_new<=0){

                Calculate.setvalvestatus(true)
                console.log(`Close pump = ${Calculate.getcountpump()} Status = ${Calculate.getvalvestatus()} Zone = ${Calculate.getZone()} Ir_new = ${Ir_new} `);
                console.log(`countpump  = ${Calculate.getcountpump()}`);

               
                
                if(Calculate.getZone() === 1 && Calculate.getcountpump() === 4){
                        console.log(`setdayCountinValve  Zone 1 = ${Calculate.getZone()-1}`);
                        Calculate.setdayCountinValve(Calculate.getZone()-1)
                        Calculate.setIrrigation(0)
                        

                        if(Calculate.getpump() == 1){
                            Calculate.setRound_status(true);
                            Calculate.setcountpump(0);  
                            Calculate.setcountday(0);
                            Calculate.setcount(0);
                            Calculate.setZone(1);
                        }else{
                            
                            Calculate.setZone(2)
                        }
                        
                                           
                }


                if(Calculate.getZone() === 2 && Calculate.getcountpump() === 8 ){
                        console.log(`setdayCountinValve Zone 2 = ${Calculate.getZone()-1}`);
                        Calculate.setdayCountinValve(Calculate.getZone()-1)
                        Calculate.setIrrigation(0);
                        Calculate.setcountpump(0);
                        Calculate.setZone(1);
                        Calculate.setcount(0);
                        Calculate.setcountday(0)
                        Calculate.setRound_status(true);
                        
                }

                Calculate.pluscountpump(1);
                
                
                clearInterval(Run)
            }
    

            console.log(`On pump = ${Calculate.getcountpump()} Status = ${Calculate.getvalvestatus()} Zone = ${Calculate.getZone()} Ir_new = ${Ir_new} `);
            
            
        },500)
        
    }
