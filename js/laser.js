class Lasser {
    constructor(ctx, x, y, dx, dy, color) {
      this.ctx = ctx
      this.x = x
      this.y = y
      this.w = 10;
      this.h = 5;
      this.dx = dx;
      this.dy = dy;
  
      this.dmg = 1
  
      this.color = color
    }
  
    draw() {
      this.ctx.fillStyle = this.color
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
      
    }

    update() {
      this.x += this.dx * 0.2;
      this.y += this.dy * 0.2;
    }
  
    isVisible() {
      return !(this.x >= this.ctx.canvas.width || this.x <= 0 || this.y >= this.ctx.canvas.height || this.y <= 0 )
    }

  }