const express = require("express")
const bodyParser = require("body-parser")
const app =express()
const router = express.Router();
const PORT = process.env.PORT || 8000
const Calculate = require("./Control/Calculate");
const Controlpump = require("./Control/Controlpump");
var checkClose =false;
// Variable sensor from Arduino
var confirmRequest = false;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req,res) =>{
            res.send('hello server  ')
})

app.get("/OnMaster", (req,res) =>{
    console.log("Master On ");
    if( Calculate.getIrrigation() != 0 && (Controlpump.getZone_1() || Controlpump.getZone_2() === true)){
        res.send('O1');   //// O = on
    }else{
        res.send('C0');   //// C = close
    }
    
})

app.get("/sendData/:value",(req,res)=>{

        const allData = req.params.value;
        const dataArray = allData.split(",");

        Calculate.findMax_Min(parseInt(dataArray[0]))
        Controlpump.openZone_1(dataArray[2]);
        Controlpump.openZone_2(dataArray[3]);
        console.log(`Temp = ${ dataArray} `);
        res.send(`Temp = ${req.params.value}`);
})


app.get("/ControlValve/:value",(req,res)=>{
        const Value = req.params.value;
        const status = Value.split(",");
        console.log(`ControlValve = ${status}`);
       if(confirmRequest == true ){
           
           console.log(`${Calculate.getcountpump()},1  Zone = ${Calculate.getZone()} request form Esp` );
           res.send(`${Calculate.getcountpump()},1`)

       }
       else if (Calculate.getZone() == 2){
        res.send(`${Calculate.getcountpump()},0`)
       }
        else{
       

            console.log(`${Calculate.getcountpump()},0 Zone = ${Calculate.getZone()} request form Esp` );
        res.send(`${Calculate.getcountpump()},0`)
       }
        

})

setInterval(()=>{ 
        const Time = new Date();
        
        // ขอ request เปิดน้ำ โดยเช็คค่าจาก  App
        if( Calculate.getIrrigation() != 0 && (Controlpump.getZone_1() || Controlpump.getZone_2() === true) ){


                if(Calculate.getcountpump() == 1 && Calculate.getvalvestatus() == false  ){ 

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);
                    

                }else   if(Calculate.getcountpump() == 2 && Calculate.getvalvestatus()  == false   ){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 3 && Calculate.getvalvestatus()  == false   ){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 4 && Calculate.getvalvestatus()  == false   ){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 5 && Calculate.getvalvestatus()  == false   ){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 6 && Calculate.getvalvestatus()  == false  ){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 7 && Calculate.getvalvestatus()  == false  ){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);

                }else   if(Calculate.getcountpump() == 8 && Calculate.getvalvestatus()  == false  ){

                    OnZone(Calculate.getArea(),Calculate.getpumpRate);
                }
                else{
                    console.log("system run");
                }
                
            
            }else{

                console.log("system run");

            }


                if(Time.getSeconds() % 50 == 0 && Calculate.getIrrigation() === 0){

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
        Calculate.setvalvestatus(true)
        confirmRequest = true
       
        const Run = setInterval(()=>{
            
            Ir_new-=Calculate.getpumpRate();
           
    
            if(Ir_new<=0 && confirmRequest == true){
                confirmRequest = false
                setTimeout(()=>{
                    
                    Calculate.setvalvestatus(false)  
                     Calculate.pluscountpump(1);
                
                     confirmRequest =true;  

                     
                    clearInterval(Run) },3000)

                
                
                console.log(`Close pump = ${Calculate.getcountpump()} Status = ${Calculate.getvalvestatus()} Zone = ${Calculate.getZone()} Ir_new = ${Ir_new} `);
                console.log(`countpump  = ${Calculate.getcountpump()}`);

               
                
                if(Calculate.getZone() === 1 && Calculate.getcountpump() === 4){
                        
                        console.log(`setdayCountinValve  Zone 1 = ${Calculate.getZone()-1}`);
                        Calculate.setdayCountinValve(Calculate.getZone()-1)
                        Calculate.setIrrigation(0)
                        

                        if(Calculate.getpump() == 1){
                            Calculate.setRound_status(true);
                            Calculate.setcountpump(1);  
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
                        Calculate.setcountpump(1);
                        Calculate.setZone(1);
                        Calculate.setcount(0);
                        Calculate.setcountday(0)
                        Calculate.setRound_status(true);
                        
                }

               
            }
    

            console.log(`On pump = ${Calculate.getcountpump()} Status = ${Calculate.getvalvestatus()} Zone = ${Calculate.getZone()} Ir_new = ${Ir_new} `);
            
            
        },1000)
        
    }
