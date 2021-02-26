var Ir = 10;
var Zone =1;
var pump = 1;
var count = 0;
var Ir_new = 0;
var P_rate = 2;
var status = 0;
var send = true
var pumpStaus = false

setInterval(()=>{
    if(send == true &&   Ir != 0 ){

        if(pump == 1 && pumpStaus == false){
            OnZone();
        }else if(pump == 2 && pumpStaus == false){
            OnZone();
        }else if(pump == 3 && pumpStaus == false){
            OnZone();
        }else if(pump == 4 && pumpStaus == false){
            OnZone();
        }
        else{
            console.log("system run");
        }
        
    
    }else{
    
    }
},1000)



function OnZone() {
    pumpStaus = true
    Ir_new =Ir
    const Run = setInterval(()=>{
        status = 1
        Ir_new-=P_rate


        if(Ir_new==0){
            status = 0
            
            console.log(`Close pump = ${pump} Status = ${status} Ir_new = ${Ir_new} `);
            pumpStaus = false
            if(pump == 4){
                pump = 0;
                Ir=0;
            }
          
            pump+=1;
            
            clearInterval(Run)
        }

        console.log(`On pump = ${pump} Status = ${status} Ir_new = ${Ir_new} `);
        
        
    },500)
    
}



