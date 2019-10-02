class Background {
    constructor(ctx){
        this.ctx = ctx;
        this.x = 0;
        this.y = -82;
        this.w = 4088;
        this.h = 232;

        this.img = new Image();
        this.img.src = "img/mission1.png";
    }

    draw(){
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
        )
    }

    move(){
        // character
        this.x -= 1;
    }

}