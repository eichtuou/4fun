class Snake {
    constructor() {
        this.body = [];
        this.body[0] = createVector(0, 0);
        this.xDir = 1;
        this.yDir = 0;
    }

    getHead() {
        let head = this.body[this.body.length - 1].copy();
        return head;
    }

    setDir(x, y) {
        this.xDir = x;
        this.yDir = y;
    }

    render() {
        fill(255);
        for (let i = 0; i < this.body.length; i++) {
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }
    }

    update() {
        let head = this.getHead();
        this.body.shift();
        head.x += this.xDir;
        head.y += this.yDir;
        this.body.push(head);
    }

    grow(head) {
        this.body.push(head);
    }

    ateFood(food) {
        let head = this.getHead()
        let foodDist = dist(head.x, head.y, food.x, food.y);

        if (foodDist < 1) {
            this.grow(head);
            return true;

        } else {
            return false;
        }
    }

    isItGameOver() {
        let head = this.getHead();

        // hit wall
        if (head.x < 0 || head.y < 0 || head.x > cols - 1 || head.y > rows - 1) {
            return true;
        }

        // hit self - only works if body.length > 2
        if (this.body.length > 1) {
            for (let i = 0; i < this.body.length - 1; i++) {
                if (this.body[i].x == head.x && this.body[i].y == head.y) {
                    return true;
                }
            }
        }
        return false;
    }
}

