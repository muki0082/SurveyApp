
/*** App Controller ***/
var controller = (function(addQCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();

    // Set Event listeners
    var setupEventListeners = function() {

        // Add question button and Enter key
        document.querySelector(DOM.surveyButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }

        });

        // Submit survey
        document.querySelector(DOM.submitBtn).addEventListener('click', submitSurvey);

    }

    // Add new question
    var ctrlAddItem = function() {

        var input, newItem;

        input = UICtrl.getInput();
        
        // Clear input for questions and reset the drop down
        document.querySelector(DOM.question).value = '';
        document.querySelector(DOM.selectDropdown).selectedIndex = '0';

        newItem = addQCtrl.addItem(input.question, input.type);

        UICtrl.addListItem(newItem);

    }

    // Get Survey Title, Description and submit the Survey
    var submitSurvey = function() {

        var surveyTitle;

        surveyTitle = UICtrl.getTitle();

        newTitle = addQCtrl.addTitle(surveyTitle.title, surveyTitle.description);

        // Get all data for the current Survey
        var allQuestionData = addQCtrl.getData();

        //console.log(allQuestionData);

        var cookieValue = JSON.stringify(allQuestionData);

        saveToCookie(allQuestionData.dataTitle, cookieValue, 1);

        console.log('Survey submitted!');

        window.location.href = 'preview_survey.html';

    }

    function saveToCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    // Init function 
    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    }

})(addQuestionsController, UIController);

// Call Init function to start up the application
controller.init();