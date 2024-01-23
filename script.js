// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //


    // Display the current date in the header of the page
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));
    // Also display the current time in a 12-hour format with AM/PM
    var currentTime = dayjs().format('h:mm A'); // 'h' for hour, 'mm' for minutes, 'A' for AM/PM
    $('<p>').text(currentTime).appendTo('#currentDay');

    // Function to update the time block classes
    function updateTimeBlockClasses() {
        var currentHour = dayjs().hour(); // gets the current hour using Day.js
        console.log("The current hour is: " + currentHour); // internal - so I can check what currentHour is set to in the console log
        $('.time-block').each(function() {
            var blockHour = parseInt($(this).attr('id').replace('hour-', ''));
            if (blockHour < currentHour) {
                $(this).removeClass('future present').addClass('past'); 
            } else if (blockHour === currentHour) {
                $(this).removeClass('past future').addClass('present');
            } else {
                $(this).removeClass('past present').addClass('future');
            }
        });
    }

    // Call the function to update the classes initially
    updateTimeBlockClasses();

    // Set up an interval to run the function every 60 seconds to keep the classes/colors updated
    setInterval(updateTimeBlockClasses, 60000); // every 60 seconds

    
  });
  