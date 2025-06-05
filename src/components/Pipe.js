export class Pipe {
    constructor(x, w, draw) {
        this.centerX = x;
        this.w = w;
        this.h = 480 - 150;
        this.vx = -1;
        this.type = 'pipe';
        this.coin = true;
        this.centerY = this.randomIntFromInterval(70, 220);
        this.draw = draw;
    }

    update() {
        this.centerX += this.vx;
        if (this.centerX <= 0 - this.w) {
            this.respawn();
        }
    }

    render() {
        if (this.coin) {
            this.draw.circle(
                this.centerX + this.w / 2 - 5,
                this.centerY - 5,
                5,
                'Gold',
            );
        }
        this.draw.rect(this.centerX, 0, this.w, this.centerY - 50, '#8ED6FF');
        this.draw.rect(
            this.centerX,
            this.centerY + 50,
            this.w,
            this.h - this.centerY,
            '#8ED6FF',
        );
    }

    respawn() {
        this.centerY = this.randomIntFromInterval(70, 220);
        this.centerX = 320 - this.w + 160;
        this.coin = true;
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
