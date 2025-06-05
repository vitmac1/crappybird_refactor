const GROUND_LIMIT = 370;

export class Collides {
    constructor(bird, pipe, game) {
        this.bird = bird;
        this.pipe = pipe;
        this.game = game;
    }

    // Detecta colisão do pássaro com os canos (sem tratar pontuação)
    isColliding() {
        const bird = this.bird;
        const pipe = this.pipe;

        const bx1 = bird.vx - bird.width / 2;
        const by1 = bird.vy - bird.height / 2;
        const bx2 = bird.vx + bird.width / 2;
        const by2 = bird.vy + bird.height / 2;

        const upx1 = pipe.centerX;
        const upy1 = 0;
        const upx2 = pipe.centerX + pipe.w;
        const upy2 = pipe.centerY - 50;

        const lpx1 = pipe.centerX;
        const lpy1 = pipe.centerY + 50;
        const lpx2 = upx2;
        const lpy2 = pipe.h;

        const collisionWithUpperPipe = !(bx1 > upx2 || bx2 < upx1 || by1 > upy2 || by2 < upy1);
        const collisionWithLowerPipe = !(bx1 > lpx2 || bx2 < lpx1 || by1 > lpy2 || by2 < lpy1);

        return collisionWithUpperPipe || collisionWithLowerPipe;
    }

      // Trata a pontuação ao passar pelo coin (se existir)
    handleCoin() {
        const me = this,
            { bird, pipe } = me,
            { soundManager } = me.game;

        if (pipe.coin && bird.vx > pipe.centerX + pipe.w / 2 - 5) {
            pipe.coin = false;
            
            me.game.score.coins += 1;
    
            me.game.score.digits = me.game.score.coins.toString().split('');
            
            soundManager.play('score');
        }
    }

    // Método principal que verifica se o pássaro caiu, atualiza pontuação e detecta colisão
    checkCollisionAndScore() {
        const me = this,
            { bird } = me;
        
        if (bird.vy >= GROUND_LIMIT) {
            return true; // pássaro "caiu"
        }

        me.handleCoin();

        return me.isColliding();
    }
}
