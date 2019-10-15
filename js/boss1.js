class Boss1{
    constructor(ctx){
        this.ctx = ctx;
        this.x = 3988
        this.h = 45;
        this.w = 40;
        this.y = 120 - this.h;

        this.dx = 0;
        this.dy = 0;
        this.angle = 0;

        this.color = "aqua";

        this.name = 'BS'

        this.maxHealth = 200;
        this.health = 200;
        this.weapon = new Weapon(this);

        this.img = new Image();
        this.img.src = "img/boss1.png";

        this.img.frames = 3;
        this.img.frameIndex = 0;

        this.tick = 0;
        this.hpBar = new HpBar(this.ctx, 210, 10, 60, 10);

        this.lasser = []
        this.tick = 0;
    }


    draw(char) {
        this.tick++
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width/this.img.frames, // sx
            0, // sy
            this.img.width/this.img.frames, // sw
            this.img.height, // sh
            this.x, // dx
            this.y, // dy
            this.w, // dw
            this.h // dh
        )

        this._animate();
        this.lasser.forEach(l => {l.draw()})

        this.dx = char.x - this.x;
        this.dy = char.y - this.y;
        this.angle = Math.atan2(this.dy,this.dx);

        if (this.x - char.x < 250){

            if (this.tick % 800 === 0){
                this.shoot()
            }
        }

        if (this.tick >= 10000) this.tick= 0

        this.lasser.forEach(l => {l.update()})
        
    }

    move(){
        this.x -= 0.5;
    }

    shoot(){

        this.lasser.push(
            new Lasser(
              this.ctx,
              this.x,
              this.y + this.h / 2,
              Math.cos(this.angle),
              Math.sin(this.angle),
              this.color
            )
          )

    }

    _takeDmg(dmg){
        this.health -= dmg;
    }

    _isDead(){
        return this.health <= 0
    }

    _hit(b) {
        const colX = b.x + b.w > this.x && b.x < this.x + this.w
        const colY = b.y + b.h > this.y && b.y < this.y + this.h
  
        return colX && colY
    }

    _animate(){
    this.tick++;

        if (this.tick > 32) {
            this.tick = 0
            this.img.frameIndex++
        }

        if (this.img.frameIndex === this.img.frames) {
            this.img.frameIndex = 0
        }
    }

}