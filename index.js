window.onload = () => {
	
	const divs = document.querySelectorAll(".board div");
	let snake = [];
	let tail, head;
	let timer = 0;
	let apple;
	let k = 0;
	let SCO = 0;
	let _score = document.getElementById('score');
	let speed = 1000;
	let code;
	let trail = [];

	

	(() => {divs.forEach(e => {
		e.setAttribute('id',k);
		k++;
	});})();

	function rand(min, max, integer) {
		if (!integer) {
			return Math.random() * (max - min) + min;
		} 
		else {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
	}

	function initApple(){
		//init the apple
		let i = 0;
		do {
			i = rand(0,100,1);
		}while(snake.includes(document.getElementById(i)));

		apple = divs[i];
		apple.style.backgroundColor = 'green';
		console.log('apple :'+i);
	}

	function init(){
		
		//init snake
		snake = [divs[5],divs[4],divs[3]]

		snake.forEach( square => {
			square.setAttribute('className', 'snk');
			square.style.backgroundColor = 'blue';
			trail.push(square);
		});
		trail.pop();
		head = snake[0];
		tail = snake[2];

		//init the apple
		initApple();
		code = 39;
	}

	function clear(){
		divs.forEach(square => {
			square.style.backgroundColor = 'white';
			square.removeAttribute('className');
		});
		clearInterval(timer);
		timer = 0;
		_score.innerHTML = '0';
		SCO = 0;
		code = 39;
		speed = 1000;
	}

	function move(_direction){

		let prehead = snake[1];
		let hpos = parseInt(snake[0].getAttribute('id'));
		let current = head;
		let currentT = tail;
		
		snake.forEach( square => {
				square.style.backgroundColor = 'white';
				square.removeAttribute('className');
				trail.push(square);
			});
		trail.pop();

		switch (_direction) {
			case 37: //left
				{
					if(parseInt(prehead.getAttribute('id')) == parseInt(head.id)-1 )
						break;
					else
						snake[0] = snake[0].previousSibling.previousSibling;
				}
				break;
			
			case 38:
				// up
				{
					if(parseInt(prehead.getAttribute('id')) == parseInt(head.id)-10 )
						break;
					else
						snake[0] = document.getElementById(hpos - 10);
				}
				break;
			case 39:
				// right
				{
					if(parseInt(prehead.getAttribute('id')) == parseInt(head.id)+1)
						break;
					else
						snake[0] = snake[0].nextSibling.nextSibling;
				}
				break;
			case 40:
				// down
				{
					if(parseInt(prehead.getAttribute('id')) == parseInt(head.id)+10 )
						break;
					else
						snake[0] = document.getElementById(hpos + 10);
				}
				break;

			default:
				break;
		}
		if(snake[0] === null){ //Loosing cases
			alert('You lost!!');
			clear();
			trail = [];
		}
		else if(snake[0] === apple){
			initApple();
			_score.innerHTML = ++SCO;
			snake.push(currentT);
			trail.push(currentT);
			console.log(speed);
		}
		
		if(timer){
			for (let i = 1; i < snake.length; i++) {
				let pos = parseInt(current.id);
				current = snake[i];
				snake[i] = document.getElementById(pos);
			}
			console.log(snake);
			snake.forEach( square => {
				square.style.backgroundColor = 'blue';
				square.setAttribute('className','snk');
			});
			head = snake[0];
			tail = snake[snake.length-1];
	
		}
	}

	(function play(){ //game-play

		reset = document.querySelector('button');
		reset.addEventListener('click', () => {
			if(timer){ 
				clear();
			}
			init();

			timer = setInterval(() => {
				move(parseInt(code));

				window.addEventListener('keydown', (e) =>{
					code = e.keyCode;
				},false);
		
			},speed);
		}, false);
	})();
}