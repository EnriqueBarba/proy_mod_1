class Weapon {
    constructor(shooter) {
      this.shooter = shooter;
      this.bullets = []
      this.tick = 0
    }
  
    shoot() {
      this.tick++
      if (this.tick >= 32){
        if (this.shooter._isCrouch()) {
            this.bullets.push(
                new Bullet(
                    this.shooter.ctx,
                    this.shooter.x + this.shooter.w * 0.75,
                    this.shooter.y - this.shooter.h * 0.55,
                    this.shooter.aim
                )
            )
        } else if (this.shooter._isJumping()) {
          this.bullets.push(
            new Bullet(
                this.shooter.ctx,
                this.shooter.x + this.shooter.w * 0.75,
                this.shooter.y + this.shooter.h*0.5,
                this.shooter.aim
            )
        )
        } else {
            this.bullets.push(
                new Bullet(
                    this.shooter.ctx,
                    this.shooter.x + this.shooter.w * 0.75,
                    this.shooter.y0 + this.shooter.h * 0.5,
                    this.shooter.aim
                )
            )
        }
        this.tick = 0;
      }
    }
  
    clearBullets() {
      this.bullets = this.bullets.filter(b => b.isVisible())
    }
  
    draw() {
      this.bullets.forEach(b => b.draw())
    }
  
    move() {
      this.bullets.forEach(b => b.move())
  
    }
  }