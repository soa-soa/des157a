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
	const thinkingPlayer = document.getElementById('thinkingPLayer');
	const dialogue = document.getElementById('dialogue');
	const devilArea = document.getElementById('devilArea');

	const gameData = {
		dice: ['images/1questionMark.png', 'images/2lightbulb.png', 'images/3lightbulb.png', 
			   'images/4die.jpg', 'images/5die.jpg', 'images/6die.jpg'],
		players: ['Angel ^_^', 'Devil >:)'],
		score: [0, 0],
		roll1: 0,
		roll2: 0,
		// roll3: 0,
		// roll4: 0,
		rollSum: 0,
		index: 0,
		gameEnd: 29,

		rollSumEnemy: 0,

		// round:0,
		// roundEnd:11,

		angelDialogue: ['What about your wallet?', 'You can still love Soundwave moderately', 'angel argument 3', 'angel argument 4', 'angel argument 5', 'angel argument6'],
		devilDialogue: ['Money is temporary. Transformers are eternal', 'FOMO', 'devil argument 3', 'devil argument 4', 'devil argument 5', 'devil argument6'],
		dialogueRoll: 0,
		dialogueIndex: 0,
	};

	// const dialogueData = {
	// 	angelDialogue: ['What about your wallet?', 'You can still love Soundwave moderately', 'argument 3', 'argument 4', 'argument 5', 'argument6'],
	// };

	startGame.addEventListener('click', function () {
		gameData.index = Math.round(Math.random());
		console.log(gameData.index);

		// setUpTurn();

		// gameControl.innerHTML = '<h2>The Argument Has Started</h2>';
		gameControl.innerHTML = '<button id="quit">Quit making me think</button>';

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
		gameData.dialogueRoll = Math.floor(Math.random() * 6) + 1; //using ceil could result in a zero

		// gameData.roll3 = Math.floor(Math.random() * 3) + 1; //using ceil could result in a zero
		// gameData.roll4 = Math.floor(Math.random() * 3) + 1;

		game.innerHTML = `<p>${gameData.players[gameData.index]} is thinking</p>`;
		game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"> `;
		devilArea.innerHTML += `<img src="${gameData.dice[gameData.roll2-1]}"> `;
		// game.innerHTML += `<img src="${gameData.dice[gameData.roll3-1]}"> 
		// 					<img src="${gameData.dice[gameData.roll4-1]}">`;
		gameData.rollSum = gameData.roll1 + gameData.roll2;
		// gameData.rollSumEnemy = gameData.roll3 + gameData.roll4;

		console.log(`Dice 1: ${gameData.roll1}. Dice 2: ${gameData.roll2}`);
		console.log(`Dialogue dice rolled a ${gameData.dialogueRoll}`);
		// dialogue.innerHTML = `<p>${gameData.angelDialogue[gameData.dialogueRoll-1]}</p>`;

		//I want to make it so that the side that it got switched to also triggers their respective dialogue choices...
		dialogue.innerHTML = `<p>${gameData.angelDialogue[gameData.dialogueRoll-1]}</p>`;

		// ${gameData.players[gameData.index]}

		// if two 1's are rolled, scores are reset, I get confused
		// if( gameData.rollSum === 2 ){ //triggers only if the dice sum equals to 2
		// 	game.innerHTML += '<p>Uh oh...I feel so confused...What was the argument again?</p>';
		// 	gameData.score[gameData.index] = 0; //resets score to 0
		// 	gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switches player
		// 	showCurrentScore();
		// 	setTimeout(setUpTurn, 3500);
		// }

		if(gameData.roll1 > gameData.roll2){
			game.innerHTML += '<p>Angel wins this round!</p>';
			showCurrentScore();
			setTimeout(setUpTurn, 3500);
		}

		//NOTE FIND A WAY TO RESET MESSAGES
		else if(gameData.roll2 > gameData.roll1){
			devilArea.innerHTML += '<p>Devil wins this round!</p>';
			showCurrentScore();
			setTimeout(setUpTurn, 3500);
		}


		// if either die is a 1, switches player, player gets confused
		else if(gameData.roll1 === 1 || gameData.roll2 === 1){ 
			gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switches players
			game.innerHTML += `<p>You rolled a ? and got a bit confused :( switching to  ${
				gameData.players[gameData.index]
			}</p>`;

			// gameData.dialogueIndex ? (gameData.dialogueIndex = 0) : (gameData.dialogueIndex = 1); //switches diague options????
			// dialogue.innerHTML = `<p>${gameData.devilDialogue[gameData.dialogueRoll-1]}</p>`;
			setTimeout(setUpTurn, 3500);
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

	// function checkWinningCondition() {
	// 	if (gameData.score[gameData.index] > gameData.gameEnd) {
	// 		score.innerHTML = `<h2>${gameData.players[gameData.index]} 
	// 		wins this round with ${gameData.score[gameData.index]} points!</h2>`;

	// 		actionArea.innerHTML = '';
	// 		document.getElementById('quit').innerHTML = 'Start a New Game?';
	// 	} else {
	// 		// shows current score...
	// 		showCurrentScore();
	// 	}
	// }

	function checkWinningCondition() {
		if (gameData.score[gameData.index] > gameData.gameEnd) {
			score.innerHTML = `<h2>${gameData.players[gameData.index]} 
			wins this round with ${gameData.score[gameData.index]} points!</h2>`;

			actionArea.innerHTML = '';
			document.getElementById('quit').innerHTML = 'Start a New Argument?';
		} else {
			// shows current score...
			showCurrentScore();
		}
	}

	function showCurrentScore() {
		score.innerHTML = `<p><strong>${gameData.players[0]}</strong> won <strong>${gameData.score[0]}</strong> persuasion points and <strong>${gameData.players[1]}</strong> won 
		<strong>${gameData.score[1]}</strong> persuasion points.</p>`;
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

	document.querySelector('.closeButtonInstructions').addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector('#instructions').className = 'hidden';
		console.log('clicked close button for instructions')
    });
	

    // //allows user to exit the overlay when pressing escape key
    // document.addEventListener('keydown', function(event){
    //     if (event.key == 'Escape') {
    //         document.querySelector('#overlay').className = 'hidden';
    //     }
    // });

}());