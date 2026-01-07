let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newGameBtn=document.querySelector("#newGame");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let count = 0; // to track draw
let turnO=true;//playerX,playerY

const winPatterns =[
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8], 
];

const resetGame=()=>{
  turnO=true;
  enableBoxes() ;
  msgcontainer.classList.add("hide");
}


boxes.forEach((box)=>{
  box.addEventListener("click",()=>{
   if(turnO){//player O turn
    box.innerText="O";
    turnO=false;// SHIFT TO NEXT PLAYER TURN 
   }else{
    box.innerText="X"; //PLAYER O TURN 
    turnO=true; // TURNS TO NEXT PLAYER
   }

   box.disabled=true; // items will be kept there and another will be filled
   count++;

   let isWinner=checkWinner();

   if(count===9&& !isWinner){
    gameDraw();
   }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes=()=>{
  for (let box of boxes){
    box.disabled=true;
  }
};

const enableBoxes=()=>{
  for(let box of boxes){
    box.disabled=false;
    box.innerText="";
  }
};

const showWinner = (winner)=>{
  msg.innerText=`Congratulations, Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};


const checkWinner=()=>{
  for(let pattern of winPatterns){
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val !="" && pos2Val !="" && pos3Val!=""){
      if(pos1Val===pos2Val && pos2Val===pos3Val){
        showWinner(pos1Val);
        return true;
      }
    }
  }
}
newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);