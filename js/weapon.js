class Weapon {
  constructor(shooter) {
    this.shooter = shooter;
    this.bullets = []
    this.color = `yellow`
  }

  shoot() {

    const check = this.shooter.dx >= 0;
    if (check) {

      this.bullets.push(
        new Bullet(
          this.shooter.ctx,
          this.shooter.x + this.shooter.w,
          this.shooter.y + this.shooter.h / 2,
          Math.cos(this.shooter.angle),
          Math.sin(this.shooter.angle),
          this.color
        )
      )

    } else {

      this.bullets.push(
        new Bullet(
          this.shooter.ctx,
          this.shooter.x,
          this.shooter.y + this.shooter.h / 2,
          Math.cos(this.shooter.angle),
          Math.sin(this.shooter.angle),
          this.color
        )
      )

    }

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

  _soldierShoot() {

    this.color = `red`;
    const check = this.shooter.dx >= 0;

    if (check) {

      this.bullets.push(
          new Bullet(
          this.shooter.ctx,
          this.shooter.x + this.shooter.w,
          this.shooter.y + this.shooter.h * 0.35,
          Math.cos(this.shooter.angle),
          Math.sin(this.shooter.angle),
          this.color
        )
      )

    } else {

      this.bullets.push(
          new Bullet(
          this.shooter.ctx,
          this.shooter.x,
          this.shooter.y + this.shooter.h * 0.35,
          Math.cos(this.shooter.angle),
          Math.sin(this.shooter.angle),
          this.color
        )
      )

    }

  }

}