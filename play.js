var water =0;
var Ir = 0;


function Open(){
    
    water+=2

}

function Close() {

    clearInterval(checkWater)
}


function Check(){
    if(water<Ir){
        Open();
        console.log(`water in open ${water}`);
    }
    else{
        Close();
        console.log(`water in close ${water}`);
    }
}


const checkWater = setInterval(Check,1000);

module.exports ={
    
}


    

