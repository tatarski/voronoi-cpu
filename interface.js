document.getElementById("pixel-size-input").addEventListener("mouseup",function(e){
    PIXEL_WIDTH=parseInt(this.value);
    document.getElementById("pixel-size-counter").innerHTML=parseInt(this.value);
    engine.start();
});

document.getElementById("random-button").addEventListener("mouseup",function(e){
    seedsHolder1=new VSeedHolder(parseInt(document.getElementById("seeds-counter").innerHTML));
    engine.start();
});

document.getElementById("seeds-number").addEventListener("mouseup",function(e){
    seedsHolder1=new VSeedHolder(parseInt(this.value));
    console.log(this.value)
    document.getElementById("seeds-counter").innerHTML=parseInt(this.value);

    engine.start();
});

function onDistChoose(){
    if(document.getElementById("eu-dist").checked){
        DISTANCE_FUNCTION=euclideanDistance;
    }else{
        DISTANCE_FUNCTION=manhattanDistance;
    }
    engine.start();
}
document.getElementById("dist-choose").addEventListener("mouseup",function(e){
    setTimeout(onDistChoose,100);
},true)