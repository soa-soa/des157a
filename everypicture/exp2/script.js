//instead of IIFE, use event listener, only runs when everything in the page is loaded
//so that it calculates the height and width only after the images are all loaded
window.addEventListener('load', function () {
    'use strict';
    // Add JS here

    const sections = document.querySelectorAll('section');
    const headerP = document.querySelector('header p');
    let sectionTops = []; //reords how far down the screen has scroll to by pixels
    let pagetop;
    let counter = 1;
    let prevCounter = 1;
    let doneResizing;

    //pushes into the empty array
    //records how far down the window has scrolled
    //Math.floor rounds down to whole numbers
    //This forEach loop puts the number of pixels down the page each section is when the page loads into the sectionTops array. 
    sections.forEach(function (eachSection) {
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    });
    
    // console.log(sectionTops);
    console.log((sections[0].getBoundingClientRect().top) + window.scrollY);
    
    //captures scroll event
    window.addEventListener('scroll', function () {
        pagetop = window.scrollY + 100;
        // console.log(pagetop);

        //we use > and < bc there can be cases where the counter scrolls past the = num

        //tells you if you are scrolling down and have scrolled into the next section
        if (pagetop > sectionTops[counter]) {
            counter++;
            console.log(`scrolling down ${counter}`);
        }
        //tells you if you are scrolling up and have scrolled into the previous section
        else if (counter > 1 && pagetop < sectionTops[counter - 1]) {
            counter--;
            console.log(`scrolling up ${counter}`);
        }

        //if we scrolled into a new section. if counter is different from prevCounter
        //!kinda resets the animation, whenever user goes back to a section?
        if (counter != prevCounter) {
            // do stuff to the page here
            onSectionChange();
        
            console.log(`do something for section ${counter}`);
            // resets the counter for the next section...
            prevCounter = counter;
        }
    
    }); //window scroll event ends here

    //what happens if the user resizes the window
    window.addEventListener('resize', function () {
        // console.log(window.innerWidth);

        //timesout when half a second occurs, once the user stops scrolling, it waits half a sec and outputs that screen size if the user hasnt scrolled since
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function () {

            // console.log(window.innerWidth);
            resetPagePosition();

        }, 500);
    });

    //resets sectionTops back to empty array
    //needed bc if the window is resized, needs to recalculate everything in the page
    function resetPagePosition() {
        sectionTops = [];
        sections.forEach(function (eachSection) {
            sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
        });

        //changes the counter to the correct number, based on how far down the page has been scrolled. 
        const pagePosition = window.scrollY + sectionTops[0] + 10;
        counter = 0;
        sectionTops.forEach(function (eachSection) { 
            if (pagePosition > eachSection) { counter++; }
        });
        console.log(`counter is now ${counter}`);

        onSectionChange();
    }

    function onSectionChange() {
        //changes the class of the body of the page, like changing colors
        //can't start id or class tags with numbers, why there's a prefix
        const myStyle = `bgcolor${counter}`;
                document.querySelector('body').className = myStyle;
    
                //changes the header on top of each section
                switch(counter){
                    case 1: headerP.innerHTML = "The first section is on the page"; break;
                    case 2: headerP.innerHTML = "The second section is on the page"; break;
                    case 3: headerP.innerHTML = "The third section is on the page"; break;
                    case 4: headerP.innerHTML = "The fourth section is on the page"; break;
                    case 5: headerP.innerHTML = "The fifth section is on the page"; break;
                    default: headerP.innerHTML = "Ooops something went wrong!"; break;
                }
    
                // Change classes on the section...
                for( const eachPost of sections){
                    eachPost.className = 'offscreen';
                }
                document.querySelector(`#section0${counter}`).className = 'onscreen';
    }

    
    

}); //script ends here