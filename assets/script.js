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

function Game(){
let running=true
  
    let options=["","","","","","","","",""]
const Player1=new Player("saffi","X")
const Player2=new Player("a","O")



const Cells=document.querySelectorAll("td");
let currentPlayer=Player1
Cells.forEach((cell)=>{
    cell.addEventListener("click",function(){
        const index=cell.getAttribute("cellindex")
        if(!running||options[index]!==""){
            return
        }
        updateCell(this,index,currentPlayer,options);
        checkWinner(options,running,currentPlayer)
        
    })
})



function updateCell(cell,index,currentPlayer,options){
    const Cells=document.querySelectorAll("td");
    options[index]=currentPlayer.symbol;
    console.log(index)
    cell.textContent=  `${currentPlayer.symbol}`;
   


}

function changePlayer(){
     currentPlayer=currentPlayer===Player1?Player2:Player1;
    const turn=document.querySelector(".turn");
    turn.textContent=`${currentPlayer.name}'s Turn `;
   
}

function checkWinner(options, running, currentPlayer) {
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

    if (running) {
        // Check for winning patterns
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
            dialog.showModal()
            status.textContent = `${currentPlayer.name} is the Winner!`;
            running = false;
            
        } else if (!options.includes("")) {
            status.textContent = "It's a Draw!";
            running = false;
        } else {
            console.log(options)
            changePlayer();
        }
    }
    return running; // Return the updated running state
}

const ResetButton=document.querySelector(".reset");
ResetButton.addEventListener("click",()=>ResetGame());

function ResetGame(){
const Cells=document.querySelectorAll("td");
    
        options=["","","","","","","","",""];

        Cells.forEach((cell)=>{
            cell.textContent=""
        })
    
}


const dialog = document.querySelector("dialog");
const closeButton = document.querySelector(".close");



// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
  ResetGame();
});


}

GameBoard();
Game();
