class Bullet {
    constructor(ctx, x, y) {
      this.ctx = ctx
      this.x = x
      this.y = y
      this.r = 5
      this.w = 2 * this.r
      this.h = 2 * this.r
  
      this.vx = 10
      this.vy = 0
  
      this.color = `rgb(${this.randomColor()},${this.randomColor()},${this.randomColor()})`
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0.25 * Math.PI, 1.75 * Math.PI);
      this.ctx.lineTo(this.x, this.y);
      this.ctx.fillStyle = this.color
      this.ctx.fill();
      this.ctx.closePath();
    }
  
    move() {
      this.x += this.vx
      this.y += this.vy
    }
  
    isVisible() {
      return !(
        this.x >= this.ctx.canvas.width ||
        this.y >= this.ctx.canvas.height
      )
    }
  
    randomColor() {
      return Math.random() * 255
    } 
  }