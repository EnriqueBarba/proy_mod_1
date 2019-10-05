class Background {
    constructor(ctx){
        this.ctx = ctx;
        this.x = 0;
        this.y = -82;
        this.w = 4088;
        this.h = 232;

        this.img = new Image();
        this.img.src = "img/mission1.png";
        this.platforms = [];
        this.shape = shapeMap1;

        this.shape.forEach(plat =>{
            this.platforms.push(
                new Platform(this.ctx, this, plat[0], plat[1], plat[2], plat[3])
            )
        })
        
    }

    draw(){
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
        )
    this.platforms.forEach(plat => {plat.draw()})
    }

    move(){
        
        const bgLimit = this.w*-1 + this.ctx.canvas.width
        
        if (this.x > bgLimit){
            this.x -= 1;
            this.platforms.forEach(plat => {plat.move()})
        }     
    }

}