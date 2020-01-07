//----------------------
// On Load Functions
//----------------------
function diffSelector(){
    FirstGame();
    //$('#mainModal').modal('show');   
}
function FirstGame(){
    document.getElementById("gameScreen").classList.add("visible");
    document.getElementById("gameScreen").classList.remove("invisible");
    document.getElementById("gameScreenBottom").classList.add("visible");
    document.getElementById("gameScreenBottom").classList.remove("invisible");
    document.getElementById("newGameScreen").classList.add("invisible");
    document.getElementById("newGameScreen").classList.remove("visible");
}
//----------------------
// Player Move Functions
//---------------------- 
function AIrandomization(){
    return (Math.floor(Math.random() * 3) + 1);
}
/* Gives a buff to the AI to increase difficulty */
function difficultyBuff(p, a){
    var currentDiff = document.getElementById("diffBtn").innerHTML;
    if(currentDiff == "Difficulty: Easy"){
        winStatusAction(p,a);
    }
    else if(currentDiff == "Difficulty: Medium"){
        if(winStatus(p,a) != 2){
            // Extra Roll
            winStatusAction(p, AIrandomization());
        }
        else{
            winStatusAction(p,a);
        }
    }
    else if(currentDiff == "Difficulty: Hard"){
        if(winStatus(p,a) != 2){
            // Extra Roll
            var eRoll = AIrandomization();
            if(winStatus(p, eRoll) != 2){
                // 2nd Extra Roll
                eRoll = AIrandomization();
                winStatusAction(p, eRoll);
            }
            else{
                winStatusAction(p, eRoll);
            }
        }
        else{
            winStatusAction(p,a);
        }
    }
}
/* Returns the status of winner
   0 = Tie, 1 = player, 2 = AI */
function winStatus(pS, aS){
    var p = parseInt(pS);
    var a = parseInt(aS);
    if(p == a) {
        return 0;
    }
    else if((a+1 == p) || (a == p+2)){
        return 1;
    }
    else if((a == p+1) || a+2 == p){
        return 2;
    }
}
/* Does all actions needed to achieve the status of the winner */
function winStatusAction(pS, aS){
    var p = parseInt(pS);
    var a = parseInt(aS);
    if(p == a) {
        updateBoard(" ", "Tie!", true);
    }
    else if((a+1 == p) || (a == p+2)){
        updateBoard("pScore", "You Win!", false);
    }
    else if((a == p+1) || a+2 == p){
        updateBoard("aiScore", "AI Wins!", false);
    }
    setImages(parseInt(pS), parseInt(aS));
    setProgress();
    isGameOver();
}
/* Updates all of the board labels */
function updateBoard(pointMaker, winText, isTie){
    // Update win Label
    document.getElementById("winLabel").style.visibility="visible";
    document.getElementById("winLabel").innerHTML = winText;
    if(!isTie){
        // Update score label
        var a = parseInt(document.getElementById(pointMaker).innerHTML);
        document.getElementById(pointMaker).innerHTML = a + 1;
    }
}
/* Updates the board's images */
function setImages(p, a){
    var imagePath = "resources/images/" + p + ".png";
    document.getElementById("pIMG").src=imagePath;
    imagePath = "resources/images/" + a + ".png";
    document.getElementById("aiIMG").src=imagePath;
}
/* Updates the progress bars */
function setProgress(){
    var gameWin = 5;
    var p = parseInt(document.getElementById("pScore").innerHTML);
    var a = parseInt(document.getElementById("aiScore").innerHTML);
    var pPer = "width: " + ((p/gameWin)*100) + "%";
    var aPer = "width: " + ((a/gameWin)*100) + "%";
    document.getElementById("pProgressBar").style=pPer;
    document.getElementById("pProgressBar").innerHTML = p + "/5";
    document.getElementById("aiProgressBar").style=aPer;
    document.getElementById("aiProgressBar").innerHTML = a + "/5";
}
//--------------------
// Game Over Functions
//--------------------
function isGameOver(){
    var gameWin = 5;
    var pS = document.getElementById("pScore").innerHTML;
    var aS = document.getElementById("aiScore").innerHTML;
    if(pS == 5){
        toggleDisable(false);
        // Modal saying that player won!
    }
    else if (aS == 5){
        toggleDisable(false);
        // Modal saying that AI won!
    }
}
function toggleDisable(isNewGame){
    // Toggle Player selection buttons
    document.getElementById("rockButton").classList.toggle("disabled");
    document.getElementById("paperButton").classList.toggle("disabled");
    document.getElementById("scissorButton").classList.toggle("disabled");
    // Toggle 'New Game' button & winLabel
    document.getElementById("newGameButton").style.visibility= isNewGame ? "hidden" : "visible";
}
// ----------------
// Button Functions
// ----------------
function startNewGame(){
    var pS = document.getElementById("pScore").innerHTML;
    var aS = document.getElementById("aiScore").innerHTML;
    if(pS == 5 || aS == 5){
        // Reset Scores/Labels
        document.getElementById("aiScore").innerHTML = "0";
        document.getElementById("pScore").innerHTML = "0";
        document.getElementById("countLabel").innerHTML = "0";
        document.getElementById("winLabel").innerHTML = "Press any button to begin";
        setProgress();
        // Set starting Images
        setImages(3, 1);
        // Toggles all buttons
        toggleDisable(true);
    }
}
function imageClick(pSel){
    var pS = document.getElementById("pScore").innerHTML;
    var aS = document.getElementById("aiScore").innerHTML;
    if(pS < 5 && aS < 5){
        document.getElementById("countLabel").innerHTML = parseInt(document.getElementById("countLabel").innerHTML) + 1;
        var aiSel = AIrandomization();
        difficultyBuff(pSel, aiSel);
    }
}
function changeDiff(){
    var currentDiff = document.getElementById("diffBtn").innerHTML;
    var newDiff= "";
    switch(currentDiff){
        case "Difficulty: Easy":
            newDiff = "Difficulty: Medium";
            break;
        case "Difficulty: Medium":
            newDiff = "Difficulty: Hard";
            break;
        case "Difficulty: Hard":
            newDiff = "Difficulty: Easy";
            break;
    }
    document.getElementById("diffBtn").innerHTML = newDiff;
}