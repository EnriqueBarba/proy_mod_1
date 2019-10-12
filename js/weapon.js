class Weapon {
    constructor(shooter) {
      this.shooter = shooter;
      this.bullets = []
      this.tick = 0
    }
  
    shoot() {
    this.bullets.push(
        new Bullet(
            this.shooter.ctx,
            this.shooter.x + this.shooter.w,
            this.shooter.y + this.shooter.h0/2,
            Math.cos(this.shooter.angle),
            Math.sin(this.shooter.angle)
        )
    )  
    }
  
    clearBullets() {
      this.bullets = this.bullets.filter(b => b.isVisible())
    }
  
    draw() {
      this.bullets.forEach(b => b.draw())
    }
  
    move() {
      this.bullets.forEach(b => b.update())
  
    }

    _soldierShoot(){
      this.bullets.push(
        new Bullet(
            this.shooter.ctx,
            this.shooter.x + this.shooter.w * 0.75,
            this.shooter.y + this.shooter.h * 0.5,
            Math.cos(this.shooter.angle),
            Math.sin(this.shooter.angle)
        ))
    }
  }