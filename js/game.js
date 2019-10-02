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
        } else {
          this.char.move();
        }
        
      }

      _addObstacle(){

      }

      _checkCollisions(){

      }

      _clearObstacles(){

      }

      _gameOver(){

      }

}