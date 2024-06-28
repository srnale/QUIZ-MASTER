console.log("working")
const qn= document.getElementById("Qn");
const choices=document.querySelectorAll(".choice-text")
const counter=document.querySelector(".progress-text")
const score=document.querySelector("#score")
const progressBar=document.querySelector(".progress-bar")
const loader=document.querySelector(".loader")
const game=document.querySelector("#game")
let Score=0;
let currQuestion={};
let accepting=false;
let questionCounter=0;
let availableQuestions=[];
const correctBonus=10;
const maxQuestions=4;

let questions=[];
  fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple').then(Response =>{
    return (Response.json());
   }).then(loadedQns =>{
    
    questions=loadedQns.results.map(loadedqn=>{
        const formattedqn={
question: loadedqn.question
        }
        const answerChoices=[...loadedqn.incorrect_answers];
       
        formattedqn.answer=Math.floor(Math.random()*3)+1;
        answerChoices.splice(formattedqn.answer-1,
            0,
            loadedqn.correct_answer);

        answerChoices.forEach((choice,index)=>{
formattedqn['choice'+(index+1)]=choice;
        })
        
        return formattedqn;
    })
    
   
    play();

   }).catch(err=>{
    console.log(err);
   });

function play(){

    questionCounter=0;
    Score=0;
     availableQuestions=[...questions];
     getNewQuestion();
     loader.classList.add("hidden");
   game.classList.remove("hidden");
 
}

function getNewQuestion(){
    if(questionCounter>=maxQuestions||availableQuestions.length==0){
        return window.location.assign("end.html");
    }

    localStorage.setItem("mostRecentScore",Score);
    
    //increment the counter
    questionCounter++;
    
    // update the progress bar
    progressBar.style.width=`${questionCounter/maxQuestions*100}%`;
    //update the counter text
counter.innerText='Questions '+questionCounter+'/'+maxQuestions;
//generate and get a random question 
    const index=Math.floor(Math.random()*availableQuestions.length);
    currQuestion=availableQuestions[index];
    qn.innerText=currQuestion.question;
    choices.forEach((choice)=>{
        const number=choice.dataset['number'];
        choice.innerText=currQuestion['choice'+number];
       
        })
        availableQuestions.splice(index,1);
        accepting=true;
}

choices.forEach((choice)=>{
   choice.addEventListener("click",(e)=>{
    if(accepting==false){return}
    accepting=false;
    const selectedchoice=e.target;
     const selectedAnswer= selectedchoice.dataset['number'];
     const classToApply=selectedAnswer==currQuestion.answer?"correct":"incorrect";
     if(classToApply=='correct'){
        Score+=correctBonus;
        score.innerText=Score;}
     selectedchoice.parentElement.classList.add(classToApply);
     setTimeout(() => {
        selectedchoice.parentElement.classList.remove(classToApply);
        localStorage.setItem("mostRecentScore",Score);
        getNewQuestion();
     }, 1000);
    
    
   
    })
    })
   