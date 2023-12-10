const questions = [
    {
        question:"Which is the first character that appears in the Friends intro?",
        answers:[
            {text:"Chandler", correct: false},
            {text:"Monica", correct: false},
            {text:"Rachel", correct: true},
            {text:"Joey", correct: false},
            
        ]
    },
    {
        question:"What is the gift the Ross offered while applying for ugly naked guy's apartment?",
        answers:[
            {text:"Muffins", correct: true},
            {text:"Chocolates", correct: false},
            {text:"Croissants", correct: false},
            {text:"Pizza", correct: false},
            
        ]
    },
    {
        question:"How many sisters did Joey have?",
        answers:[
            {text:"7", correct: true},
            {text:"8", correct: false},
            {text:"5", correct: false},
            {text:"6", correct: false},
            
        ]
    },
    {
        question:"What is Joey's full name?",
        answers:[
            {text:"Joey Blanc Tribbiani", correct: false},
            {text:"Joey Francis Tribbiani", correct: true},
            {text:"Joey Frank Tribbiani", correct: false},
            {text:"Joey Tribbiani Jr.", correct: false},
            
        ]
    },
    {
        question:"Whom did Phoebe actually sleep with instead of Ralph Lauren?",
        answers:[
            {text:"Gunther", correct: false},
            {text:"Paul", correct: false},
            {text:"John", correct: false},
            {text:"Lenny", correct: true},
            
        ]
    },
    {
        question:"What is Chandler Bing's Job?",
        answers:[
            {text:"Statistical Analytics and Data Reconfiguration", correct: true},
            {text:"Statistical Analysis and Data Reconfiguration", correct: false},
            {text:"Statistical Analysis and Data Reconciliation", correct: false},
            {text:"Statistical Analytics and Data Reconciliation", correct: false},
            
        ]
    },
    {
        question:"What was Joey's alternate name?",
        answers:[
            {text:"Keith Adams", correct: false},
            {text:"Ken William", correct: false},
            {text:"Ken Adams", correct: true},
            {text:"Keith William", correct: false},
            
        ]
    },
    {
        question:"Which sister of Joey did Chandler kiss?",
        answers:[
            {text:"Maria Angela", correct: false},
            {text:"Marie Angela", correct: true},
            {text:"Marium Angela", correct: false},
            {text:"Marta Angela", correct: false},
            
        ]
    },
    {
        question:"What ingredient did Ross ask Rachel not to put on pizza while they were breaking up?",
        answers:[
            {text:"Green chillies", correct: false},
            {text:"Bell papers", correct: false},
            {text:"Black olives", correct: true},
            {text:"Chillie flakes", correct: false},
            
        ]
    },
    {
        question:"What was the name of Richard's daughter?",
        answers:[
            {text:"Mitchell", correct: true},
            {text:"Joanna", correct: false},
            {text:"Racquel", correct: false},
            {text:"Lizelle", correct: false},
            
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=> {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =  true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    
    if (score > questions.length/2 & score < questions.length){
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}. Good job!`
    }
    else if( score==questions.length){
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}. Perfect Score!`
    }
    else{
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}. Go stream FRIENDS now!`
    }
    nextButton.innerHTML ="Play Again";
    nextButton.style.display ="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();