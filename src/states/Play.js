import { Bird } from '../components/Bird.js';
import { Pipe } from '../components/Pipe.js';
import { Collides } from '../components/Collides.js';

const FONT_PATH_PREFIX = '/assets/font_small_';
const GRADIENTS = ['day', 'dusk', 'night', 'dawn'];

const WIDTH = 320;

export class Play {
    constructor(game) {
        this.game = game;
        this.images = game.images;
        this.bird = null;
    }

    init() {
        // Inicializa entidades Pipe
        this.game.entities.push(new Pipe(WIDTH * 2, 50, this.game.draw));
        this.game.entities.push(new Pipe(WIDTH * 2 + WIDTH / 2, 50, this.game.draw));
        this.game.entities.push(new Pipe(WIDTH * 3, 50, this.game.draw));

        this.bird = new Bird(this.game);
        this.game.entities.push(this.bird);

        for(var n=0;n<10;n++){
            var img = new Image();
            img.src = "/assets/font_small_" + n +'.png';
            this.game.fonts.push(img);
        }

        //this.game.fonts = Object.values(this.game.images);

        this.game.digits = ['0'];
    }

    update() {
        const me = this,
            { input } = me.game;

        me.game.distance += 1;

        me.updateBackground();

        me.updateEntitiesAndCheckCollisions();

        let checkCollision = false;

        if (input.tapped) {
            me.game.score.taps += 1;
            checkCollision = true;
        }

        if (checkCollision) {
            this.game.input.tapped = false;
        }
    }

    render() {
        const me = this,
            { WIDTH, fonts, digits, draw } = me.game,

            X = WIDTH / 2 - (digits.length * 14) / 2;

        for (let i = 0; i < digits.length; i++) {
            draw.image(fonts[Number(digits[i])], X + i * 14, 10);
        }
    }

    updateBackground() {
        const me = this,
            { distance, bg_grad } = me.game;

        // Atualiza background baseado na distância
        if (distance % 2048 === 0) {
            
            let currentIndex = GRADIENTS.indexOf(bg_grad);
            
            currentIndex = (currentIndex + 1) % GRADIENTS.length;
            
            me.game.bg_grad = GRADIENTS[currentIndex];
        }
    }

    updateEntitiesAndCheckCollisions() {
        const me = this,
            { entities, soundManager } = me.game;
            
        for (let i = 0; i < entities.length; i++) {
            
            entities[i].update();

            if (entities[i].type === 'pipe') {
                
                const collides = new Collides(this.bird, this.game.entities[i], this.game),
                    hasCollided = collides.checkCollisionAndScore();

                if (hasCollided) {
                    soundManager.play('hit');
                    me.game.changeState('GameOver');
                    break;
                }
            }
        }
    }
}
