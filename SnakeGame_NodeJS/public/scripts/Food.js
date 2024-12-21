class Food {
    constructor() {
        this.x = floor(random(cols));
        this.y = floor(random(rows));
    }

    render() {
        fill(255, 0, 0);
        rect(this.x, this.y, 1, 1);
    }

    newFood() {
        this.x = floor(random(cols));
        this.y = floor(random(rows));
    }
}

