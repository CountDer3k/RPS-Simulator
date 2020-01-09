//----------------------
// On Load Functions
//----------------------
let gameWin = 5;

/* Called when the BODY tag loads on the page
    Does any OnLoad needed actions */
function diffSelector(){
    FirstGame();
}
/* Called when the page loads
    Sets all the views (DIVs) to their starting visible/invisible setting */
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
/* Called on every turn & when difficulty has AI re-roll
    returns a random number between 1 & 3 */
function AIrandomization(){
    return (Math.floor(Math.random() * 3) + 1);
}
/* Called every single turn
    Controls the diffculty of the game. 
    Easy gets 1 roll
    Medium gets 2 rolls
    Hard gets 3 rolls
    A roll is a random roll of which object is chosen.*/
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
/* Called when difficulty is higher than easy
    Returns the status of winner without saying anyone has won.
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
/* Called when player and AI have both chosen their final object
    Does all actions needed to achieve the status of the winner */
function winStatusAction(pS, aS){
    var p = parseInt(pS);
    var a = parseInt(aS);
    if(p == a) {
        updateLabels(" ", "Tie!", true);
    }
    else if((a+1 == p) || (a == p+2)){
        updateLabels("pScore", "You Win!", false);
    }
    else if((a == p+1) || a+2 == p){
        updateLabels("aiScore", "AI Wins!", false);
    }
    setImages(parseInt(pS), parseInt(aS));
    setProgress();
    isGameOver();
}
/* Called every turn
    Updates all of the board labels */
function updateLabels(pointMaker, winText, isTie){
    // Update win Label
    document.getElementById("winLabel").style.visibility="visible";
    document.getElementById("winLabel").innerHTML = winText;
    if(!isTie){
        // Update score label
        var a = parseInt(document.getElementById(pointMaker).innerHTML);
        document.getElementById(pointMaker).innerHTML = a + 1;
    }
}
/* Called every turn
    Updates the board's images */
function setImages(p, a){
    document.getElementById("pIMG").src=`resources/images/${p}.png`;
    document.getElementById("aiIMG").src=`resources/images/${a}.png`;
}
/* Called every turn
    Updates the progress bars based on the player's and ai's scores */
function setProgress(){
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
/* Called at the end of each turn.
    Checks if any player has reached the gameWin score */
function isGameOver(){
    var pS = document.getElementById("pScore").innerHTML;
    var aS = document.getElementById("aiScore").innerHTML;
    if(pS == gameWin){
        toggleDisable(false);
    }
    else if (aS == gameWin){
        toggleDisable(false);
    }
}
/* Called when a new game is begun or when the player's/ai's score reaches the game win score
    toggles disable on player buttons & hides/unhides new game button */
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
/* Called when the 'new game' button is pressed
    clears all of the scores, reenables button pressed & clears images */
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
/* Called by the rock, paper, & scissor buttons
   Handles the player's button click */
function imageClick(pSel){
    var pS = document.getElementById("pScore").innerHTML;
    var aS = document.getElementById("aiScore").innerHTML;
    if(pS < 5 && aS < 5){
        var aiSel = AIrandomization();
        difficultyBuff(pSel, aiSel);
        // Updates a label counting the total number of turns played
        document.getElementById("countLabel").innerHTML = parseInt(document.getElementById("countLabel").innerHTML) + 1;
    }
}
/* Called by the 'difficulty' button being pressed
    Handles changing the difficulty level.*/
function changeDiff(){
    var currentDiff = document.getElementById("diffBtn").innerHTML;
    var newDiff= "Difficulty: ";
    switch(currentDiff){
        case "Difficulty: Easy":
            newDiff = newDiff + "Medium";
            break;
        case "Difficulty: Medium":
            newDiff = newDiff + "Hard";
            break;
        case "Difficulty: Hard":
            newDiff = newDiff + "Easy";
            break;
    }
    document.getElementById("diffBtn").innerHTML = newDiff;
}