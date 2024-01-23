// Function to update the time block classes
function updateTimeBlockClasses() {
    var currentHour = dayjs().hour(); // Gets the current hour using Day.js
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

// Function to clear all events from the schedule
function clearAllEvents() {
    // It loops through each time block from 9AM to 5PM, clears the associated data from each local storage, and resets the content of the textarea elements.
    for (var hour = 9; hour <= 17; hour++) {
        localStorage.removeItem('hour-' + hour);
        $('#hour-' + hour).find('.description').val(''); // Clears the textareas
    }
}

// The main jQuery ready function for all code that interacts with the DOM
$(function () {
    // Display the current date in the header of the page
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));

    // Click event for 'clear all events' button
    $('#clearEvents').on('click', function (){
        clearAllEvents();
    });

    // Click event for save buttons
    $('.saveBtn').on('click', function() {
        // 'this' refers to the button that was clicked
        var hourId = $(this).parent().attr('id'); // Get the 'hour-x' id of the containing time-block
        var eventText = $(this).siblings('.description').val(); // Get the user input from the sibling textarea element
        localStorage.setItem(hourId, eventText); // Save the user input in local storage
    });

    // Retrieve and display saved user input from local storage
    $('.time-block').each(function() {
        var hourId = $(this).attr('id'); // Get the 'hour-x' id of the time-block
        var savedEvent = localStorage.getItem(hourId); // Get the saved user input from local storage
        if (savedEvent) {
            $(this).find('.description').val(savedEvent); // If there is a saved event, set the value of the textarea to the saved user input
        }
        
    });

    // Initial call to update the time block classes
    updateTimeBlockClasses();

    // Set up an interval to run the updateTimeBlockClasses function every 60 seconds to keep the classes/colors updated
    setInterval(function() {
        updateTimeBlockClasses();
    }, 60000); // Every 60 seconds
  });
  