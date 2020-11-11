var countShot = 0;
var bulletPosition = random(1, 7);
var btnShot = document.querySelector("#shot");
var currentPlayer = 1;
var baraban = document.querySelector("#baraban");
btnShot.onclick = start; //вызову функции старт

function start() { //функция старт заупскается после нажатия кнопки
	btnShot.className = "off";
	var bullet = document.querySelector("#bullet");
		bullet.style.display = "block";

    var revolver = document.querySelector("#revolver");
    	revolver.style.display = 'block';
		
		btnShot.onclick = "";
		
		var rotate = 0;
		var timer = setInterval(function() { //вращение барабана на два круга после того как вставил пулю
			rotate= rotate + 10;
			baraban.style.transform = "rotate(" + rotate + "deg)";
			if(rotate == 90){
				bullet.style.display = 'none';
			}
			if(rotate == 720){
				clearInterval(timer);
				btnShot.innerText = "Сделать выстрел";
				btnShot.onclick = shot;

				btnShot.className ='on';
				startrotate.pause();
			}
		},25)
		if(rotate < 720){
				var startrotate; //звук стартовой прокрутки барабана
				startrotate = new Audio();
				startrotate.src = 'baraban-rotate-start.mp3';
				startrotate.play();
			}

		
}
var rotateBaraban = 0;
function shot() { //выстрелы, кровь и вращение барабана после выстрела
	countShot++;
	if (bulletPosition == countShot ) {
		var shot; //выстрел если пуля в барабане
			shot = new Audio();
			shot.src = 'revolver-shot.mp3';
			shot.play();
		var blood = document.createElement("div"); //кровь
			blood.id = "blood";
		var player = document.querySelector("#player" + currentPlayer);
			player.appendChild(blood);
 		setTimeout(function() { //задержка окончания игры что бы кровь появилась перед алёртом
 			endgame();
 		}, 100)
 		
	}else //определение очереди игроков
	{
			var blank; //холостой выстрел
			blank = new Audio();
			blank.src = 'Blank.mp3';
			blank.play();
		if (currentPlayer == 1){
			rotationRight();
			currentPlayer = 2;
		}
			else
			{
			rotationLeft();
			currentPlayer = 1;
			}

			var rotate = rotateBaraban; //поворот барабана после выстрела
			var timer = setInterval(function(){
				rotate = rotate + 10;
				baraban.style.transform = "rotate(" + rotate + "deg)";

				if(rotate == rotateBaraban + 60) {
					clearInterval(timer);
					rotateBaraban = rotate;
				}
			
		 	}, 10)
		}

	}


function random(min, max) { //случайное место для пули
	return Math.floor( Math.random() * (max - min) + min);
}

function rotationRight(){ //пистолет вправо
	var revolver = document.querySelector("#revolver");
	revolver.style.background = 'url("images/revolver-right.png") no-repeat';
}

function rotationLeft(){ //пистолет влево
	var revolver = document.querySelector("#revolver");
	revolver.style.background = 'url("images/revolver-left.png") no-repeat';
}

function endgame(){ //конец игры, изменение текста на кнопке и вызов функции рестарт
	btnShot.innerText = "Рестарт";
	alert("Конец игры");
	btnShot.onclick = restart;
}
function restart() { //перезайгрузка страницы
	location.reload();
}
