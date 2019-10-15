class HpBar{
    constructor(ctx, x, y, w, h){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.rad = 2;
    }

    draw(entity){
        this.ctx.save();

        this.ctx.fillStyle = "#FFF";
        this.ctx.font = "12px Roboto";
        this.ctx.fillText(
          entity.name,
          this.x - 20,
          this.y + 10
        );
        this.ctx.fillStyle = "rgb(234,1,1)";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y + this.h - this.rad);
        this.ctx.arcTo(
          this.x, 
          this.y, 
          this.x + this.w - this.rad,
          this.y, this.rad
          );
        this.ctx.arcTo(
          this.x + this.w,
          this.y, 
          this.x + this.w,
          this.y + this.h - this.rad,
          this.rad
          );
        this.ctx.arcTo(
          this.x + this.w,
          this.y + this.h, 
          this.x + this.rad, 
          this.y + this.h, 
          this.rad
          );
        this.ctx.arcTo(this.x, this.y + this.h, this.x, this.y + this.h - this.rad, this.rad);
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.fillStyle = "rgb(69,234,1)";
        const health = this.w * entity.health/entity.maxHealth   
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y + this.h - this.rad);
        this.ctx.arcTo(
          this.x, 
          this.y, 
          this.x + health - this.rad,
          this.y, this.rad
          );
        this.ctx.arcTo(
          this.x + health,
          this.y, 
          this.x + health,
          this.y + this.h - this.rad,
          this.rad
          );
        this.ctx.arcTo(
          this.x + health,
          this.y + this.h, 
          this.x + this.rad, 
          this.y + this.h, 
          this.rad
          );
        this.ctx.arcTo(this.x, this.y + this.h, this.x, this.y + this.h - this.rad, this.rad);
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }
}