import { Cloud } from '../components/Cloud.js';
import { BottomBar } from '../components/BottomBar.js';
import { Tree } from '../components/Tree.js';

const WIDTH = 320;
const HEIGHT = 480;

export class Splash {
    constructor(game) {
        this.game = game;
        this.banner = game.images['splash.png'];
    }

    init() {
        this.game.soundManager.play('swoosh');
        this.game.distance = 0;
        this.game.bg_grad = 'day';
        this.game.entities.length = 0;
        this.game.score.taps = 0;
        this.game.score.coins = 0;

        this.game.entities.push(
            new Cloud(
                30,
                Math.floor((Math.random() * HEIGHT) / 2),
                this.game.draw,
            ),
        );
        this.game.entities.push(
            new Cloud(
                130,
                Math.floor((Math.random() * HEIGHT) / 2),
                this.game.draw,
            ),
        );
        this.game.entities.push(
            new Cloud(
                230,
                Math.floor((Math.random() * HEIGHT) / 2),
                this.game.draw,
            ),
        );

        for (let i = 0; i < 2; i++) {
            this.game.entities.push(
                new BottomBar(WIDTH * i, HEIGHT - 100, WIDTH, this.game.draw),
            );
        }
        this.game.entities.push(
            new Tree(
                Math.floor(Math.random() * WIDTH),
                HEIGHT - 160,
                this.game.draw,
            ),
        );
        this.game.entities.push(
            new Tree(
                Math.floor(Math.random() * WIDTH + 50),
                HEIGHT - 160,
                this.game.draw,
            ),
        );
        this.game.entities.push(
            new Tree(
                Math.floor(Math.random() * WIDTH + 100),
                HEIGHT - 160,
                this.game.draw,
            ),
        );
    }

    update() {
        this.game.entities.forEach((entity) => entity.update());
        if (this.game.input.tapped) {
            this.game.changeState('Play');
            this.game.input.tapped = false;
        }
    }

    render() {
        this.game.draw.image(this.banner, 66, 100);
    }
}
