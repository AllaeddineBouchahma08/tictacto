let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let scoreNul = document.getElementById("scoreNul");
let switchbtn= document.getElementById("button");




//Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let state = {
  scoreJ1: 0,
  scoreJ2: 0,
  matchNul: 0,

};
//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    state.scoreJ1++
    score1.textContent = state.scoreJ1;
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    state.scoreJ2++
    score2.textContent = state.scoreJ2;
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
  state.matchNul++;
  scoreNul.textContent = state.matchNul;
};

//New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  xTurn=true;

  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  xTurn=true;
  enableButtons();
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
        count=0;
       
      }
    }
     

  }

  
};

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

 
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];


function fill(){
 
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j]=btnRef[i*3+j].innerText;
    }
  }
    
  ;
}

  
function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
let move1;
let move2;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = "O";
        let score = minimax(board,0,false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
        move1=i;
        move2=j;
       
        } 
      }
    }
  }
  
  
  return move1*3+move2;
}

let scores = {
  X: -10,
  O: 10,
  tie: 0,
};



function minimax(board,depth,IsMaximazing) {
  let result= checkWinner();
  if(result!=null)
  {
    if(result=="tie")
    return 0;
    else if(result=="X")
    return -10;
    else 
    return 10;
  }

  if(IsMaximazing)
  {
    let bestScore=-Infinity;


 for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = "O"; 
        let score=minimax(board,depth+1,false);
        board[i][j] = '';
        bestScore=Math.max(bestScore,score);

      }
    }
  }
  return bestScore;
  }
  else
  {
    let bestScore=Infinity;


    for (let i = 0; i < 3; i++) 
    {
       for (let j = 0; j < 3; j++)
        {
         // Is the spot available?
         if (board[i][j] == '') 
         {
           board[i][j] = "X";
           let score=minimax(board,depth+1,true);
           board[i][j] = '';
           bestScore=Math.min(bestScore,score);
   
         }
       }
     }
     return bestScore;

  }
 
}



//Display X/O on click
switchbtn.addEventListener("click", ()=>{
  if(count==0 && xTurn){
  btnRef[0].innerText="O";
  btnRef[0].disabled=true;
  count++;
  xTurn=false;
  }
  else if (count==1 && !xTurn)
  {
  btnRef[0].innerText="";
  btnRef[0].disabled=false;
  count=0;
  xTurn=true;
  }
})



btnRef.forEach((element) => {
  element.addEventListener("click", () => {
  
      //Display X
      if(xTurn==true){}
      element.innerText = "X";
      element.disabled = true;
      count++
      if(count<9){
   
      fill();
      let elemm =bestMove();
      btnRef[elemm].innerText="O";
      btnRef[elemm].disabled=true;
      count++;
      fill();
     
      }
  
    
      winChecker();
    if (count == 9) {
      drawFunction();
    }
    //Check for win on every click
    
  });
});


  
    //Enable Buttons and disable popup on page load
window.onload = enableButtons;