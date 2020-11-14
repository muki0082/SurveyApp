
/*** Preview Controller ***/
var previewController = (function(addQCtrl) {

    // Get all survey titles
    var allSurveyTitles = getAllCookies();
    console.log(allSurveyTitles);

    if (allSurveyTitles) {

        var html;

        for (var i = 0; i < allSurveyTitles.length; i++) {

            html = `
                <option class="survey__name" value="survey__name">%surveyname%</option>
            `;

            html = html.replace('%surveyname%', allSurveyTitles[i]);

            document.querySelector('.survey__list').insertAdjacentHTML('beforeend', html);

        }

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

    // Read survey date from one cookie, by name
    function readData(name) {

        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        
        return result;

    }
       
})(addQuestionsController);

// Init function???
//previewController.init();