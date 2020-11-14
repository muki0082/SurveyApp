
/*** Add questions controller ***/
var addQuestionsController = (function() {

    // Questions, Object Constructor
    var Question = function(id, question, type, answers) {
        this.id = id;
        this.question = question;
        this.type = type;
        this.answers = answers;
    };

    /*** DATA ***/
    // To store questions in an array
    var data = {
        allItems: []
    }

    // To store survey title and description in variables
    var surveyTitle, surveyDescription;

    // Store question
    return {
        addItem: function(question, type) {

            var newItem, ID;

            // Create new unique ID
            if(data.allItems.length > 0) {
                ID = data.allItems[data.allItems.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Store question data
            // Object of the type 'Question'
            newItem = new Question(ID, question, type);

            // Store the data in the array
            data.allItems.push(newItem);

            return newItem;

        },
    
        // Store survey title and description in global variables
        addTitle: function(title, description) {
            surveyTitle = title;
            surveyDescription = description;
            
        },

        // Get questions data, survey title and description
        getData: function(){
            var dataArr = data.allItems;
            var dataTitle = surveyTitle;
            var dataDescription = surveyDescription;

            return {
                dataArr,
                dataTitle,
                dataDescription
            }
        },

        // Testing
        // Call this function in the Console, to test data stored in arrays and variables
        testing: function() {
            console.log('-----------------');
            console.log(data);
            console.log('-----------------');
            console.log(surveyTitle);
            console.log('-----------------');
            console.log(surveyDescription);
            console.log('-----------------');
        }

    }

})();