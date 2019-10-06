class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.intervalId = null;
        this.tick = 0;

        this.bg = new Background(ctx);
        this.char = new Character(ctx);
    }

    start() {
        this._runAnimationLoop()
    }

    _runAnimationLoop() {
        this.intervalId = setInterval(() => {
          this._clear()
          this._draw()
          this._move()
          this._addObstacle()
          this._checkPlatforms()
          this._checkCollisions()
          this._clearObstacles()
    
          if (this.tick++ > 10000) {
            this.tick = 0
          }
        }, FPS)
      }

      _clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      }

      _draw(){
        this.bg.draw();
        this.char.draw();
      }

      _move(){
        
        if(this.char.actions.right && (this.char.x + this.char.w/2) >= this.ctx.canvas.width*0.65){
          this.bg.move();
          this.char.x = this.ctx.canvas.width*0.65 - this.char.w/2;
        } else {
            
        }
        this.char.move();
        
      }

      _addObstacle(){

      }
      _checkCollisions(){

      }

      _checkPlatforms(){
        debugger
        const posiblePlats = this.bg.platforms.find(p => p.collide(this.char));

        if (posiblePlats) {
          if(this.char.y + this.char.h0 <= posiblePlats.y +posiblePlats.h){
            this.char.y0 = posiblePlats.y
          } else {
            this.char.y0 = 150 - this.char.h0
          }
        } else {
          this.char.y0 = 150 - this.char.h0
        }

        /*if(posiblePlats.length > 0){
          posiblePlats.forEach(plat => {
            if(plat.x + plat.w >= this.char.x){
              if(plat.collideUp(this.char)){
                  this.char.y0 = plat.y -this.char.h0
              } 
            }
          })
        }else{
          this.char.y0 = 150 - this.char.h0
        }*/
      }

      _clearObstacles(){

      }

      _gameOver(){

      }

}