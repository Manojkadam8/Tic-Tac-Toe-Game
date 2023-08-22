let gamecells=document.querySelectorAll(".cell");
let player1=document.querySelector("#player1");
let player2=document.querySelector("#player2");
let restartbtn=document.querySelector("#btn");
let changelabel=document.querySelector(".turn");

let winnerlabel=document.querySelector(".winnerlabel");

let gamesound = new Audio("Sound-effect/music.mp3");
let gameoversound = new Audio("Sound-effect/Gameover.mp3");
let turnsound = new Audio("Sound-effect/turn.mp3");

//Making variables 

let currentplayer='X';
let nextplayer='O';
let playerturn=currentplayer;

player1.textContent=`Player 1: ${currentplayer}`;
player2.textContent=`Player 2: ${nextplayer}`;
changelabel.textContent=`Player 1: ${playerturn}`;
let startgame=()=>{
    //    gamesound.play();
    gamecells.forEach(cell => {
        cell.addEventListener("click",handles)
           
           
        });
   

}

// to handle all functions

let handles=(e)=>{
    if(e.target.textContent===''){
        e.target.textContent=playerturn;
        if(checkwin()){
            gamesound.pause();
            gameoversound.play();
            clearInterval(intervalID);
          
            console.log(`${playerturn} is winner`);
            diasblegame();
            // winlabel();
            setTimeout(winplayer,1000);
            // winplayer();
        }
        else if(checktie()){
            gamesound.pause();
            gameoversound.play();
            clearInterval(intervalID);
           
            console.log(`Game is Tie`);
            diasblegame();
            winlabel();
            winnerlabel.textContent='Game is Tie';
        }
        else{
           
            changeturn();
            // changeturntimeout();
            resetcountdown();
          
            turnsound.play();

        }
        
    }
}

//change player turn

let changeturn=()=>{
    if(playerturn===currentplayer){
        playerturn=nextplayer;
      
        changelabel.textContent=`Player 2: ${playerturn}`;

        console.log(`if state Player 2: ${playerturn}`);
    }else{
        playerturn=currentplayer;
       
        changelabel.textContent=`Player 1: ${playerturn}`;
        console.log(` else Player 1: ${playerturn}`);
    }
}

// check win
let checkwin=()=>{
    let winningconditions=[
        
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i= 0; i < winningconditions.length; i++) {
           const [pos1,pos2,pos3]=winningconditions[i];
           if (gamecells[pos1].textContent!=='' &&
            gamecells[pos1].textContent===gamecells[pos2].textContent && 
            gamecells[pos2].textContent===gamecells[pos3].textContent) {
            return true;
           }
          
        }
        return false;
}

// check tie

let checktie=()=>{
    let emptycellcount=0;
    gamecells.forEach(cell =>{
        if(cell.textContent===''){
            emptycellcount++;
            // console.log(emptycellcount);
        }

    });
    return emptycellcount===0&&!checkwin();
}

// function to diasble board


let diasblegame=()=>{
    gamecells.forEach(cell => {
        cell.removeEventListener("click",handles);
           cell.classList.add('diasble');
           
        });
   

}


// function to restart game

let restartgame = ()=> {
    gamecells.forEach(cell => {
        cell.textContent = '';
        winnerlabel.classList.add('display-none');
        cell.classList.remove("diasble");
        playerturn=currentplayer;
        changelabel.textContent=`Player 1: ${playerturn}`;
        console.log(` restart Player 1: ${playerturn}`);

        

    });
    resetcountdown();
    startgame();
}

// button to restart game
restartbtn.addEventListener('click',restartgame);

// change player turn label

// const changeplayerlabel=()=>{
//     if()
// }
startgame();


// making countdown timer

var progressbar=document.querySelector("#progress");
let radius= progressbar.r.baseVal.value;
let circumference = radius*2*Math.PI;
progressbar.setAttribute("stroke-dasharray", circumference );
var countdowntime = 0;
var intervalID;

let istimeleft=()=>{
    return countdowntime > -1;
}


function setprogress(percent){
    progressbar.setAttribute("stroke-dashoffset", circumference - (percent / 30) * circumference);
    document.getElementById("time").textContent=percent;
    // console.log( circumference - (percent/30) * circumference);
}

// let stopcountdown=()=>{
//     countdowntime=-1;
// }
let countdown=()=>{
     intervalID = setInterval(()=>{
        if(istimeleft()){
            let remtime=countdowntime--;
            setprogress(remtime);
            

console.log(countdowntime);
        }else{
            

            console.log("timeout");
                if(playerturn===currentplayer){
                    playerturn=nextplayer;
                  
                    changelabel.textContent=`Player 2: ${playerturn}`;
            
                    console.log(`if state Player 2: ${playerturn}`);
                     
                }else{
                    playerturn=currentplayer;
                   
                    changelabel.textContent=`Player 1: ${playerturn}`;
                    console.log(` else Player 1: ${playerturn}`);
                }
            
                resetcountdown();
        }



    },1000);

// console.log(radius);
// console.log(circumference);

   
}

// reset countdown function 
function resetcountdown(){
    clearInterval(intervalID);
    countdowntime=30;
    countdown(countdowntime);
}


// display win label 


let winlabel=()=>{
    console.log("win label");
    winnerlabel.classList.remove('display-none');
    
}

let winplayer=()=>{
    winlabel();
    if(playerturn == "X"){
        winnerlabel.textContent=` Player 1 is winner`;
    }
    if(playerturn=="O"){
        winnerlabel.textContent=` Player 2 is winner`;
    }
}
