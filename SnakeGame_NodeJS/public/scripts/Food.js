class Food {

    constructor() {
        this.xMax = floor(width / pixelSize);
        this.yMax = floor(height / pixelSize);
        this.x = floor(random() * this.xMax) * pixelSize;
        this.y = floor(random() * this.yMax) * pixelSize;
    }

    show() {
        fill(255, 0, 0);
        rect(this.x, this.y, pixelSize, pixelSize);
    }

    newFood() {
        this.x = floor(random() * this.xMax) * pixelSize;
        this.y = floor(random() * this.yMax) * pixelSize;
    }
}
