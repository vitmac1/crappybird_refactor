import { Draw } from '../components/Draw.js';
import { Input } from '../components/Input.js';
import { Splash } from '../states/Splash.js';
import { Play } from '../states/Play.js';
import { GameOver } from '../states/GameOver.js';
import { SoundManager } from '../components/SoundManager.js';

const WIDTH = 320;
const HEIGHT = 480;

const states = {
    Splash,
    Play,
    GameOver,
};

export class FlappyBirdGame {
    constructor(images) {
        // Configurações iniciais
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.scale = 1;
        this.offset = { top: 0, left: 0 };
        this.entities = [];
        this.score = { taps: 0, coins: 0 };
        this.distance = 0;
        this.digits = [];
        this.fonts = [];
        this.RATIO = null;
        this.bg_grad = 'day';
        this.game = null;
        this.currentWidth = null;
        this.currentHeight = null;
        this.canvas = null;
        this.ctx = null;
        this.ua = null;
        this.android = null;
        this.ios = null;
        this.gradients = {};
        this.soundManager = new SoundManager();
        this.images = images;
        this.loop = this.loop.bind(this); // bind uma vez só
    }

    init() {
        let grad;

        this.RATIO = this.WIDTH / this.HEIGHT;
        this.currentWidth = this.WIDTH;
        this.currentHeight = this.HEIGHT;

        this.canvas = document.getElementById('game');
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        this.ctx = this.canvas.getContext('2d');

        this.draw = new Draw(this.ctx, this.WIDTH, this.HEIGHT);
        this.input = new Input(this.offset, this.scale);

        this.ua = navigator.userAgent.toLowerCase();
        this.android = this.ua.includes('android');
        this.ios = this.ua.includes('iphone') || this.ua.includes('ipad');

        grad = this.ctx.createLinearGradient(0, 0, 0, this.HEIGHT);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.5, '#69a');
        grad.addColorStop(1, 'yellow');
        this.gradients.dawn = grad;

        grad = this.ctx.createLinearGradient(0, 0, 0, this.HEIGHT);
        grad.addColorStop(0, '#69a');
        grad.addColorStop(0.5, '#9cd');
        grad.addColorStop(1, '#fff');
        this.gradients.day = grad;

        grad = this.ctx.createLinearGradient(0, 0, 0, this.HEIGHT);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.3, '#69a');
        grad.addColorStop(1, 'pink');
        this.gradients.dusk = grad;

        grad = this.ctx.createLinearGradient(0, 0, 0, this.HEIGHT);
        grad.addColorStop(0, '#036');
        grad.addColorStop(1, 'black');
        this.gradients.night = grad;

        window.addEventListener('click', (e) => {
            e.preventDefault();
            this.soundManager.unlock(); // Desbloqueia os sons
            this.input.set(e); // ou this.Input.set se estiver encapsulado
        });

        window.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.soundManager.unlock(); // Desbloqueia os sons
            this.input.set(e.touches[0]);
        });

        window.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });

        window.addEventListener('touchend', (e) => {
            e.preventDefault();
        });

        this.resize();
        this.changeState('Splash');
        this.loop();
    }

    resize() {
        this.currentHeight = window.innerHeight;
        this.currentWidth = this.currentHeight * this.RATIO;

        if (this.android || this.ios) {
            document.body.style.height = window.innerHeight + 50 + 'px';
        }

        this.canvas.style.width = this.currentWidth + 'px';
        this.canvas.style.height = this.currentHeight + 'px';
        this.scale = this.currentWidth / this.WIDTH;
        this.offset.top = this.canvas.offsetTop;
        this.offset.left = this.canvas.offsetLeft;

        this.input.offset = this.offset;
        this.input.scale = this.scale;

        setTimeout(() => {
            window.scrollTo(0, 1);
        }, 1);
    }

    update() {
        this.game.update();
        this.input.tapped = false;
    }

    render() {
        this.draw.rect(
            0,
            0,
            this.WIDTH,
            this.HEIGHT,
            this.gradients[this.bg_grad],
        );

        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].render();
        }

        this.game.render();
    }

    loop() {
        this.update();
        this.render();
        requestAnimationFrame(this.loop); // reutiliza a função bindada
    }

    changeState(stateName) {
        const StateClass = states[stateName];

        this.game = new StateClass(this);

        this.game.init();
    }
}
