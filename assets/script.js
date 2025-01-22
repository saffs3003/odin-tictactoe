function GameBoard(){

    let board=document.querySelector(".GameBoard");
    if(!board){
        board=document.createElement("div");
        board.classList.add("GameBoard");
        document.body.appendChild(board);

    }
    const gameTable=document.createElement("table");
    board.appendChild(gameTable);

    const size=3;
    let counter=0;

  for (let i = 0; i < size; i++) {
    const row=document.createElement("tr");
    row.setAttribute("RowIndex",i);
    gameTable.appendChild(row);
        for(let j=0;j<size;j++){
            const col=document.createElement("td")
            col.setAttribute("CellIndex",counter);
            row.appendChild(col)
            counter++;

        }
    
  }



}

function Player(name,symbol){

    return {name,symbol}
}

function GameStart(){
    const Startdialog=document.querySelector("#start")
    Startdialog.showModal();
   
  const startGame=document.querySelector("#startbutton");
  startGame.addEventListener("click",()=>{
    const player1name=document.getElementById("player1").value;
    const player2name=document.getElementById("player2").value;
    console.log(player1name)
if(!validate(player1name,player2name)){
    return
}



    const Player1=new Player(player1name,"assets/img/crosses.png")
    const Player2=new Player(player2name,"assets/img/circles.png")
Startdialog.close();
    Game(Player1,Player2)
  })
    
}

function Game(Player1,Player2){
let running=true
  
    let options=["","","","","","","","",""]




const Cells=document.querySelectorAll("td");
let currentPlayer=Player1
Cells.forEach((cell) => {
    cell.addEventListener("click", function () {
        const index = cell.getAttribute("cellindex");
        if (!running || options[index] !== "") {
            return;
        }
        updateCell(this, index, currentPlayer, options);
        checkWinner(options);
    });
});




function updateCell(cell,index,currentPlayer,options){
    const img = document.createElement('img');
    img.src = currentPlayer.symbol;
    
    const Cells=document.querySelectorAll("td");
    options[index]=currentPlayer.symbol;
    console.log(index)
    cell.appendChild(img)
   


}

function changePlayer(){
    

     currentPlayer=currentPlayer===Player1?Player2:Player1;
    const turn=document.querySelector(".turn");
    turn.textContent=`${currentPlayer.name}'s Turn `;
  
   
}
function ResetGame(){
    const Cells=document.querySelectorAll("td");
    const turn = document.querySelector(".turn");
        
            options=["","","","","","","","",""];
    
            Cells.forEach((cell)=>{
                cell.textContent=""
            })
            turn.textContent="  "
        Game();
    }
    
function checkWinner(options) {
    let roundWon = false;
    const status = document.querySelector(".status");
    const WiningPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < WiningPattern.length; i++) {
        const [index1, index2, index3] = WiningPattern[i];
        const cellA = options[index1];
        const cellB = options[index2];
        const cellC = options[index3];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue; // Skip if any cell in the pattern is empty
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        dialog.showModal(); // Modal shows the game info
        status.textContent = `${currentPlayer.name} is the Winner!`;
        running = false; // Stop the game
    } else if (!options.includes("")) {
        dialog.showModal();
        status.textContent = "It's a Draw!";
        running = false; // Stop the game
    } else {
        changePlayer(); // Continue the game
       
    }
}


const ResetButton=document.querySelector(".reset");
ResetButton.addEventListener("click",()=>ResetGame());



const dialog = document.querySelector("#result");
const closeButton = document.querySelector(".close");



// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
  ResetGame();
  GameStart()
});


}

GameBoard();
GameStart();
function validate(player1,player2){
if(!player1.trim() || !player2.trim()){
    nullName=!player1?"player 1":"player 2"
    console.log(nullName)
    alert(`${nullName}'s  is empty`)
    return false
}
else{
    return true
}
}