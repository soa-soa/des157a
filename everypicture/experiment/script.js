(function () {
	'use strict';

	const captions = [
		'',
		'1.TTTench garpike mooneye halosaur tompot blenny, bluefish, barb, "velvet catfish jellynose fish." <img scr="images/transformers.png>',
		'2. Speckled trout California smoothtongue Alaska blackfish bigscale fish mud cat pike characid, horn shark?',
		'3. Silver dollar; African glass catfish pearl perch Asiatic glassfish.',
		'4. Chinook salmon spookfish rudd threadsail, nibbler pikehead sand knifefish buri.',
		'5. Mexican blind cavefish vendace deep sea eel warty angler.',
		'6. Barbeled houndshark, lined sole jewfish, crappie loweye catfish squirrelfish.'];

	let figCaption = document.querySelector('figcaption');

	figCaption.innerHTML = captions[1];

	/* Edge case: If the user is down the page and clicks the 
	browser refresh button for some reason, the page will refresh
	with the position down the page preserved, but the caption for
	the first section will appear, which is incorrect.

	This simply puts the top of the page at the top of the
	window when the user clicks the refresh button, preventing 
	this potential error.*/
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

	window.addEventListener('load', function () {
		const posts = document.querySelectorAll('section');
		let postTops = [];
		let pageTop;
		let counter = 1;
		let prevCounter = 1;
		let doneResizing;

		// new variables for setting scroll direction...
		let exitDirection;
		let enterDirection;

		resetPagePosition();

		window.addEventListener('scroll', function () {
			pageTop = window.pageYOffset + 300;

			if (pageTop > postTops[counter]) {
				counter++;
				console.log(`scrolling down ${counter}`);
			} else if (counter > 1 && pageTop < postTops[counter - 1]) {
				counter--;
				console.log(`scrolling up ${counter}`);
			}

			/* there are different styles on the stylesheet for having the
			captions come in from the bottom and exit off the top, if the 
			user is scrolling down, or having captions come in from the top and exit at the bottom, if the user is scrolling up. */

			if (counter != prevCounter) {
				document.querySelector('figure img').className = 'sect' + counter;

				//if the user is scrolling down
				if (counter > prevCounter) {
					//set the correct classes
					exitDirection = 'animate exitup';
					enterDirection = 'animate enterup';
				}
				// if the user is scrolling up
				else {
					//set the correct classes
					exitDirection = 'animate exitdown';
					enterDirection = 'animate enterdown';
				}

				// uses the variables set above to set the classes...
				figCaption.className = exitDirection;
				figCaption.addEventListener('animationend', function () {
					let newCaption = document.querySelector('figcaption').cloneNode(true);
					figCaption.remove();
					newCaption.className = enterDirection;
					newCaption.innerHTML = captions[counter];
					document.querySelector('figure').appendChild(newCaption);
					figCaption = document.querySelector('figcaption');
				});

				prevCounter = counter;
			}

		}); // end window scroll function

		window.addEventListener('resize', function () {
			clearTimeout(doneResizing);
			doneResizing = setTimeout(function () {

				resetPagePosition();

			}, 500);
		});

		function resetPagePosition() {
			postTops = [];
			posts.forEach(function (post) {
				postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
			});

			const pagePosition = window.pageYOffset + 300;
			counter = 0;

			postTops.forEach(function (post) { if (pagePosition > post) { counter++; } });

		}

	}); // end window load function

})();