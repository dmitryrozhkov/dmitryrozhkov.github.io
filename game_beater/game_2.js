'use strict'


var wrap1 = document.getElementById ('wrap1');

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.style.background = "#FFF4C1";

var ballRadius = 10;//задаем радиус мяча
var x = canvas.width/2;// координата мяча по оси X
var y = canvas.height-30;// координата мяча по оси Y
var dx = randomDiap (-3,3);
var dy = randomDiap (-1,-2);
var paddleHeight = 20;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 2;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 45;
var brickOffsetTop = 30;
//var brickOffsetLeft = canvas.width/6;
var brickOffsetLeft = 25;



var score;
var lives;

var aaa = function () {
document.location.reload();
}  

function stopUp_1() {            
              clearInterval(timer); //останавливаем таймер             
        }     


function randomDiap (N,M) {
var a = Math.floor(Math.random()*(M-N+1))+N;
if (a ==0) {
a =2;
}
return a;
}


var bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        //bricks[c][r] = { x: 0, y: 0, status: 1 };
          bricks[c][r] = { x: 0, y: 0, status: 1, count:0 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {              
               
                    if ((x+ballRadius)>b.x && (x-ballRadius)<(b.x+ brickWidth) && (y-ballRadius)<(b.y+brickHeight)) {//определяем условия при которых мяч видит кирпич и отскакивает от него                   
                    dy = -dy;                  
                    b.count++;                 
                    b.status = 1;                          
                    score++;
                    clickAudio1.play();// звук выбивания фигуры               
                     }
                   
                    if (b.count==2&&(r-1)%2==0) {
                     b.status = 0;
                  } 
          
                       if (b.count==1&&!((r-1)%2==0)) {
                      b.status = 0;
                 }

                   if(score == 3*brickRowCount*brickColumnCount-8) {
                        clearInterval(timer);
                        startButton.style.display = 'inline-block';

                        function testLoadScript() {      
        $.ajax("https://dmitryrozhkov.github.io/game_beater/game_3.js",
            { type:'GET', dataType:'script', success:dataLoaded, error:errorHandler }
        );
    }

    function dataLoaded(data) {
        console.log('загруженные через AJAX данные:');
        console.log(data);       
    }

    function errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }

    testLoadScript();
                   
                }
            }
        }
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    //ctx.fillStyle = "#0095DD";
    ctx.fillStyle = "#FF0C6E";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    //ctx.fillStyle = "#0095DD";
    ctx.fillStyle = "#3C3EFF";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {              
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);                           
                ctx.fillStyle = "red";              
                if ((r-1)%2==0){
                ctx.fillStyle = "green";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);       
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
   
      if(x+ballRadius > canvas.width || x- ballRadius < 0) {
            dx = -dx;        
    }
   
       if(y - ballRadius< 0) {
        dy = -dy;        
    }

    
    if(x +  ballRadius> paddleX && x -  ballRadius < paddleX + paddleWidth && y + ballRadius > canvas.height-paddleHeight ){       
            dy = -dy;           
        }

  
       if(y+ballRadius > canvas.height) {       
            dy = -dy;
            lives--;           
      
        if(!lives) {            
                 stopUp_1();                       
                 setTimeout (aaa, 7000); 

var shiftLose = -700;		
var sliderLose = document.getElementById('sliderLose');
sliderLose.innerHTML='<h1>Игра закончена<h1><h1>Ваш результат: '+score+'</h1>';
var timerShiftLose = setInterval (moveLose,10);                
		function moveLose () {			
                        sliderLose.style.top = shiftLose +'px';			
			shiftLose= shiftLose + 5;
			if (shiftLose>0){			
			clearInterval (timerShiftLose);
                         startButton.style.display='none';  
                         stopButton.style.display='none';			
			}
		}

          }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }   


     
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;        
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;        
    }
    
    x += dx;
    y += dy;


}

//var clickAudio1=new Audio("button-16.mp3");




draw();
