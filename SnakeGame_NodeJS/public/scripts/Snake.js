class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xDirection = 1;
        this.yDirection = 0;
        this.size = 0;
        this.body = [];
    }

    direction(x, y) {
        this.xDirection = x;
        this.yDirection = y;
    }

    show() {
        fill(255);
        for (var i = 0; i < this.body.length; i++) {
            rect(this.body[i].x, this.body[i].y, pixelSize, pixelSize)
        }
        rect(this.x, this.y, pixelSize, pixelSize);
    }

    update() {
        for (var i = 0; i < this.body.length - 1; i++) {
            this.body[i] = this.body[i + 1];
        }

        if (this.size >= 1) {
            this.body[this.size - 1] = createVector(this.x, this.y);
        }

        this.x = this.x + this.xDirection * pixelSize;
        this.y = this.y + this.yDirection * pixelSize;
        this.x = constrain(this.x, 0, width - pixelSize);
        this.y = constrain(this.y, 0, height - pixelSize);
    }

    ateFood(food) {
        var distance = dist(this.x, this.y, food.x, food.y);

        if (distance < 1) {
            this.size++;
            return true;
        } else {
            return false;
        }
    }

}

