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
	
	const score = document.getElementById('score');
	const actionArea = document.getElementById('actions');
	const thinkingPlayer = document.getElementById('thinkingPLayer');
	const dialogue = document.getElementById('dialogue');
	const angelRoll = document.getElementById('angelRoll'); //game gets changed into angelArea
	const devilRoll = document.getElementById('devilRoll');
	const angelTotalScore = document.getElementById('angelTotalScore');
	const devilTotalScore = document.getElementById('devilTotalScore');

	const gameData = {
		dice: ['images/1questionMark.png', 'images/1lightbulb.png', 'images/2lightbulb.png', 'images/3lightbulb.png', 
			   'images/4die.jpg', 'images/5die.jpg', 'images/6die.jpg'],
		players: ['Angel ^_^', 'Devil >:)'],
		score: [0, 0],
		roll1: 0,
		roll2: 0,

		totalScore:[0,0],
		angelRollSum: 0,
		devilRollSum: 0,

		index: 0,
		gameEnd: 10,


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
		gameControl.innerHTML = '<button id="quit">Quit Game</button>';

		document
			.getElementById('quit').addEventListener('click', function () {
				location.reload();
			});

		setUpTurn();
	});

	function setUpTurn() {
		// dialogue.innerHTML = `<p>Thinking as the ${gameData.players[gameData.index]}</p>`;
		actionArea.innerHTML = '<button id="roll">Think</button>';
		document.getElementById('roll').addEventListener('click', function(){

			throwDice();

		});
	}

	function throwDice(){
		actionArea.innerHTML = ''; //makes roll button disappear
		gameData.roll1 = Math.floor(Math.random() * 4) + 1; //using ceil could result in a zero
		gameData.roll2 = Math.floor(Math.random() * 4) + 1;

		//rolls a random dialogue option when a side wins
		gameData.dialogueRoll = Math.floor(Math.random() * 6) + 1; //using ceil could result in a zero

		//shows whose turn it is
		// dialogue.innerHTML = `<p>${gameData.players[gameData.index]} is thinking</p>`;
		
		//updates page with lightbulb images???
		angelRoll.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"> `;
		console.log(`angel image changes to ${gameData.dice[gameData.roll1-1]}`);
		devilRoll.innerHTML += `<img src="${gameData.dice[gameData.roll2-1]}"> `;
		console.log(`devil image changes to ${gameData.dice[gameData.roll2-1]}`);

		gameData.rollSum = gameData.roll1 + gameData.roll2;

		console.log(`angelDice: ${gameData.roll1}. devilDice: ${gameData.roll2}`);
		console.log(`Dialogue dice:${gameData.dialogueRoll}, ${gameData.angelDialogue[gameData.dialogueRoll-1]}`);

		
		//if angelRoll value is greater than devilRoll
		//if angel rolls a higher value than devil
		if (gameData.roll1 > gameData.roll2){
			dialogue.innerHTML = '<p>Angel wins this round!</p>';
			//I want to make it so that the side that it got switched to also triggers their respective dialogue choices...
			dialogue.innerHTML += `<p>${gameData.angelDialogue[gameData.dialogueRoll-1]}</p>`;
			// showCurrentScore();
			setTimeout(setUpTurn, 2000);
			console.log('angel rolls higher value')
			console.log(`should be angel score ${gameData.score[0]}`);

			checkWinningCondition();
		}

		//NOTE FIND A WAY TO RESET MESSAGES
		//if devil rolls a higher value than angel
		else if (gameData.roll2 > gameData.roll1){
			dialogue.innerHTML = '<p>Devil wins this round!</p>';
			dialogue.innerHTML += `<p>${gameData.devilDialogue[gameData.dialogueRoll-1]}</p>`;
			showCurrentScore();
			setTimeout(setUpTurn, 2000);
			console.log('devil rolls higher value')

		}

		//if they both tie
		else if (gameData.roll1 == gameData.roll2){
			dialogue.innerHTML = '<p>Both sides tied!</p>';
			showCurrentScore();
			setTimeout(setUpTurn, 2000);
			console.log('Theres a tie')

		}


		// if either rolled a 1, switches player, player gets confused
		else if(gameData.roll1 === 1 || gameData.roll2 === 1){ 
			gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switches players
			dialogue.innerHTML += `<p>You rolled a ? and got a bit confused :( switching to ${
				gameData.players[gameData.index]
			}</p>`;

			setTimeout(setUpTurn, 3000);
		}

		

		// if neither die is a 1...continue playing as normal
		else { 
			//(in that particular index (player 1 or 2, add score to that side)
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
		//will win only if their score reaches a past a score threshold
		//angel win condition
		if (gameData.totalScore[0] > gameData.gameEnd) {
			score.innerHTML = `<h2>${gameData.players[0]} 
			wins this round with ${gameData.totalScore[0]} points!</h2>`;

			actionArea.innerHTML = '';
			document.getElementById('quit').innerHTML = 'Start a New Argument?';
			console.log(`Angel wins game with ${gameData.totalScore[0]} points`);
		} 

		//devil win condition
		else if (gameData.totalScore[1] > gameData.gameEnd) {
			score.innerHTML = `<h2>${gameData.players[1]} 
			wins this round with ${gameData.totalScore[1]} points!</h2>`;

			actionArea.innerHTML = '';
			document.getElementById('quit').innerHTML = 'Start a New Argument?';
			console.log(`Devil wins game with ${gameData.totalScore[1]} points`);
		} 
		
		else {
			// shows current score...
			showCurrentScore();
		}
	}

	function showCurrentScore() {
		//angel score for each round
		angelRoll.innerHTML = `<p><strong>${gameData.players[0]}</strong> won <strong>${gameData.roll1}</strong> persuasion points</p>`; 

		//angel total score for entire game
		gameData.totalScore[0] = gameData.totalScore[0] + gameData.roll1;
		angelRoll.innerHTML += `<p>Angel's Total Score: <strong>${gameData.totalScore[0]}</strong><p>`;
		console.log(`Angel Total Score: ${gameData.totalScore[0]}`);
		console.log('testing if this doubles')
		
		//devil score for each round
		devilRoll.innerHTML = `<p><strong>${gameData.players[1]}</strong> won 
		<strong>${gameData.roll2}</strong> persuasion points.</p>`;

		//devil total score for entire game
		gameData.totalScore[1] = gameData.totalScore[1] + gameData.roll2;
		devilRoll.innerHTML += `<p>Devil's Total Score: <strong>${gameData.totalScore[1]}</strong><p>`;
		console.log(`Devil Total Score: ${gameData.totalScore[1]}`);

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
		document.querySelector('#openButtonInstructions').className = 'showing';
		console.log('closed instructions')
    });


	document.querySelector('#openButtonInstructions').addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector('#instructions').className = 'showing';
		document.querySelector('#openButtonInstructions').className = 'hidden';
		console.log('opened instructions')
    });

}());