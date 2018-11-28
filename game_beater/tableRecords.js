"use strict"

var ajaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
var messages; // элемент массива - {name:'Иванов',mess:'Привет'};
var updatePassword;
var stringName='ROZHKOV_TEST_INFO';

// показывает все сообщения из messages на страницу
function showMessages() {
    var str='';
    for ( var m=0; m<messages.length; m++ ) {
        var message=messages[m];
        str+="<b>"+escapeHTML(message.name)+":</b> "
            +escapeHTML(message.mess)+"<br />";
    }
    document.getElementById('tableRecords').innerHTML+=str;
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


var tableRecords = document.getElementById('tableRecords');
tableRecords.innerHTML+="<h3>ТАБЛИЦА РЕКОРДОВ:</h3>"

var shift = -400;		
var sliderTable = document.getElementById('tableRecords');
sliderTable.innerHTML="<h3>ТАБЛИЦА РЕКОРДОВ</h3>"
var timerShiftTable = setInterval (moveTable,10);                
		function moveTable () {			
                        sliderTable.style.top = shift +'px';			
			shift= shift + 5;
			if (shift>0){			
			clearInterval (timerShiftTable);
			//slider.style.opacity = 0;
                        //document.location.reload();//перезагрузить текущую страницу      
			}
		}