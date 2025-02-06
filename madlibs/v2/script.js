(function(){
    'use strict';
    console.log('reading JS');

    const myOutput = document.querySelector('#output');
    const myQuestions = document.querySelector('#questions');
    // const myWarning = document.querySelector('#warning');

    myQuestions.addEventListener('submit', function(event){
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

        let myOutput;
        // let myWarning;

        //checks and gives custom error message to each empty form field
        if(object1 == '') {
            myOutput = '<span class="warning">!Please name an object!</span>';
            //.focus puts the cursor back into the form field
            document.querySelector('#object1').focus();
        } else if(object2 == '') {
            myOutput = '<span class="warning">!Please name another object!</span>';
            document.querySelector('#object2').focus();
        } else if(location == '') {
            myOutput = '<span class="warning">!Please name a location!</span>';
            document.querySelector('#location').focus();
        } else if(color1 == '') {
            myOutput = '<span class="warning">!Please name a color!</span>';
            document.querySelector('#color1').focus();
        } else if(color2 == '') {
            myOutput = '<span class="warning">!Please name another color!</span>';
            document.querySelector('#color2').focus();
        } else if(number == '') {
            myOutput = '<span class="warning">!Please provide a number!</span>';
            document.querySelector('#number').focus();
        } else if(pastTense1 == '') {
            myOutput = '<span class="warning">!Please provide a past tense action verb!</span>';
            document.querySelector('#pastTense1').focus();
        } else if(pastTense2 == '') {
            myOutput = '<span class="warning">!Please provide another past tense action verb!</span>';
            document.querySelector('#pastTense2').focus();
        } else if(pastTense3 == '') {
            myOutput = '<span class="warning">!Please provide yet another past tense action verb!</span>';
            document.querySelector('#pastTense3').focus();
        } else if(pastTense4 == '') {
            myOutput = '<span class="warning">!Please provide one more past tense action verb!</span>';
            document.querySelector('#pastTense4').focus();
        } else if(bodyPart == '') {
            myOutput = '<span class="warning">!Please name a body part!</span>';
            document.querySelector('#bodyPart').focus();
        } else if(animal1 == '') {
            myOutput = '<span class="warning">!Please name an animal!</span>';
            document.querySelector('#animal1').focus();
        } else if(animal2 == '') {
            myOutput = '<span class="warning">!Please name another animal!</span>';
            document.querySelector('#animal2').focus();
        } else if(food == '') {
            myOutput = '<span class="warning">!Please provide a food!</span>';
            document.querySelector('#food').focus();

        //runs only if all fields are filled in
        } else {
            myOutput = `
            
            <p class="storyStyling">One day, I came across a <b>${object1}</b>-sized <b>${animal1}</b> in front of me. </p> 
            </br>
            <p class="storyStyling">They were <b>${color1}</b> and look like they eat <b>${food}</b> <b>${number}</b> times a week. They then ${pastTense1}</b> at me in the <b>${bodyPart}</b> and proceeded to bring put a <b>${object2}</b> that was glowing <b>${color2}</b> for some reason.</p> 
            </br>
            <p class="storyStyling">I went closer to try to take a closer look but the creature but a <b>${animal2}</b> <b>${pastTense2}</b> in and <b>${pastTense3}</b> them before I could. Both of them <b>${pastTense4}</b> away towards the <b>${location}</b>.</p> 
            </br>
            <p class="storyStyling">What a weird day!</p>`;

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

            myQuestions.innerHTML = '';
            // warning.innerHTML = ' ';

            // document.querySelector('warning').innerHTML = "should be empty";

        }

        //puts data from form field into the article with the specific id
        output.innerHTML = myOutput;
        // warning.innerHTML = myWarning;
        
    });
    
})();