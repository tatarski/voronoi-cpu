function euclideanDistance(v1,v2){
        var deltaX=v1.x-v2.x;
        var deltaY=v1.y-v2.y;
        
        return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
}
function manhattanDistance(v1,v2){
        var deltaX=v1.x-v2.x;
        var deltaY=v1.y-v2.y;
        
        return Math.abs(deltaX) + Math.abs(deltaY);
}
var DISTANCE_FUNCTION=manhattanDistance;

class Vector{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    
    draw(){
        context.beginPath();
        context.arc(this.x,this.y,Vector.DRAW_RADIUS,0,2*Math.PI);
        context.stroke();
    }
    
    distTo(vector2){
        return DISTANCE_FUNCTION(this,vector2);
    }
    
    static random(){
        return new Vector(
            Math.random()*Vector.MAX_X,
            Math.random()*Vector.MAX_Y
        );
    }
}
Vector.MAX_X=800;
Vector.MAX_Y=800;
Vector.DRAW_RADIUS=10;

class VSeed extends Vector{
    constructor(x,y,weight,color){
        super(x,y);
        
        this.weight=weight;
        this.color=color;
    }
    
    draw(){
        super.draw();
        context.fillStyle=this.color;
        context.fill();
        context.stroke();
    }
    
    static random(){
        var randomColor="rgb("+Math.floor(Math.random()*255)+
            ","+Math.floor(Math.random()*255)+
            ","+Math.floor(Math.random()*255)+")";
        
        return new VSeed(
            Math.random()*Vector.MAX_X,
            Math.random()*Vector.MAX_Y,
            1,
            randomColor
        );
    }
}

class VSeedHolder{
    constructor(n){
        this.seeds=[];
        for(var i=0;i<n;i++){
            this.seeds.push(VSeed.random());
        }
    }
    
    draw(){
        for(var el of this.seeds){
            el.draw();
        }
    }
    
    calcAreaOfPoint(p){
        var minDist=999999;
        var minIndex=-1;
        for(var i=0;i<this.seeds.length;i++){
            
            var dist=p.distTo(this.seeds[i])*this.seeds[i].weight;
            
            if(dist<minDist){
                minDist=dist;
                minIndex=i;
            }
        }
        return minIndex;
    }
}

var PIXEL_WIDTH=5;

function drawPixelsFrom(seedsHolder){
    for(var i=0;i<Vector.MAX_X;i+=PIXEL_WIDTH){
        for(var j=0;j<Vector.MAX_Y;j+=PIXEL_WIDTH){
            var p=new Vector(i,j);
            var index=seedsHolder.calcAreaOfPoint(p);
            context.fillStyle=seedsHolder.seeds[index].color;
            context.fillRect(i,j,PIXEL_WIDTH,PIXEL_WIDTH);
        }
    }
}