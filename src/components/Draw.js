export class Draw {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.WIDTH = width;
        this.HEIGHT = height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    }

    rect(x, y, w, h, col) {
        this.ctx.fillStyle = col;
        this.ctx.fillRect(x, y, w, h);
    }

    circle(x, y, r, col) {
        this.ctx.fillStyle = col;
        this.ctx.beginPath();
        this.ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    image(img, x, y) {
        this.ctx.drawImage(img, x, y);
    }

    sprite(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH, r) {
        this.ctx.save();
        this.ctx.translate(destX, destY);
        this.ctx.rotate(r * (Math.PI / 180));
        this.ctx.translate(-(destX + destW / 2), -(destY + destH / 2));
        this.ctx.drawImage(
            img,
            srcX,
            srcY,
            srcW,
            srcH,
            destX,
            destY,
            destW,
            destH,
        );
        this.ctx.restore();
    }

    semiCircle(x, y, r, col) {
        this.ctx.fillStyle = col;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI, false);
        this.ctx.closePath();
        this.ctx.fill();
    }

    text(string, x, y, size, col) {
        this.ctx.font = `bold ${size}px Monospace`;
        this.ctx.fillStyle = col;
        this.ctx.fillText(string, x, y);
    }
}
