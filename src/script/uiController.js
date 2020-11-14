
/*** UI Controller ***/
var UIController = (function() {

    // DOM elements to be used in functions
    var DOMstrings = {
        surveyTitle: '.survey__title',
        surveyDescription: '.survey__description',
        surveyButton: '.add__btn',
        surveyListContainer: '.questions__list',
        question: '.add__question',
        type: '.question__type',
        ansButton: '.add__answer',
        answers: '.answers',
        btnDone: '.btn__done',
        selectDropdown: '.question__type',
        submitBtn: '#submit__btn',
        submitForm: '.submit__form'
    }

    // Get the sruvey title from the URL, forwarded from the landing page
    // Call the function to set the value of the title to the current page
    var surveyTitle = location.search.substring(1);
    surveyTitle = surveyTitle.replace(/%20/g, " ");
    setTitle();

    /*** Functions to be called in this Controller***/

    // Set Survey title 
    function setTitle() {
        document.querySelector(DOMstrings.surveyTitle).value = surveyTitle;
    }

    // Push HTML to the page
    function appendHtml(objId, html, obj, element) {

        // The Submit button
        var submitBtn = document.getElementById('submit__btn');

        // Since appendHtml() is called multiple times, check if the Submit button is visible, and show it (with animation) it if not
        if (window.getComputedStyle(submitBtn).display === 'none') {
            submitBtn.style.display = 'block';
            submitBtn.classList.add('animate');
        } 

        // Update placeholders with real data
        newHtml = html.replace('%Question1%', obj.question);
        newHtml = newHtml.replace(/%1%/g, obj.id);
        
        // Append html - not visible
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        // Animate html appearance
        var divId = '.question__div' + objId;
        
        // TO-DO find better sollution then seeting up the timeout
        setTimeout(animate, 800);
        function animate() {
            document.querySelector(divId).classList.add('animate');
        }

    }

    return {
        // Get question data
        getInput: function() {
            return {
                question: document.querySelector(DOMstrings.question).value,
                type: document.querySelector(DOMstrings.type).value
            };
        },

        // Get Survey title
        getTitle: function() {
            return {
                title: document.querySelector(DOMstrings.surveyTitle).value,
                description: document.querySelector(DOMstrings.surveyDescription).value
            }
        },

        // Add questions to UI
        // Create HTML and append to the page
        addListItem: function(obj) {
            
            var html, newHtml, element;

            var ulId = 'answers' + obj.id;
            
            // ID counter for li elements for answers, inside each ul
            var idCounter = 0; 

            element = DOMstrings.surveyListContainer;

            // Create a different HTML input, for every question type
            // Free text
            if (obj.type === 'free_text') {

                html = `<div class="question__div%1%">`;

                html += `<div class="question__id">Question %1%</div>
                        <label for="q%1%" class="question__text">%Question1%</label><br> 
                        <textarea class="free__text__field" name="q%1%" rows="3" cols="70" placeholder="The answer will go here ..."></textarea>`;
                
                html += `</div>`

                appendHtml(obj.id, html, obj, element);

            } else if (obj.type === 'multiple_choice' || obj.type === 'single__choice') {

                html = `<div class="question__div%1%">`;

                html += 
                    `<div class="question__id">Question %1%</div> <div id="q%1%" class="question__text">%Question1%<BR> </div>`
                
                html += 
                `<ul class="answers" id=` + ulId + `>
                    <li>
                        <input type="text" id="a0" class="answer animate" name="answer" placeholder="Input answer"></br>  
                    </li>
                </ul>
                <div class="choice__buttons">
                    <button class="add__answer" id="add__answer` + obj.id + `">Add another answer</button>
                    <button type=""submit" class="btn__done" id="btn__done` + obj.id + `">Done</button>
                </div>`

                html += `</div>`

                appendHtml(obj.id, html, obj, element);
                document.querySelector('#add__answer' + obj.id).addEventListener('click', addAnswer);
                document.querySelector('#btn__done' + obj.id).addEventListener('click', addAnswrs);

            } 

            // Push answers for multi-choice and single-choice questions to their respective object
            // This is an inside function, since 'obj' cannot be a parameter in addEventListener - Function to be set, not called at that point
            function addAnswrs() {

                var ul = document.getElementById('answers' + obj.id);

                var ansList = ul.getElementsByTagName('li');

                var ansArr = [];

                for (var i = 0; i < ansList.length; i++) {
                    ansArr.push(ul.querySelector('#a' + i).value);
                }

                obj.answers = ansArr;

            }

            // Add answers for multi-choice and single-choice type of a question
            // This is an inside function, since 'obj' cannot be a parameter in addEventListener - Function to be set, not called at that point
            function addAnswer() {

                var html;

                idCounter++;

                html = 
                    `<li>
                        <input type="text" id="a` + idCounter + `" class="answer" name="answer" placeholder="Input answer"></br>
                    </li>`;

                // Append html - not visible
                document.querySelector('#answers' + obj.id).insertAdjacentHTML('beforeend', html);

                // Animate html appearance
                // TO-DO find better sollution then seeting up the timeout
                setTimeout(animate, 800);
                function animate() {
                    var answerId = '#a' + idCounter;

                    // Find parent question__div##, then it's child ul > li > input with id ==  answerId, then animate
                    var answerClass = document.querySelector('#answers' + obj.id);

                    answerClass = answerClass.getElementsByTagName('li')[idCounter];
                    answerClass = answerClass.getElementsByTagName('input')[0];

                    answerClass.classList.add('animate');

                }

            }

        },

        // Get strings to be used in another Controller
        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();