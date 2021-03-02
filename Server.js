const express = require("express")
const bodyParser = require("body-parser")
const app =express()
const router = express.Router();
const PORT = process.env.PORT || 8000
const Calculate = require("./Control/Calculate");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req,res) =>{
            res.send('hello server  ')
})

app.get("/OnMaster", (req,res) =>{
    console.log("Master On ");
    if( Calculate.getIrrigation() != 0 && (Controlpump.getZone_1() || Controlpump.getZone_2() === true)){
        console.log(`Master  ON  IR = ${Calculate.getIrrigation()}`);
        res.send('1');   //// O = on
    }else{
        res.send('0');   //// C = close
        console.log(`Master  OFF  IR = ${Calculate.getIrrigation()}`);
    }
    
})

app.get("/sendData/:value",(req,res)=>{

        const allData = req.params.value;
        const dataArray = allData.split(",");

        Calculate.findMax_Min(parseInt(dataArray[0]))
        console.log(`Temp = ${ dataArray} `);
        res.send(`Updated`);
})

app.get("/CheckIrrigation/",(req,res)=>{

        res.send(`${Calculate.getIrrigation()}`);
})

 
    


setInterval(()=>{ 
        const Time = new Date();
        
                if(Time.getSeconds() % 30 == 0 && Calculate.getIrrigation() === 0){

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

