
let savebtn=document.querySelector(".save")
let username=document.querySelector(".username")
let finalscore=document.querySelector(".final-score")
let mostRecentScore=localStorage.getItem('mostRecentScore');
console.log(mostRecentScore);
const maxScores=5;
finalscore.innerText=mostRecentScore;
const highScores=JSON.parse(localStorage.getItem("highScores")) || [];
username.addEventListener("keyup",()=>{

    savebtn.disabled=!username.value;
})
savebtn.addEventListener('click', (e)=>{
    console.log("hihihihih");
    e.preventDefault(); 
    const score={
        score: mostRecentScore,
        name:username.value,
    }
    highScores.push(score);
    highScores.sort((a,b)=>b.score-a.score)
    highScores.splice(5);
   localStorage.setItem("highScores",JSON.stringify(highScores));
   window.location.assign('index.html');
});
