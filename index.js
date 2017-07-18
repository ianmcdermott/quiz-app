/////// VARIABLES ///////  

let currentQuestion = 0;
let nextQuestion = false;
let currentScore = 0;
let outcomes = [];
let randQuestions = [];
let clickCount = 0;
let highlightOn = true;
//Array to hold player's answers
const PLAYER_ANSWERS = [];
 
const INFO = [
  {question:  "Which description sounds closest to De Stijl art?",
   answer:    ["Photorealistic representation",
               "Geometric abstraction, hard lines, primary colors",
               "Pop culture images with a graphic quality",
               "Dreamlike imagery" ],
   correctIndex: 1 
  },

  {question:      "Name artistic some influences of De Stilj.",
    answer:      ["Bauhaus, Suprematism, and Russian Constructivism",
              "Rococo, Neoclassicism",
              "Surrealism, Hyperrealism, Magical Realism",
              "Romanticism, Symbolism, Impressionism"],
    correctIndex: 0},
   
  {question:     "What years did the De Stijl movement take place?",
    answer:     ["1802-1853 BCE",
             "1917-1931 BCE",
             "1950-1972 BCE",
             "1642-1683 BCE"],
    correctIndex: 1},
   
  {question:    "Who were the founders of the De Stijl movement?",
   answer:     ["Donatello, Leonardo, Michelangelo, and Raphael",
                "Pablo Picasso, Henri Matisse, and Georges Braque",
                "William Blake and Samuel Palmer", 
                "Theo van Doesburg, Piet Mondrian, and Gerrit Reitveld."],
   correctIndex : 3},
   
  {question:      "Where was the De Stijl movement founded?",
   answer:       ["The Netherlands",
              "The United States",
              "Russia",
              "Hungary"],
   correctIndex : 0},
   
  {question      :  "The artistic philosophy that formed a basis for the De Stijl movement’s work is known as:", 
   answer:       ["neoplasticism",
              "neoplatonism",
              "neologism",
              "nepotism"],
   correctIndex : 0},
   
  {question:       "Name a medium utilized in the De Stijl movement.",
   answer:        ["Film",
               "Music",
               "Furniture Design",
               "Dance"],
   correctIndex : 2},
   
  {question:    "Which sounds most like a De Stijl color palette?",
   answer:    ["Neon Pink, orange and yellow",
            "Red, Yellow, Blue, Black",
            "Purple, Green, Orange",
            "Monochromatic Purple"],
   correctIndex:1},
   
  {question:    "Name a building that follows De Stijl Principles.",
   answer:     ["The Parthenon",
            "The White House",
            "The Rietveld Schröder House",
            "The House of the Rising Sun"],
   correctIndex:2},
   
  {question:    "The English translation of “De Stijl” is:",
   answer:     ["Be Still",
            "The Style",
            "Of Strigil",
            "Pig Sty"],
   correctIndex:1}
];


/////// Processing ///////

function randomizeQuestions(questionArray){
  //Randomize the items in the INFO object returns a new array
  //Makes question order different each time user takes quiz
  var currentIndex = questionArray.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = questionArray[currentIndex];
    questionArray[currentIndex] = questionArray[randomIndex];
    questionArray[randomIndex] = temporaryValue;
  }
} 

function compareAnswer(playerAnswer, correctAnswer){
  //Compares player's answer to correct answer and spits out Boolean
    if(playerAnswer === correctAnswer){
      return true;
      } else {
      return false;
     }
}

function updateQandA(index){
  //function that updates displayed questions/answers 
  let question = INFO[index].question; 
  let answer = [];
  //gather all answers from object and put in answer array
  for(let i = 0; i < 4; i++){
    answer[i] = INFO[index].answer[i];
  }
  //Add question to question section
  $(".js-question").html(`<p>${question}</p>`);
  
  //add answers to each bullet
  for(let i = 0; i < 4; i++){
    let answerItem = "answer-"+(i+1);
    $(`label[for=${answerItem}]`).html(` ${answer[i]}`);
  }
}

function resetQuestions(){
  //Handles all resets after Try Again Button is clicked
  //Clear most global variables
  PLAYER_ANSWERS.splice(0,PLAYER_ANSWERS.length);
  outcomes = [];
  randQuestions = [];
  randomizeQuestions(INFO);
  clearResults();
  clickCount = 0;
  currentScore = 0;
  currentQuestion = 0;
  $(".current-question-div").html("<p><strong>Current Question <span class='js-current-question'>1</span> || 10</strong></p>");
  $(".submit").html('<button type="submit" value="Submit" role="button" class="submit-btn" aria-pressed="false"><p class="js-submit-text">Submit</p></button>');
  $(".js-current-score").html(currentScore);
  renderCurrentQuestion();
  updateQandA(currentQuestion);
  $(".final-page").css("display", "none" );
  $("input[name='answer']").prop('checked',false);
}

function clearResults(){
   $(".js-result-color").css("background-color", "#fff"); 
   $(".js-results").html("");
}

function processAnswers(userInput){
  PLAYER_ANSWERS.push(userInput);
  outcome = compareAnswer(parseInt(INFO[currentQuestion].correctIndex),
                            PLAYER_ANSWERS[PLAYER_ANSWERS.length-1]-1);
  outcomes.push(outcome);
  updateFeedback(outcome, INFO[currentQuestion].correctIndex);
}


////// BUTTONS ////// 
function tryAgain(){
  //click try again to restart game
  $(".js-try-again").on("click", function(event){

    $(".final-page").animate({top: "-3000px"}, "slow" );
    $(".wrapper").animate({top: "-1425px"} ).animate({top: "-475px"} ).animate({top: "-500px"} );
    resetQuestions();

  }) 
}

function startGame(){
  //Start game function by clicking start button
  $(".js-start-btn").click(event => {
      $(".main-class").css("display", "inherit")
      $(".wrapper").animate({top: "50px"} ).animate({top: "-525px"} ).animate({top: "-500px"} );
      $(".main-class").animate({top: "0px"}, "slow" );
      $(".js-banner").animate({top: "-5%"} ).animate({top: "57%"} ).animate({top: "55%"} );
      randomizeQuestions(INFO);
      updateQandA(currentQuestion);
      $(".js-feedback-div").css("font-size", "50px");
      //show radio buttons
      $("input").css("display", "inline");    
  });
}   

function nextQuestionButton(){
  $(".submit").on("click", ".next-question-btn", function(event){
      $(".answer").css("color" , "#fff");     
      $("input[name='answer']").prop("disabled", false); 

     currentQuestion++;
     if(clickCount < 10){
      
      renderCurrentQuestion();
      $(".submit").html('<button type="submit" value="Submit" role="button" class="submit-btn" aria-pressed="false"><p class="js-submit-text">Submit</p></button>');
      } else {
         clickCount = 0;
         seeResults();
      }
     
      updateQandA(currentQuestion);
      //update Feedback box
      $(".js-feedback-div").css("background-color" , "#fff");
      $(".js-feedback-div").css("color" , "#fff");
      //unhighlight element
      $(".answer").removeClass("highlight");
      $(".answers").css("background-color", "#00f")
      highlightOn = true;
  });
}

function submitButton(){
  //handles clicks on submit button, updates questions, feedback and later moves to feedback section
  let outcome = 0;
  
  $(".submit").on("click", ".submit-btn", event => {
    let activateResults = false;
    event.preventDefault();
    highlightOn = false;  
    
        //get user's choice and add to PLAYER_ANSWERS array
    var userInput = $("input[name='answer']:checked").val();
    if(userInput === undefined){
      submitAnswerMessage();
    } else {
      //Update Submit Button to Next Question/See Results Button
      if(clickCount < 9){
        $(".submit").html('<button type="button" value="Next Question" role="button" class="next-question-btn" aria-pressed="false"><p class="js-next-question next-question">Next Question</p></button>');
      }else{
        $(".submit").html('<button type="button" value="See Results" role="button" class="next-question-btn" aria-pressed="false"><p class="js-next-question next-question">See<br>Results</p></button>');
        activateResults = true;
      }
      if(activateResults === false){
        processAnswers(userInput);

      }else{       
                  
        processAnswers(userInput);
        currentQuestion = 0;
        renderAllAnswers();
      }      
    }
    clickCount++; 
    $("input[name='answer']").prop('checked',false);
              
  });
}


////// RENDERING //////
function highlightAnswer(correctAnswer){
  //Highlights the correct answer after user submits
  $(".answer").removeClass("highlight");
  $(`.answer-${(correctAnswer+1)}`).addClass("highlight");
}

function updateFeedback(outcome, correctAnswer){
   //function that updates feedback box, colors div with red/blue based on wrong/right 

   //disable other radio buttons from being clickable
   $("input[name='answer']").prop("disabled", true); 

   if(outcome){
     currentScore++;
     renderCorrect(correctAnswer);
  } else if(outcome === false){
     renderIncorrect(correctAnswer);
  }
}    

function submitAnswerMessage(){
  //Adds message if player doesn't submit answer
  $(".js-feedback-div").css("background-color" , "#ff0");
  $(".js-feedback-div").css("color" , "#000");
  $(".js-feedback-div").html("<p>Please make a selection</p>");
}

function renderCorrect(correctAnswer){
  //handles render when user answer is correct
  $("input[name='answer']").prop('checked',false);
  $(".js-feedback-div").css("background-color" , "#00f");
  $(".js-feedback-div").css("color" , "#fff");
  $(".js-feedback-div").html(`Correct Answer:<br>${correctAnswer+1}.`);
  $(".answers").css("background-color" , "#ff0"); 
  $(".answer").css("color" , "#ff0");     
  $(".js-current-score").html(currentScore);
  $(".answer").removeClass("highlight");
  highlightAnswer(correctAnswer);
}

function renderIncorrect(correctAnswer){
  //handles render when user answer is incorrect
  $("input[name='answer']").prop('checked',false);
  $(".answers").css("background-color" , "#f00");
  $(".js-feedback-div").css("background-color" , "#f00");
  $(".js-feedback-div").css("color" , "#fff");
  $(".js-feedback-div").html(`Correct Answer:<br>${correctAnswer+1}.`);
  $(".answer").css("color" , "#f00");     
  $(".answer").removeClass("highlight");
  $(`.answer-${(correctAnswer+1)}`).addClass("highlight"); 
}

 function renderCurrentQuestion(){
  //renders the current question in lower div
    if(currentQuestion <= 10){
      $(".js-current-question").html(currentQuestion+1);
    }else {
      $(".js-current-question").html(currentQuestion);
    }
}

function renderAllAnswers(){
    //function that spits out wright/wrong divs at the end
    //for each .js-result-color div, update its color according to outcomes
    $(".js-result-color").each(function(index){
      if(outcomes[index]){
        $(this).css("background-color", "#00f"); 
      } 
      else{ 
        $(this).css("background-color", "#f00");
      }
    });
    
     $(".js-results").each(function(index){
      $(this).html(`<p><strong>Question:</strong> ${INFO[index].question}</p><p><strong>Correct Answer:</strong> ${INFO[index].answer[INFO[index].correctIndex]}</p>`);
    });
}    

function seeResults(){
  $(".current-question-div").html('<p>RESULTS</p>');
  $(".final-page").animate({top: "0px"}, "1000" );
  $(".wrapper").animate({top: "-500px"}).animate({top: "-1400px"}).animate({top: "-1375px"});
  $(".final-page").css("display","inherit");
  $("body").css("overflow", "visible");

}

function handleQuiz(){
 startGame();
 nextQuestionButton();
 submitButton();
 tryAgain();
}

$(handleQuiz);








  