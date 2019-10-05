class Platform {
    constructor(ctx, bg, x, y, w, h){
        this.ctx = ctx
        this.bg = bg
        this.x = this.bg.x + x
        this.y = y
        this.w = w
        this.h = h
    }

    draw() {
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    
    move() {
        this.x -= 1;
    }

    collide(el) {
        const colX = el.x + el.w > this.x && el.x < this.x + this.w
        const colY = el.y + el.h > this.y && el.y < this.y + this.h
    
        return colX && colY
    }


}