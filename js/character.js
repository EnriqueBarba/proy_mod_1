class Character {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 100;
        this.h0 = 45;
        this.h = this.h0;
        this.w = 40;
        this.y0 = 150 - this.h0;
        this.y = this.y0;

        this.vx = 0;
        this.vy = 0;
        this.g = 0.05;

        this.health = 100;

        this.actions = {
            right: false,
            left: false,
            up: false,
            down: false,
            jump: false,
            shoot: false
        }

        this.aim = "r";

        this.weapons = [];
        this.weapons.push(new Weapon(this));

        this.img = new Image();
        this.img.src = "img/marcoR.png";
        this.img.frames = 8;
        this.img.frameIndex = 1;
        this.img.levels = 2;
        this._setListeners();
        this.ticks = 0;
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

        this.weapons[0].draw()
    }

    move() {
        this._animate();
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
    }

    _applyActions() {

        if (this.actions.up) {
            this.img.src = "img/marcoU.PNG";
            this.aim = "u";
        } else {
            this._stand()
        }

        if (this.actions.right) {
            this.vx = 0.5
            this.img.src = "img/marcoR.png";
            this.aim = "r";
        } else if (this.actions.left) {
            this.vx = -0.5
            this.img.src = "img/marcoL.png";
            this.aim = "l";
        } else {
            this.vx = 0
        }

        if (this.actions.down) {
            this._crouch()
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
            case arrDown:
                this.actions.down = apply
                break;

            case arrUp:
                this.actions.up = apply
                break;

            case arrLeft:
                this.actions.left = apply
                break;

            case arrRight:
                this.actions.right = apply
                break;

            case aKey:
                this.actions.jump = apply
                break;

            case sKey:
                this.actions.shoot = apply
                break;
        }
        
    }

    _hit(b) {
        const colX = b.x + b.w > this.x && b.x < this.x + this.w
        const colY = b.y + b.h > this.y && b.y < this.y + this.h
  
        return colX && colY
    }

    _animate() {
        // this.tick++

        // if (this.tick >= this.img.frames) {
        //   this.img.frameIndex++
        //   this.tick = 0
        // }

    }
}