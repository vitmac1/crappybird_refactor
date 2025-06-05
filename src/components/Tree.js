export class Tree {
    constructor(x, y, draw) {
        this.x = x;
        this.y = y;
        this.r = 30;
        this.h = 50;
        this.w = this.r * 2;
        this.vx = -1;
        this.type = 'Tree';
        this.draw = draw;
    }

    update() {
        // update coordinates
        this.x += this.vx;

        if (this.x < 0 - this.r * 2) {
            this.respawn();
        }
    }

    render() {
        this.draw.circle(
            this.x + this.r,
            this.y + this.r - 10,
            this.r,
            'green',
            '#050',
        );
        this.draw.circle(
            this.x + this.r / 2,
            this.y + this.r - 10,
            this.r / 3,
            'rgba(0,0,0,0.08)',
        );
        this.draw.rect(
            this.x + this.r,
            this.y + this.r,
            10,
            this.r,
            'brown',
            '#d20',
        );
    }

    respawn() {
        this.x = 320 + this.r;
    }
}
