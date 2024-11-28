
//picks computer Move randomly
function computerMove(){
  const randomNum = Math.random();
  let compMove='';

  if(randomNum<=(1/3)){
    compMove='rock';
  } else if(randomNum>(1/3) && randomNum<=(2/3)) {
    compMove='paper';
  }else if(randomNum>(2/3) && randomNum<=1){
    compMove='scissors';
  }
  return compMove;
}

//get the score stored on local storage (if nothing is stored set score to 0)
let score= JSON.parse(localStorage.getItem('score'))||{
  WIN: 0,
  TIE: 0,
  LOSE: 0
};

/*takes player move as a parameter and compare to compMove then updates and store the score to local storage
*/
function playGame(playerMove){
  const compMove=computerMove();

  if((playerMove === 'rock' && compMove==='rock')||(playerMove==='paper' && compMove==='paper')||(playerMove==='scissors' && compMove==='scissors')){
    score.TIE +=1;
    document.querySelector('.js-result-display')
        .innerHTML=`Tie.`;
  }
  else if((playerMove === 'rock' && compMove==='paper')||(playerMove==='paper' && compMove==='scissors')||(playerMove==='scissors' && compMove==='rock')){
    score.LOSE +=1;
    document.querySelector('.js-result-display')
        .innerHTML=`You lose.`;
  }
  else if((playerMove === 'rock' && compMove==='scissors')||(playerMove==='paper' && compMove==='rock')||(playerMove==='scissors' && compMove==='paper')){
    score.WIN +=1;
    document.querySelector('.js-result-display')
        .innerHTML=`You win.`;
  }

  //generate HTML to display player and computer moves
   htmlGenerator(compMove, playerMove);

   //displays the score
   scoreHTMLUpdate();

  //store the scores in local storage so that it will not be lost on referesh
  localStorage.setItem('score',JSON.stringify(score));
}

/*takes the compMove and player move as arguments and update the moves display*/
function htmlGenerator(compMove, playerMove){
  //get the div elements that will display the html
  document.querySelector('.js-moves-display')
    .innerHTML=`
  You 
  <img src="Images/${playerMove}-emoji.png" class="move-display-images">
  <img src="Images/${compMove}-emoji.png" class="move-display-images">
  Computer
  `;
}

//resets the score object to zero
function reset(){
  score={
    WIN: 0,
    TIE: 0,
    LOSE: 0
  }
  scoreHTMLUpdate();
}

//displays recent score
function scoreHTMLUpdate(){
  document.querySelector('.js-score-display')
    .innerHTML = `Wins: ${score.WIN} Loses: ${score.LOSE} Ties: ${score.TIE}`;
}