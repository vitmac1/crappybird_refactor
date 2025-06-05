export class Bird {
    constructor(game) {
        this.img = game.images['bird.png'];

        this.gravity = 0.25;
        this.width = 34;
        this.height = 24;

        this.ix = 0;
        this.iy = 0;
        this.fr = 0;

        this.vy = 180;
        this.vx = 70;
        this.velocity = 0;

        this.play = false;
        this.jump = -4.6;
        this.rotation = 0;

        this.type = 'bird';

        this.game = game;
    }

    update() {
        // Animação dos frames
        if (this.fr++ > 5) {
            this.fr = 0;
            this.iy = this.iy === this.height * 3 ? 0 : this.iy + this.height;
        }

        if (this.play) {
            this.velocity += this.gravity;
            this.vy += this.velocity;

            if (this.vy <= 0) this.vy = 0;
            if (this.vy >= 370) this.vy = 370;

            this.rotation = Math.min((this.velocity / 10) * 90, 90);
        }

        if (this.game.input.tapped) {
            this.play = true;
            this.game.soundManager.play('jump'); // callback, para não depender diretamente de FB
            this.velocity = this.jump;
        }
    }

    render() {
        this.game.draw.sprite(
            this.img,
            this.ix,
            this.iy,
            this.width,
            this.height,
            this.vx,
            this.vy,
            this.width,
            this.height,
            this.rotation,
        );
    }
}
