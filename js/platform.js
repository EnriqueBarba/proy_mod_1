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

    collide(char) {

        return char.x > this.x && char.x < this.x +this.w;

        /*
        *  Marina
        if (c.y + c.h <= e.y + e.img.height && c.vy >= 0 && c.x > e.x && c.x < e.x + e.w) {
            return true
        }
        return false
        */

        /* const colX = el.x + el.w > this.x && el.x < this.x + this.w
        const colY = el.y + el.h > this.y && el.y < this.y + this.h
    
        return colX && colY*/
    }


}