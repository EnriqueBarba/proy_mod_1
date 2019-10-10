class Bullet {
    constructor(ctx, x, y, aim) {
      this.ctx = ctx
      this.x = x
      this.y = y
      this.r = 4
      this.w = 2 * this.r
      this.h = 2 * this.r
      this.aim = aim;
  
      this.speed = 1.2
      this.vy = 0
  
      this.color = `lime`
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI);
      this.ctx.lineTo(this.x, this.y);
      this.ctx.fillStyle = this.color
      this.ctx.fill();
      this.ctx.closePath();
    }
  
    move() {
      if (this.aim === "r"){
        this.x += this.speed
      } else if(this.aim === "l"){
        this.x -= this.speed
      }else if(this.aim === "u"){
        this.y -= this.speed
      }
    }
  
    isVisible() {
      return !(this.x >= this.ctx.canvas.width || this.x <= 0 )
    }
  
  }