export class SoundManager {
    constructor() {
        this.sounds = {
            jump: new Audio('/sounds/wing.ogg'),
            score: new Audio('/sounds/point.ogg'),
            hit: new Audio('/sounds/hit.ogg'),
            die: new Audio('/sounds/die.ogg'),
            swoosh: new Audio('/sounds/swooshing.ogg'),
        };

        this.channelMax = 10;
        this.channels = [];

        for (let i = 0; i < this.channelMax; i++) {
            this.channels.push({
                channel: new Audio(),
                finished: -1,
            });
        }

        this.unlocked = false;
    }

    unlock() {
        if (this.unlocked) return;

        for (const key in this.sounds) {
            const sound = this.sounds[key];
            try {
                sound.play();
                sound.pause();
                sound.currentTime = 0;
            } catch (error) {
                console.warn(`Falha ao desbloquear som "${key}":`, e);
            }
        }

        this.unlocked = true;
    }

    play(soundKey) {
        const sound = this.sounds[soundKey];
        if (!sound) return;

        const now = Date.now();
        for (let i = 0; i < this.channels.length; i++) {
            if (this.channels[i].finished < now) {
                this.channels[i].finished = now + sound.duration * 1000;
                this.channels[i].channel.src = sound.src;
                this.channels[i].channel.load();
                this.channels[i].channel.play();
                break;
            }
        }
    }
}
