class Barricade {
    constructor(ctx, bg, x, y, w, h){
        this.ctx = ctx
        this.bg = bg
        this.x = this.bg.x + x
        this.y = y
        this.w = w
        this.h = h

        this.img = new Image();
        this.img.src = "img/vacio.png";
    }

    draw(){
        this.ctx.drawImage(
            this.img,
            0, // sx
            0, // sy
            10, // sw
            10, // sh
            this.x, // dx
            this.y, // dy
            this.w, // dw
            this.h // dh
        )

    }

    move(){
        this.x -= 0.5;

    }

    collide(el) {
        const colX = el.x + el.w > this.x && el.x < this.x + this.w
        const colY = el.y + el.h > this.y && el.y < this.y + this.h

        return colX && colY

    }
}