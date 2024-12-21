/// <reference path="../../node_modules/@types/p5/global.d.ts" />

const pxSize = 12;
var cols;
var rows;
var snake;
var food;
var gameOver;
var score;

function setup() {
    background(0);
    frameRate(8);
    createCanvas(400, 400);
    cols = floor(width / pxSize);
    rows = floor(height / pxSize);
    gameOver = false;
    score = new Score;
    restartGame();
}

function draw() {
    scale(pxSize);
    noStroke();
    gameOver = snake.isItGameOver();

    if (gameOver == false) {
        background(0);
        food.render();
        snake.render();

        if (snake.ateFood(food)) {
            food.newFood(snake);
            score.currentScore++;
        }
        snake.update();

    } else {
        if (score.currentScore > score.highestScore) {
            score.highestScore = score.currentScore;
        }
        restartGame();
    }
}

function keyPressed() {
    // arrows or WASD
    if (keyCode == UP_ARROW || keyCode == 87) {
        snake.setDir(0, -1);
    } else if (keyCode == DOWN_ARROW || keyCode == 83) {
        snake.setDir(0, 1);
    } else if (keyCode == LEFT_ARROW || keyCode == 65) {
        snake.setDir(-1, 0);
    } else if (keyCode == RIGHT_ARROW || keyCode == 68) {
        snake.setDir(1, 0);
    } else if (keyCode == ENTER) {
        gameOver = false;
    }
}

function restartGame() {
    if (gameOver == true) {
        background(255, 0, 0);
        strokeWeight(1);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(5);
        textStyle(BOLD);
        text("GAME OVER", cols / 2, rows / 2.25);
        textSize(2);
        textStyle(NORMAL);
        text("HIGHSCORE " + String(score.highestScore), cols / 2, rows / 1.75);
        textSize(1.25);
        text("Press ENTER to try again...", cols / 2, rows / 1.5);
        keyPressed();
        redraw();
    }

    if (gameOver == false) {
        background(0);
        snake = new Snake;
        food = new Food;
        validateFoodSpawnLocation(snake, food);
        redraw();
    }
}

function validateFoodSpawnLocation(snake, food) {
    let xArray = [];
    let yArray = [];
    let isXinSnakeBody = true;
    let isYinSnakeBody = true;

    while (isXinSnakeBody || isYinSnakeBody) {
        for (var i = 0; snake.body.length - 1; i++) {
            xArray.push(snake.body[i].x == food.x);
            yArray.push(snake.body[i].y == food.y);
        }
        if (xArray.includes(true)) {
            food.x = floor(random(cols));
            xArray = [];
        } else {
            isXinSnakeBody = false;
        }

        if (yArray.includes(true)) {
            food.y = floor(random(rows));
            yArray = [];
        } else {
            isYinSnakeBody = false;
        }
    }
}

