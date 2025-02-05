(function(){
    'use strict';
    console.log('reading JS');

    const myForm = document.querySelector('.parent');
    const myArticle = document.querySelector('#madlib');

    myForm.addEventListener('submit', function(event){
        event.preventDefault();

        //gets data from form field and assigns it a variable
        const object1 = document.querySelector('#object1').value;
        const object2 = document.querySelector('#object2').value;
        const location = document.querySelector('#location').value;
        const color1 = document.querySelector('#color1').value;
        const color2 = document.querySelector('#color2').value;
        const number = document.querySelector('#number').value;
        const pastTense1 = document.querySelector('#pastTense1').value;
        const pastTense2 = document.querySelector('#pastTense2').value;
        const pastTense3 = document.querySelector('#pastTense3').value;
        const pastTense4 = document.querySelector('#pastTense4').value;
        const bodyPart = document.querySelector('#bodyPart').value;
        const animal1 = document.querySelector('#animal1').value;
        const animal2 = document.querySelector('#animal2').value;
        const food = document.querySelector('#food').value;

        let myText;

        //checks and gives custom error message to each empty form field
        if(object1 == '') {
            myText = 'Please name an object';
            //.focus puts the cursor back into the form field
            document.querySelector('#object1').focus();
        } else if(object2 == '') {
            myText = 'Please name another object';
            document.querySelector('#object2').focus();
        } else if(location == '') {
            myText = 'Please name yet another object';
            document.querySelector('#location').focus();
        } else if(color1 == '') {
            myText = 'Please name a color';
            document.querySelector('#color1').focus();
        } else if(color2 == '') {
            myText = 'Please name another color';
            document.querySelector('#color2').focus();
        } else if(number == '') {
            myText = 'Please provide a number';
            document.querySelector('#number').focus();
        } else if(pastTense1 == '') {
            myText = 'Please provide a past tense action verb';
            document.querySelector('#pastTense1').focus();
        } else if(pastTense2 == '') {
            myText = 'Please provide another past tense action verb';
            document.querySelector('#pastTense2').focus();
        } else if(pastTense3 == '') {
            myText = 'Please provide yet another past tense action verb';
            document.querySelector('#pastTense3').focus();
        } else if(pastTense4 == '') {
            myText = 'Please provide one more past tense action verb';
            document.querySelector('#pastTense4').focus();
        } else if(bodyPart == '') {
            myText = 'Please name a body part';
            document.querySelector('#bodyPart').focus();
        } else if(animal1 == '') {
            myText = 'Please name an animal';
            document.querySelector('#animal1').focus();
        } else if(animal2 == '') {
            myText = 'Please name an animal';
            document.querySelector('#animal2').focus();
        } else if(food == '') {
            myText = 'Please provide a verb';
            document.querySelector('#food').focus();
        } else {
            myText = `One day, I came across a ${object1}-sized ${animal1} in front of me. They were ${color1} and look like they eat ${food} ${number} times a week. They then ${pastTense1} at me in the ${bodyPart} and proceeded to bring put a ${object2} that was glowing ${color2} for some reason. I went closer to try to take a closer look but the creature but a ${animal2} ${pastTense2} in and ${pastTense3} them before I could. Both of them ${pastTense4} away towards the ${location}. What a weird day! `;

            //resets form fields to blank for another use
            document.querySelector('#object1').value = '';
            document.querySelector('#object2').value = '';
            document.querySelector('#location').value = '';
            document.querySelector('#color1').value = '';
            document.querySelector('#color2').value = '';
            document.querySelector('#number').value = '';
            document.querySelector('#pastTense1').value = '';
            document.querySelector('#pastTense2').value = '';
            document.querySelector('#pastTense3').value = '';
            document.querySelector('#pastTense4').value = '';
            document.querySelector('#bodyPart').value = '';
            document.querySelector('#animal1').value = '';
            document.querySelector('#animal2').value = '';
            document.querySelector('#food').value = '';

        }

        madlib.innerHTML = myText;
        
    });
    
})();