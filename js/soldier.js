class Soldier{
    constructor(ctx){
        this.ctx = ctx;
        const delante = this.ctx.canvas.width + 50;
        const detras = -50
        this.x = Math.floor(Math.random() * (1 - (-1) + 1) + (-1)) > 0 ? delante : detras;
        this.h = 40;
        this.w = 35;
        this.y = 150 - this.h;

        this.vx = 0;
        this.vy = 0;
        this.v = 0.2;
        this.g = 0.05;

        this.dx = 0;
        this.dy = 0;

        this.health = 20;
        this.weapon = new Weapon(this);

        this.img = new Image();
        this.img.src = "img/sEnemy.png";
        this.img.frames = 4;
        this.img.framesPerSide = 2;
        
        this.img.frameIndex = 0;       

        this.tickShoot = 0;
        this.tick = 0;

        this.nextMoveX;
        this.nextMoveY;
        this.angle;

        this.deadAudio = new Audio("audio/EnemyDead.mp3");
        this.shotAudio = new Audio("audio/gun.mp3");

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

        this.weapon.move()

    }

    _takeDmg(dmg){
        this.health -= dmg;
    }

    _isDead(){
        return this.health <= 0
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
        this.nextMoveX = this._rand(0, this.ctx.canvas.width-this.x); 
        const dx = this.nextMoveX -this.x

        const angl = Math.atan2(0, dx);
        this.vx = Math.cos(angl) * this.v;
    }

    _rand(b,a){
        return Math.floor(Math.random() * a) + b
    }
}