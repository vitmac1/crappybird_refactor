export class Cloud {
    constructor(x, y, draw) {
        this.x = x;
        this.y = y;
        this.r = 30;
        this.col = 'rgba(255,255,255,1)';
        this.type = 'cloud';
        this.vx = -0.1;
        this.remove = false;
        this.draw = draw;
    }

    update() {
        this.x += this.vx;
        if (this.x < 0 - 115) {
            this.respawn();
        }
    }

    render() {
        this.draw.circle(this.x + this.r, this.y + this.r, this.r, this.col);
        this.draw.circle(
            this.x + 55,
            this.y + this.r / 2,
            this.r / 0.88,
            this.col,
        );
        this.draw.circle(this.x + 55, this.y + this.r + 15, this.r, this.col);
        this.draw.circle(this.x + 85, this.y + this.r, this.r, this.col);
    }

    respawn() {
        this.x = Math.floor(Math.random() * this.r * 2) + 320;
        this.y = Math.floor(Math.random() * (480 / 2));
    }
}
