class Soldier{
    constructor(ctx){
        this.ctx = ctx;
        this.x = 300;
        this.h = 40;
        this.w = 35;
        this.y = 150 - this.h;

        this.vx = 0;
        this.vy = 0;
        this.g = 0.05;

        this.dx = 0;
        this.dy = 0;

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
        this.img.src = "img/sEnemy.png";
        this.img.frames = 4;
        this.img.framesPerSide = 2;
        
        this.img.frameIndex = 0;       

        this.tickShoot = 0;
        this.tick = 0;

        this.nextMoveX;
        this.angle;

    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames, // sx
            0, // sy
            this.img.width / this.img.frames, // sw
            this.img.height, // sh
            this.x, // dx
            this.y, // dy
            this.w, // dw
            this.h // dh
        )

        this.weapon.draw()
        this._animate();
        
        if (this.tickShoot++ > 10000) {
            this.tickShoot = 0
        }
    }
    
    move(charX, charY) {

        this._nextMove();
        this.x += this.vx;
        this.dx = charX - this.x;
        this.dy = charY - this.y;
        this.angle = Math.atan2(this.dy,this.dx);


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
        this.tick++;

        if (this.tick > 32) {
            this.tick = 0
            this.img.frameIndex++
        }
      
        if (this.dx >= 0){

            if (this.img.frameIndex === this.img.frames) {
                this.img.frameIndex = 2
            }

        } else {

            if (this.img.frameIndex === this.img.frames - this.img.framesPerSide) {
                this.img.frameIndex = 0
            }

        }


    }

    _isJumping(){
        return false
    }
    

    _hit(b) {
        const colX = b.x + b.w > this.x && b.x < this.x + this.w
        const colY = b.y + b.h > this.y && b.y < this.y + this.h
  
        return colX && colY
    }

    _nextMove(){
        this.nextMoveX = this._rand(0, this.ctx.canvas.width)
        const dx = this.nextMoveX -this.x
    }

    _rand(b,a){
        return Math.floor(Math.random() * b + a)
    }
}