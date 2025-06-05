export class Input {
    constructor(offset, scale) {
        this.x = 0;
        this.y = 0;
        this.tapped = false;
        this.offset = offset; // ex: {left: 0, top: 0}
        this.scale = scale; // ex: 1 (sem escala)
    }

    set(data) {
        this.x = (data.pageX - this.offset.left) / this.scale;
        this.y = (data.pageY - this.offset.top) / this.scale;
        this.tapped = true;
    }

    reset() {
        this.tapped = false;
    }
}
