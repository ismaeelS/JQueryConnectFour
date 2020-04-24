var currentPlayer = 0;
var players = [{name: 'Player One', color: 'blue'},
                {name: 'Player Two', color: 'red'}];
var dropIndices = [5,5,5,5,5,5,5];
var gameOver = false;


function changeh3() {
    $('h3').text(players[currentPlayer].name+" it is your turn, please pick a column to drop your "+players[currentPlayer].color+" chip.");
}

function gameOverScreen(tie = false) {
    if (tie)
        $('h1').text("The game is a tie. Refresh your browser to play again.");
    else
        $('h1').text(players[currentPlayer].name+" has won! Refresh your browser to play again.");

    $('h2').text('');
    $('h3').text('');
}

function checkWin(justPlacedIndex) {
    let column = justPlacedIndex%7;
    let row = Math.floor(justPlacedIndex/7);
    let backgroundToMatch = $('.circle').eq(justPlacedIndex).css('backgroundColor');

    var inARow = 0;
    var currentCircleIndex = justPlacedIndex;

    for (let c = 0; c < 6; c++) {
        currentCircleIndex = column+c*7;
        var currentColor = $('.circle').eq(currentCircleIndex).css('backgroundColor');

        inARow = (currentColor == backgroundToMatch) ? inARow+1 : 0;
        if (inARow >= 4) return true;
    }

    inARow = 0;
    currentCircleIndex = justPlacedIndex;

    for (let r = 0; r < 7; r++) {
        currentCircleIndex = row*7+r;
        var currentColor = $('.circle').eq(currentCircleIndex).css('backgroundColor');

        inARow = (currentColor == backgroundToMatch) ? inARow+1 : 0;
        if (inARow >= 4) return true;
    }
    
    var topLeft = justPlacedIndex;

    while (topLeft > 6) {
        if (topLeft%7 == 0) break;
        topLeft-=8;
    }

    inARow = 0;
    currentCircleIndex = topLeft;

    while (((currentCircleIndex%7 != 0) || (currentCircleIndex == topLeft)) && (currentCircleIndex < 42)) {
        var currentColor = $('.circle').eq(currentCircleIndex).css('backgroundColor');

        inARow = (currentColor == backgroundToMatch) ? inARow+1 : 0;
        if (inARow >= 4) return true;

        currentCircleIndex+=8;
    }

    var bottomLeft = justPlacedIndex;

    while (bottomLeft < 35) {
        if (bottomLeft%7 == 0) break;
        bottomLeft+=6;
    }

    inARow = 0;
    currentCircleIndex = bottomLeft;

    while (((currentCircleIndex%7 != 0) || (currentCircleIndex == bottomLeft)) && (currentCircleIndex >= 0)) {
        var currentColor = $('.circle').eq(currentCircleIndex).css('backgroundColor');

        inARow = (currentColor == backgroundToMatch) ? inARow+1 : 0;
        if (inARow >= 4) return true;

        currentCircleIndex-=6;
    }

    return false;
}

$('.circle').on('click', function (params) {
    if (gameOver) return;

    let currentIndex = $('.circle').index(this);
    let dropIndex = (currentIndex%7)+7*dropIndices[(currentIndex%7)];

    if (dropIndices[(currentIndex%7)] < 0) {
        // no space left in this column
        return;
    }
    dropIndices[(currentIndex%7)]--;

    $('.circle').eq(dropIndex).css('backgroundColor', players[currentPlayer].color);

    var currentPlayerHasWon = checkWin(dropIndex);

    if (currentPlayerHasWon) {
        gameOverScreen();
        gameOver = true;
        return;
    }

    // check if board is full and last player to play didn't win
    if (dropIndices.every(dropIndex => dropIndex === -1)) {
        console.log("board full");
        gameOverScreen(true);
        gameOver = true;
        return;
    }

    currentPlayer = (currentPlayer === 0) ? 1 : 0;
    changeh3();
});

// players[0].name = prompt("Player One: Enter your name, you will be blue");
// players[1].name = prompt("Player Two: Enter your name, you will be blue");

// var circleNumber = 0;
// $('.circle').each(function (index) {
//     $(this).text(circleNumber++);
// })

changeh3();


