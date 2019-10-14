class Character {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 100;
        this.h0 = 45;
        this.h = this.h0;
        this.w = 30;
        this.y0 = 150 - this.h0;
        this.y = this.y0;
        this.angle;
        this.vx = 0;
        this.vy = 0;
        this.g = 0.05;

        this.mouseX = 0;
        this.mouseY = 0;
        this.dx = 0;
        this.dy = 0;

        this.name = "P1"
        this.maxHealth = 200;
        this.health = 200;

        this.actions = {
            right: false,
            left: false,
            up: false,
            down: false,
            jump: false,
            shoot: false
        }

        this.weapons = [];
        this.weapons.push(new Weapon(this));

        this.img = new Image();
        this.img.src = "img/marcoTest.png";
        this.img.frames = 2;
        this.img.frameIndex = 0;
        this.img.framesPerSide = 1;
        
        this._setListeners();
        this.tick = 0;
    }

    draw() {

        this.ctx.drawImage(
            this.img,
            this.img.frameIndex *  this.img.width/this.img.frames, // sx
            0, // sy
            this.img.width/this.img.frames, // sw
            this.img.height, // sh
            this.x, // dx
            this.y, // dy
            this.w, // dw
            this.h // dh
        )

        this.weapons[0].draw()
        this._animate();
    }

    update(){
        this.dx = this.mouseX - this.x - this.w
        this.dy = this.mouseY - this.y - this.h0*2
        this.angle = Math.atan2(this.dy,this.dx)
        //console.log(`x: ${this.dx} y: ${this.dy} angle:${this.angle}`)
    }

    move() {
        
        this._applyActions();
        this.x += this.vx;

        if (this._isJumping()) {
            this.vy += this.g;
            this.y += this.vy;
            
            if (this.x <= 0) {
                this.x = 0;
            }

          } else {
            this.vy = 0;

            if (this._isCrouch()) {
                this.y = this.y0 + this.h;
            } else {
                this.y = this.y0;
            }

            if (this.x <= 0) {
                this.x = 0;
            }

        }

        this.weapons[0].move()

    }

    _takeDmg(dmg){
        this.health -= dmg;
    }

    _isDead(){
        return this.health <= 0
    }

    _setListeners() {
        document.onkeydown = e => this._switchAction(e.keyCode, true)
        document.onkeyup = e => this._switchAction(e.keyCode, false)
        canvas.onmousemove = e => this._setMouseCoords(e)
        canvas.onmousedown = e => this._shoot()
    }

    _setMouseCoords(e){
        this.mouseX = (e.clientX - canvas.offsetWidth) ;
        this.mouseY = (e.clientY - canvas.offsetHeight) ;
    }

    _shoot(){
        this.weapons[0].shoot()
    }

    _applyActions() {

        if (this.actions.right) {
            this.vx = 0.5
            //this.sx = this.img.width/2
        } else if (this.actions.left) {
            this.vx = -0.5
           // this.sx = 0
        } else {
            this.vx = 0
        }

        if (this.actions.down) {
            this._crouch()
        } else {
            this._stand()
        }

        if (this.actions.jump) {
            this._jump()
        }

        if (this.actions.shoot) {
            this.weapons[0].shoot()
        }

    }

    _jump() {
        if (!this._isJumping()) {
            this.y -= 20;
            this.vy -= 2.2;
        }
    }

    _crouch() {
        if (!this._isCrouch()) {
            this.h = this.h0 / 2
            this.y += this.h
        }
    }

    _isCrouch() {
        return this.h !== this.h0
    }

    _stand() {
        this.h = this.h0
    }

    _isJumping() {
        return this.y < this.y0
    }

    _switchAction(key, apply) {

        switch (key) {
            case Skey:
                this.actions.down = apply
                break;

            case Wkey:
                this.actions.jump = apply
                break;

            case Akey:
                this.actions.left = apply
                break;

            case Dkey:
                this.actions.right = apply
                break;

        }
        
    }

    _hit(b) {
        const colX = b.x + b.w > this.x && b.x < this.x + this.w
        const colY = b.y + b.h > this.y && b.y < this.y + this.h
  
        return colX && colY
    }

    _animate() {
        this.tick++

        if (this.tick > 32) {
            this.tick = 0
            this.img.frameIndex++
        }

        if (this.dx >= 0){
            if (this.img.frameIndex === this.img.frames) {
                this.img.frameIndex = 1
            }
        } else {
            if (this.img.frameIndex === this.img.frames - this.img.framesPerSide) {
                this.img.frameIndex = 0
            }
        }
    }
}