class Soldier{
    constructor(ctx){
        this.ctx = ctx;
        this.x = 300;
        this.h = 45;
        this.w = 40;
        this.y = 150 - this.h;

        this.vx = 0;
        this.vy = 0;
        this.g = 0.05;

        this.health = 20;

        this.actions = {
            right: false,
            left: false,
            up: false,
            down: false,
            jump: false,
            shoot: false
        }

        this.aim = "l";
        this.weapon = new Weapon(this);

        this.img = new Image();
        this.img.src = "img/rectAmarillol.PNG";
        this.img.frames = 8;
        this.img.frameIndex = 1;
        this.img.levels = 2;

        this.tickShoot = 0;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            0, // sx
            0, // sy
            this.img.width, // sw
            this.img.height, // sh
            this.x, // dx
            this.y, // dy
            this.w, // dw
            this.h // dh
        )

        this.weapon.draw()
        
        if (this.tickShoot++ > 10000) {
            this.tickShoot = 0
        }
    }
    
    move() {
        this._animate();
        this.x += this.vx;

        if(this.x + this.w/2 <= 0){
            this.vx = 0.1
        } else if( this.x + this.w/2 >= this.ctx.canvas.width ){
            this.vx = -0.1
        }

        if (this.x + this.w/2 >= this.ctx.canvas.width * 0.6){
            this.aim = "l"
        }

        
        if (this.x + this.w/2 <= this.ctx.canvas.width * 0.6){
            this.aim = "r"
        }

        this.weapon.move()

    }

    _takeDmg(dmg){
        this.health -= dmg;
    }

    _isDead(){
        return !this.health <= 0
    }

    _animate(){
        if (this.aim === "l"){
            this.img.src = "img/rectAmarillol.PNG";
        } else if (this.aim === "r"){
            this.img.src = "img/rectAzul.PNG";
        }
    }

    _isJumping(){
        return false
    }
    _isCrouch(){
        return false
    }

    _hit(b) {
        const colX = b.x + b.w > this.x && b.x < this.x + this.w
        const colY = b.y + b.h > this.y && b.y < this.y + this.h
  
        return colX && colY
    }
}