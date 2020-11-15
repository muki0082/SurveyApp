
/*** Preview Controller ***/
var previewController = (function(addQCtrl) {

    // Get all survey titles
    var allSurveyTitles = getAllCookies();
    console.log(allSurveyTitles);

    // If any surveys saved/created
    if (allSurveyTitles.length > 0) {

        var html;

        // Add 'None selected' value to the top of the dropDown
        document.querySelector('.survey__list').insertAdjacentHTML('afterbegin', '<option class="survey__name" value="survey__name">None selected</option>');

        for (var i = 0; i < allSurveyTitles.length; i++) {

            // Update the dropdown
            html = `
                <option class="survey__name` + i + `" value="survey__name">%surveyname%</option>
            `;

            html = html.replace('%surveyname%', allSurveyTitles[i]);

            document.querySelector('.survey__list').insertAdjacentHTML('beforeend', html);

            // Add eventListener to every value in the dropDown, to get the selected survey title
            document.querySelector('.survey__name' + i).addEventListener('click', getTitle);

        }

    // If no surveys saved/created
    } else {

        html = `
            <option class="survey__name" value="survey__name">No saved surveys</option>
        `;

        document.querySelector('.survey__list').insertAdjacentHTML('beforeend', html);

    }

    var result = readData('title');
    console.log(result);

    // Get all survey titles in one array
    function getAllCookies() {

        var cookies = [];
    
        if (document.cookie && document.cookie != '') {
            
            var split = document.cookie.split(';');

            for (var i = 0; i < split.length; i++) {

                var name_value = split[i].split("=");
                name_value[0] = name_value[0].replace(/^ /, '');
                cookies.push(name_value[0]);
                
            }

        }
    
        return cookies;
       
    }

    // Read survey data from one cookie, by name
    function readData(name) {

        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        
        return result;

    }

    // Get selected survey title on click from the dropDown
    function getTitle() {

        var e = document.getElementById('survey__list');
        var value = e.options[e.selectedIndex].value;
        var surveyName = e.options[e.selectedIndex].text;

        console.log(surveyName);

    }

    // Popilate survey based on title
    function populateSurvey(surveyTitle) {

        // Ovo iskoristi za f-ju kad se klikne na value iz dropdowna a dodaj sada na vrh none
        // Update surveyTitle and surveyDescription
        // Title already here
        document.querySelector('.survey__title__prev').innerHTML = allSurveyTitles[i];

        // Get surveyDescription and update HTML
        var result = readData(allSurveyTitles[i]);
        document.querySelector('.survey__description__prev').innerHTML = result.dataDescription;

    }
       
})(addQuestionsController);

// Init function???
//previewController.init();