class Platform {
    constructor(ctx, bg, x, y, w, h){
        this.ctx = ctx
        this.bg = bg
        this.x = this.bg.x + x
        this.y = y
        this.w = w
        this.h = h

        this.img = new Image();
        this.img.src = "img/rectAmarillol.PNG";
    }

    draw() {
        //this.ctx.fillStyle = "red"
        //this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.ctx.drawImage(
            this.img,
            0, // sx
            0, // sy
            1, // sw
            1, // sh
            this.x, // dx
            this.y, // dy
            this.w, // dw
            this.h // dh
        )
    }

    
    move() {
        this.x -= 0.5;


    }

    collide(char) {

        return char.x + char.w/2> this.x && char.x + char.w/2 < this.x +this.w;

    }


}