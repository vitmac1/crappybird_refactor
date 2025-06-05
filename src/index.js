import { FlappyBirdGame } from './core/FlappyBirdGame.js';
import { preloadImages } from './utils/preload.js';

const imagesToLoad = [
    'bird.png',
    'font_small_0.png',
    'font_small_1.png',
    'font_small_2.png',
    'font_small_3.png',
    'font_small_4.png',
    'font_small_5.png',
    'font_small_6.png',
    'font_small_7.png',
    'font_small_8.png',
    'font_small_9.png',
    'medal_bronze.png',
    'medal_gold.png',
    'medal_platinum.png',
    'medal_silver.png',
    'replay.png',
    'scoreboard.png',
    'splash.png',
    // adicione todos os arquivos da pasta assets que serão usados
];

preloadImages(imagesToLoad).then((images) => {
    const flappyBirdGame = new FlappyBirdGame(images);
    flappyBirdGame.init();
});
