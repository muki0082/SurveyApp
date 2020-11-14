
// Set event listener to go on the next page - start the Survey
document.querySelector('.add__btn').addEventListener('click', startSurvey);

// Start Survey Function
function startSurvey() {

    // Get title if set
    var surveyTitle = document.querySelector('.survey__title').value;

    // Go to the next page and forward the title, if set
    window.location.href = 'create_survey.html?' + surveyTitle;
}