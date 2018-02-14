'use strict'
//window.onload = function () {





var wrap1 = document.getElementById ('wrap1');

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.style.background = "#D8FFA9";

var ballRadius = 10;//задаем радиус мяча
var x = canvas.width/2;// координата мяча по оси X
var y = canvas.height-30;// координата мяча по оси Y
//var dx = 1;
//var dy = -1;
var dx = randomDiap (-3,3);
var dy = randomDiap (-1,-2);
var paddleHeight = 20;
var paddleWidth = 90;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
//var brickColumnCount = 3;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 40;
var brickOffsetTop = 30;
//var brickOffsetLeft = canvas.width/6;
var brickOffsetLeft = 30;


//var score = 0;
var score;
//var lives = 3;
var lives;

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
                      if ((x+ballRadius)>b.x && (x-ballRadius)<(b.x+ brickWidth) && (y-ballRadius)<(b.y+brickHeight)) { //определяем условия при которых мяч видит кирпич и отскакпвает от него
                    dy = -dy;                
                    b.status = 1;
                     b.count++; 
                    score++;
                    clickAudio1.play();// звук выбивания фигуры
                    }
                    if (b.count==2&&r%2==0) {
                     b.status = 0;
                  }
                    if (b.count==1&&!(r%2)==0) {
                     b.status = 0;
                  }

                 
                     if(score == 31+brickRowCount*brickColumnCount) {                     
                        clickAudio2.play();// звук песня мы -чемпионы
                        writeRecord (nameRecord, score);                        
                        setTimeout (aaa, 15000);
                        clearInterval(timer);                       
                        startButton.style.display = 'none';
                        stopButton.style.display = 'none';
                        

                        function testLoadScript() {      
        $.ajax("http://fe.it-academy.by/Sites/0025251/game_1.js",
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


var shift = -700;		
var slider = document.getElementById('slider');
slider.innerHTML='<h1>Поздравляем, '+ nameRecord+'!</h1><h1>Ваш результат: '+score+'</h1>';
var timerShift = setInterval (move,10);                
		function move () {			
                        slider.style.top = shift +'px';			
			shift= shift + 5;
			if (shift>0){			
			clearInterval (timerShift);			
                        //document.location.reload();//перезагрузить текущую страницу      
			}
		}
                  
                }
            }
        }
    }
}


var aaa = function () {
document.location.reload();
}


function stopUp_2() {            
              clearInterval(timer); //останавливаем таймер              
        }


var writeRecord = function (nameOne, res) { 

// получает сообщения с сервера, добавляет новое,
// показывает и сохраняет на сервере
function sendMessage() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'LOCKGET', n : stringName,
                p : updatePassword },
            cache : false,
            success : lockGetReady,
            error : errorHandler
        }
    );
}

// сообщения получены, добавляет, показывает, сохраняет
function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
    else {
        messages=[];
        if ( callresult.result!="" ) { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений           
            messages=JSON.parse(callresult.result);
             //messages.sort(compareZP); 
            // вдруг кто-то сохранил мусор вместо ROZHKOV_TEST_INFO?
            if ( !Array.isArray(messages) )
                messages=[];
        }
function compareZP(A,B) {
  return B.mess-A.mess;
}


       
        messages.push( { name:nameOne, mess:res } );         
        if ( messages.length>3 )
            messages=messages.slice(messages.length-3);

       

        $.ajax( {
                url : ajaxHandlerScript,
                type : 'POST', dataType:'json',
                data : { f : 'UPDATE', n : stringName,
                    v : JSON.stringify(messages), p : updatePassword },
                cache : false,
                success : updateReady,
                error : errorHandler
            }
        );
    }
}



// сообщения вместе с новым сохранены на сервере
function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
        console.log(callresult.error);  
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
    console.log(statusStr+' '+errorStr);
}
sendMessage()
}




function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    //ctx.fillStyle = "#0095DD";
    ctx.fillStyle = "#E90051";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);   
    ctx.fillStyle = "#B34EE9";
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
                ctx.fillStyle = "#0095DD";
                ctx.fillStyle = "orange";
                if (r%2==0){
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
    //if(y + dy < ballRadius) {
       if(y - ballRadius< 0) {
        dy = -dy;        
    }

    
  
       if(x+ballRadius> paddleX && x-ballRadius < paddleX + paddleWidth && y + ballRadius > canvas.height-paddleHeight ){             
            dy = -dy;           
        }

  
       if(y+ballRadius > canvas.height) {     
            dy = -dy;
            lives--;           
     
        if(!lives) {
                  stopUp_2();                      
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
var clickAudio2=new Audio("champions.mp3");

        


draw();
   
   








//}
