/// <reference path="../../node_modules/@types/p5/global.d.ts" />

const pixelSize = 12;
var snake;
var food;

function setup() {
    createCanvas(600, 600);
    frameRate(10);
    snake = new Snake();
    food = new Food();
}

function draw() {
    background(0);
    snake.show();
    food.show();
    snake.update();
    if (snake.ateFood(food)) {
        food.newFood();
    }
}

function keyPressed() {
    if (keyCode == UP_ARROW || keyCode == 87) {
        snake.direction(0, -1);
    } else if (keyCode == DOWN_ARROW || keyCode == 83 ) {
        snake.direction(0, 1);
    } else if (keyCode == LEFT_ARROW || keyCode == 65) {
        snake.direction(-1, 0);
    } else if (keyCode == RIGHT_ARROW || keyCode == 68) {
        snake.direction(1, 0);
    }
}
