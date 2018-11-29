 'use strict'


// Начало кода, если пользователь хочет покинуть страницу


 /*window.onbeforeunload=befUnload;

  function befUnload(EO) {
    EO=EO||window.event;
   
      EO.returnValue='А у вас есть несохранённые изменения!';
  };*/

//Конец кода, если пользователь хочет покинуть страницу



// Читаем таблицу рекордов из хранидища на сервере AjaxStringStorage2

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var messages; // элемент массива - {name:'Иванов',mess:'Привет'};
var updatePassword;
var stringName='ROZHKOV_TEST_INFO';

var nameRecord='Незнакомец';

var nameButton = document.getElementById("nameButton");
var labelName = document.getElementById("labelName");
var nameText = document.getElementById("text");
nameButton.addEventListener('click',nameUp);
function nameUp() { 
            //alert ('Hi');       	           	
            nameRecord=nameText.value;
             if (nameRecord==="") {    
    nameRecord ="Незнакомец";
    }                       
            nameButton.style.display='none';
            nameText.style.display='none';
            labelName.style.display='none';
            console.log (nameRecord);            
        }



// показывает все сообщения из messages на страницу
function showMessages() {
    var str='';
    for ( var m=0; m<messages.length; m++ ) {
        var message=messages[m];
        str+="<b>"+escapeHTML(message.name)+":</b> "
            +escapeHTML(message.mess)+"<br />";
    }
    document.getElementById('wrap4').innerHTML+=str;
}


function escapeHTML(text) {
    if ( !text )
        return text;
    text=text.toString()
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");
    return text;
}

// получает сообщения с сервера и потом показывает
function refreshMessages() {
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'READ', n : stringName },
            cache : false,
            success : readReady,
            error : errorHandler
        }
    );
}


function readReady(callresult) { // сообщения получены - показывает
    if ( callresult.error!=undefined ) {
        alert(callresult.error); 
        console.log(callresult.error);
        } 
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
        showMessages();
    }

}


function compareZP(A,B) {
  return B.mess-A.mess;
}

//messages.sort(compareZP);

function errorHandler(jqXHR,statusStr,errorStr) {
      alert(statusStr+' '+errorStr);
      console.log(statusStr+' '+errorStr);
}


refreshMessages();


//Создаем игру

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;//задаем радиус мяча
var x = canvas.width/2;// координата мяча по оси X
var y = canvas.height-30;// координата мяча по оси Y
var dx = randomDiap (-3,3);
var dy = randomDiap (-1,-2);
var paddleHeight = 20;
var paddleWidth = 110;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
//var brickColumnCount = 3;
var brickColumnCount = 1;
var brickWidth = 75;
var brickHeight = 20;
//var brickPadding = 10;
var brickPadding = 45;
var brickOffsetTop = 30;
//var brickOffsetLeft = canvas.width/6;
var brickOffsetLeft = 25;

var score = 0;
var lives = 3;

//Содаем функцию для создания случайного направления полета мяча при старте игры

function randomDiap (N,M) {
var a = Math.floor(Math.random()*(M-N+1))+N;
if (a ==0) {
a =2;
}
return a;
}


var bricks = [];//объявляем массив для кирпичей
for(let c=0; c<brickColumnCount; c++) { //перебираем кирпичи в колонках
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {//вложенным циклом перебираем кирпичи в рядах
        //bricks[c][r] = { x: 0, y: 0, status: 1 };
          bricks[c][r] = { x: 0, y: 0, status: 1, count:0 }; //складываем кирпичи в хэш, где x,y-это текущие координаты мяча, status-это состояние кирпича(виден или выбит), count-количество попаданий мячом в кирпич
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

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


function mouseMoveHandler(e) {
    //var relativeX = e.clientX - canvas.offsetLeft;
    var relativeX = e.pageX-(canvas.width/2+paddleWidth/2);
    if(relativeX > 0 && relativeX < canvas.width) {    
        paddleX = relativeX - paddleWidth/2;        
    }
}

  
function collisionDetection() { //функция по выбиванию кирпичей
    for(let c=0; c<brickColumnCount; c++) {//перебираем кирпичи в колонках
        for(let r=0; r<brickRowCount; r++) { //вложенным циклом перебираем кирпичи в рядах
            let b = bricks[c][r];
            console.log (b);
            if(b.status == 1) {              
                    if ((x+ballRadius)>b.x && (x-ballRadius)<(b.x+ brickWidth) && (y-ballRadius)<(b.y+brickHeight)) {  
                    dy = -dy;  //при столкновении мяча с кирпичом меняем скорость мяча на обратную                   
                    b.count++;  //увеличиваем количество попаданий в кирпич на 1
                    b.status = 1; //оставляем статус кирпича 1 то есть быть не вибитым при первом попадании мячом                               
                    score++;  //увеличиваем счет в игре на 1(количество попаданий мячом в кирпич)
                    clickAudio1.play();// звук выбивания фигуры               
                     }

                    if (b.count==2&&r%2==0) { //определяем условие для конкретного кирпича для его выбивания                   
                     b.status = 0;
                  }
                  
                     if (b.count==1&&!(r%2==0)) {                 
                     b.status = 0;
                  }

 if(score == 2*brickRowCount*brickColumnCount-2) {  // если количество попаданий равно в два раза больше, чем количество кирпичей  за минус 2                 
                      
                        clearInterval(timer); // останавливаем таймер
                        startButton.style.display = 'inline-block'; //показываем кнопку старт для следующего уровня игры

                        function testLoadScript() { //загружаем скрипт (новая комната  с двумя уровнями кирпичей)     
        $.ajax("https://dmitryrozhkov.github.io/game_beater/game_2.js",
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

    testLoadScript();   //вызываем функцию
                  
                }
            }
        }
    }
}


                 
//Создаем фукцию которая при ее вызове перезагрузит страницу
var aaa = function () {
document.location.reload();
}


//Рисуем в canvas

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    //ctx.fillStyle = "#0095DD";
    ctx.fillStyle = "#3235FF";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    //ctx.fillStyle = "#0095DD";
     ctx.fillStyle = " #FF00AE";                     
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
                //ctx.fillStyle = "#0095DD";
                ctx.fillStyle = "red";              
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



var timer = null;
var startButton = document.getElementById("start");
startButton.addEventListener('click',startUp);
function startUp() {           
              timer = setInterval (draw, 10);
              startButton.style.display='none';            
        }

var stopButton = document.getElementById("stop");
stopButton.addEventListener('click',stopUp);
function stopUp() {            
              clearInterval(timer); //останавливаем таймер
              startButton.style.display='inline-block';          
        }

var hideTable = document.getElementById("table");
var wrapTable = document.getElementById("wrap3");
hideTable.addEventListener('click', hideUp);
function hideUp() {            
              wrapTable.style.display='none';              
               startButton.style.display='inline-block';  
               stopButton.style.display='inline-block';             
               nameButton.style.display='none';
               nameText.style.display='none';  
               labelName.style.display='none';                     
        }
console.log (nameRecord);


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
  
       if(x+ballRadius > canvas.width || x-ballRadius<0) {
            dx = -dx;        
    }
   
    if(y - ballRadius< 0) {
        dy = -dy;        
    }
    
    if(x > paddleX && x < paddleX + paddleWidth && y + ballRadius > canvas.height-paddleHeight ){       
            dy = -dy;           
        }

   
       if(y+ballRadius > canvas.height) {       
            dy = -dy;
            lives--;           
        
//Если lives=0
   
        if(!lives) {           
                stopUp();                            
                setTimeout (aaa, 7000); 

var shiftLose = -700;		
var sliderLose = document.getElementById('sliderLose');
sliderLose.innerHTML='<h1>Игра закончена<h1><h1>Ваш результат: '+score+'</h1>'
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

var clickAudio1=new Audio("button-16.mp3");

draw();
