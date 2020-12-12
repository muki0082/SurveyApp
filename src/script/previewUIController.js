
/*** Preview UI Controller ***/
var previewUIController = (function() {

    return {
        test: function() {
            console.log('yo');
        },

        // TO - DO: copied from uiController.js - need to update it to be used for preview
        // Populate HTML based on the data from the previewContoller
        previewSurvey: function(obj) {
            console.log(obj);

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

        }
    }

})();