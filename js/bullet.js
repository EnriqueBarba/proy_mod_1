class Bullet {
    constructor(ctx, x, y, dx, dy) {
      this.ctx = ctx
      this.x = x
      this.y = y
      this.r = 4
      this.w = this.r
      this.h = this.r
      this.dx = dx;
      this.dy = dy;
  
      this.dmg = 10
  
      this.color = `lime`
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI);
      this.ctx.fillStyle = this.color
      this.ctx.fill();
      this.ctx.closePath();
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;
    }
  
    isVisible() {
      return !(this.x >= this.ctx.canvas.width || this.x <= 0 )
    }

  }