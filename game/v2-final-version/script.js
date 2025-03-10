(function(){
	
	"use strict";
	console.log('reading JS');

	/* 
	This gets the player: gameData.players[gameData.index]
	This gets the first die: gameData.dice[gameData.roll1-1]
	This gets the second die: gameData.dice[gameData.roll2-1]
	This gets the score of the current player: gameData.score[gameData.index]
	*/
	
	const startGame = document.getElementById('startgame');
	const gameControl = document.getElementById('gamecontrol');
	const game = document.getElementById('game');
	const score = document.getElementById('score');
	const actionArea = document.getElementById('actions');

	const gameData = {
		dice: ['images/1questionMark.png', 'images/2lightbulb.png', 'images/3lightbulb.png', 
			   'images/4die.jpg', 'images/5die.jpg', 'images/6die.jpg'],
		players: ['Angel ^_^', 'Devil >:)'],
		score: [0, 0],
		roll1: 0,
		roll2: 0,
		rollSum: 0,
		index: 0,
		gameEnd: 29,

		rollSumEnemy: 0,

		round:0,
		roundEnd:11,
	};

	startGame.addEventListener('click', function () {
		gameData.index = Math.round(Math.random());
		console.log(gameData.index);

		gameControl.innerHTML = '<h2>The Game Has Started</h2>';
		gameControl.innerHTML += '<button id="quit">Quit making me think</button>';

		document
			.getElementById('quit').addEventListener('click', function () {
				location.reload();
			});

		setUpTurn();
	});

	function setUpTurn() {
		game.innerHTML = `<p>Thinking as the ${gameData.players[gameData.index]}</p>`;
		actionArea.innerHTML = '<button id="roll">Think</button>';
		document.getElementById('roll').addEventListener('click', function(){

			throwDice();

		});
	}

	function throwDice(){
		actionArea.innerHTML = '';
		gameData.roll1 = Math.floor(Math.random() * 3) + 1; //using ceil could result in a zero
		gameData.roll2 = Math.floor(Math.random() * 3) + 1;
		game.innerHTML = `<p>${gameData.players[gameData.index]} is thinking</p>`;
		game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"> 
							<img src="${gameData.dice[gameData.roll2-1]}">`;
		gameData.rollSum = gameData.roll1 + gameData.roll2;
		// gameData.rollSumEnemy = gameData.roll3 + gameData.roll4;

		// if two 1's are rolled, scores are reset, I get confused
		if( gameData.rollSum === 2 ){ 
			game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
			gameData.score[gameData.index] = 0;
			gameData.index ? (gameData.index = 0) : (gameData.index = 1);
			showCurrentScore();
			setTimeout(setUpTurn, 3000);
		}

		// if either die is a 1, switches player, player gets confused
		else if(gameData.roll1 === 1 || gameData.roll2 === 1){ 
			gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switches players
			game.innerHTML += `<p>You rolled a ? and got a bit confused :( switching to  ${
				gameData.players[gameData.index]
			}</p>`;
			setTimeout(setUpTurn, 3000);
		}

		// if neither die is a 1...
		else { 
			gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
			actionArea.innerHTML = '<button id="rollagain">Think again</button> or <button id="pass">Pass</button>';

			document.getElementById('rollagain').addEventListener('click', function () {
				//setUpTurn();
				throwDice();
			});

			document.getElementById('pass').addEventListener('click', function () {
				gameData.index ? (gameData.index = 0) : (gameData.index = 1);
				setUpTurn();
			});

			checkWinningCondition();
		}

	}

	function checkWinningCondition() {
		if (gameData.score[gameData.index] > gameData.gameEnd) {
			score.innerHTML = `<h2>${gameData.players[gameData.index]} 
			wins this round with ${gameData.score[gameData.index]} points!</h2>`;

			actionArea.innerHTML = '';
			document.getElementById('quit').innerHTML = 'Start a New Game?';
		} else {
			// shows current score...
			showCurrentScore();
		}
	}

	function showCurrentScore() {
		// score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}
		// ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} 
		// ${gameData.score[1]}</strong></p>`;
		score.innerHTML = `<p><strong>${gameData.players[0]}</strong> won <strong>${gameData.score[0]}</strong> arguments and <strong>${gameData.players[1]}</strong> won 
		<strong>${gameData.score[1]}</strong> arguments.</p>`;
	}

	//exits overlay when clicking close button
    document.querySelector('.closeButton').addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector('#overlay').className = 'hidden';
		console.log('clicked close button')
    });

		//exits overlay when clicking close button
		document.querySelector('.closeButton2').addEventListener('click', function(event){
			event.preventDefault();
			document.querySelector('#overlay2').className = 'hidden';
			console.log('clicked close button 2')
		});
	

    // //allows user to exit the overlay when pressing escape key
    // document.addEventListener('keydown', function(event){
    //     if (event.key == 'Escape') {
    //         document.querySelector('#overlay').className = 'hidden';
    //     }
    // });

}());