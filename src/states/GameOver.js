import { getCookie, setCookie } from '../utils/cookies.js';

export class GameOver {
    constructor(game) {
        this.game = game;
        this.banner = null;
        this.medal = null;
        this.replay = null;
        this.highscore = 0;
    }

    getMedal() {
        const { coins } = this.game.score;

        let medal = 'bronze';

        if (coins >= 40) {
            medal = 'platinum';
        } else if (coins >= 30) {
            medal = 'gold';
        } else if (coins >= 20) {
            medal = 'silver';
        }

        return medal;
    }

    getHighScore() {
        const currentScore = this.game.score.coins;
        const savedHighScore = parseInt(getCookie('highscore')) || 0;

        const finalHighScore = Math.max(currentScore, savedHighScore);

        if (finalHighScore > savedHighScore) {
            setCookie('highscore', finalHighScore, 999);
        }

        return finalHighScore;
    }

    init() {
        setTimeout(() => {
            debugger;
            this.game.soundManager.play('die');

            this.banner = new Image();
            this.banner.src = '/assets/scoreboard.png';

            const medalName = this.getMedal();
            this.medal = new Image();
            this.medal.src = `/assets/medal_${medalName}.png`;

            this.replay = new Image();
            this.replay.src = '/assets/replay.png';

            this.highscore = this.getHighScore();
        }, 100);
    }

    update() {
        if (this.game.input.tapped) {
            debugger;
            this.game.changeState('Splash');

            this.game.input.tapped = false;
        }

        // Atualiza o pássaro (FB.bird)
        if (this.game.bird) {
            this.game.bird.update();
        }
    }

    render() {
        if (this.banner) {
            this.game.draw.image(this.banner, 42, 70);
            this.game.draw.image(this.medal, 75, 183);
            this.game.draw.image(this.replay, 102.5, 260);

            this.game.draw.text(this.game.score.coins, 220, 185, 15, 'black');
            this.game.draw.text(this.highscore, 220, 225, 15, 'black');
        }
    }
}
