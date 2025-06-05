export class BottomBar {
    constructor(x, y, r, draw) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = -1;
        this.name = 'BottomBar';
        this.draw = draw;
    }

    update() {
        this.x += this.vx;
        if (this.x < 0 - this.r) {
            this.respawn();
        }
    }

    render() {
        this.draw.rect(this.x, this.y, this.r, 100, '#D2691E');
        for (let i = 0; i < 10; i++) {
            this.draw.semiCircle(this.x + i * (this.r / 9), this.y, 20, '#050');
        }
    }

    respawn() {
        this.x = 320 - 1;
    }
}
