/**
Założenia gry:
--------------
1. Plansza gry ma rozmiary 10x10 pól,
2. Mario porusza się w jednym z czterech kierunków: góra, dół, lewo, prawo,
3. Gdy Mario uderzy w ścianę, następuje koniec gry,
4. Na planszy obecna jest moneta. Gdy Mario ją zbierze, umieszczana jest 
   kolejna, na losowym polu.
**/

$(document).ready(function() {
    var marioX = 0, marioY = 0;  // wyjściowa pozycja Mario
    var mapWidth = 10; mapHeight = 10;  // rozmiar mapy
    var direction = "right";  // kierunek poruszania się Mario
    var score = 0; // punkty w grze

    // wyliczenie numeru komórki na podst. koordynatów x, y
    function calculatePosition(x, y) {
        return $("#board div").eq(x + y * 10);
    }   

    // dodaje monetę
    function addCoin() {
        var x = Math.floor(Math.random() * 10);
        var y = Math.floor(Math.random() * 10);
        $("#board div").removeClass("coin");
        return calculatePosition(x, y).addClass("coin");
    }

    // pokazuje Mario
    function showMario() {
        $("#board div").removeClass("mario");
        return calculatePosition(marioX, marioY).addClass("mario");
    } 

    // sprawdzamy, czy nie uderzył w ścianę
    function checkBorder() {
        if ((marioX < 0) || (marioX > mapWidth) || 
                (marioY < 0) || (marioY > mapHeight)) {
            gameOver();
        }
    }

    // sprawdzamy, czy zebrał monetę
    function checkCoin() {
        var actualPosition = calculatePosition(marioX, marioY);
        if(actualPosition.hasClass("coin")) {
            score++;
            $("#score").html("<h1>Wynik: " + score + "</h1>");
            addCoin();
        }
    }

    // Game Over
    function gameOver() {
        clearInterval(gameHandler);
        $("#board div").removeClass("mario");
        $("#board div").removeClass("coin");
        $("#board").hide("fast", function() {
            $("#game-over").slideDown();
        });
    }

    // modyfikujemy pozycję Mario zależnie od kierunku, w którym się porusza.
    function moveMario() {
        switch(direction) {
            case "right":
                marioX++;
                break;
            case "left":
                marioX--;
                break;
            case "up":
                marioY--;
                break;
            case "down":
                marioY++;
                break;
        }
        checkBorder();
        checkCoin();
        showMario();
    }

    // Mario, ruszaj!
    showMario();  // pokaż Mario na wyjściowej pozycji
    addCoin();  // wylosuj pierwszą monetę
    var gameHandler = setInterval(moveMario, 250);  // ruszaj!

    // reagujemy na klawisze strzałek
    $(document).keydown(function(event) {
        var keyPressed = event.which;
        switch(keyPressed) {
            case 37:
                direction = "left";
                break;
            case 38:
                direction = "up";
                break;
            case 39:
                direction = "right";
                break;
            case 40:
                direction = "down";
                break;
            case 27:
                gameOver();
                break;
        }
    });
});
