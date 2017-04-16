var engine=engine(800,800,{
        canvasSelector:"#canvas-id",
        updateCallbackTime:30})

var context=engine.getContext();
var canvas=engine.getCanvas();

var mouse=mouse(canvas);
var checkPressed=CheckPressedProvider();

var seedsHolder1=new VSeedHolder(10);
var changedIndex=0;
var pressed=0;
var update = function(){
}

window.addEventListener("keyup",function(e){
    if(checkPressed(32)){
        changedIndex++;
    }
},true);
window.addEventListener("mouseup",function(e){
    /*
    seedsHolder1.seeds[changedIndex%seedsHolder1.seeds.length].x=mouse.x;
    seedsHolder1.seeds[changedIndex%seedsHolder1.seeds.length].y=mouse.y;
    engine.start();
    */
},false);

var draw = function(){
    context.clearRect(0,0,canvas.width,canvas.height);
    
    drawPixelsFrom(seedsHolder1)
    seedsHolder1.draw();
    
    context.strokeRect(0,0,canvas.width,canvas.height);
}

engine.setDraw(draw);
engine.setUpdate(update);
engine.start();