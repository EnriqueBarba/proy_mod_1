class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.intervalId = null;
        this.tick = 0;

        this.bg = new Background(ctx);
        this.char = new Character(ctx);
        this.soldiers = [];
        this.tickSoldier = 0;
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
          this._addSoldier()
          this._checkPlatforms()
          this._checkCollisions()
          this._clearObstacles()
    
          if (this.tick++ > 10000) {
            this.tick = 0
          }

          if (this.tickSoldier++ > 10000) {
            this.tick = 0
          }
          this.soldiers.forEach(s =>{
            if(s.tickShoot % 200 === 0){
              s.weapon._soldierShoot()
            }
          })

        }, FPS)
      }

      _clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      }

      _draw(){
        this.bg.draw();
        this.char.draw();
        this.soldiers.forEach(s => s.draw())
      }

      _move(){
        
        if(this.char.actions.right && (this.char.x + this.char.w/2) >= this.ctx.canvas.width*0.65){
          this.bg.move();
          this.char.x = this.ctx.canvas.width*0.65 - this.char.w/2;

          if (this.bg.x < -3150 && this.bg.y <= 0){
            this.bg.y += 0.27;
          }
        } 

        if(this._checkCharBarricade()){
          this.char.vx = 0;
        }

        this.char.move();
        this.soldiers.forEach(s => s.move())
        
      }

      _addObstacle(){

      }

      _addSoldier(){
        if(this.tickSoldier % 1000 === 0 && this.soldiers.length < 2){
          this.soldiers.push(new Soldier(ctx))
        }

      }

      _checkCharBarricade(){
        const colChar = this.bg.barricades.some(barr => {
          //console.log(barr.collide(this.char))
          return barr.collide(this.char)
        })
       return colChar
      }

      _checkCollisions(){

        this.char.weapons[0].bullets = this.char.weapons[0].bullets.filter(b => {
          return !this.bg.barricades.some(barr => { return barr.collide(b) })
        })

        this.soldiers.forEach(s=>{
          s.weapon.bullets = s.weapon.bullets.filter(b => {
            return !this.bg.barricades.some(barr => { return barr.collide(b) })
          })
        })

      }

      _checkPlatforms(){
        
        const posiblePlats = this.bg.platforms.find(p => p.collide(this.char));

        if (posiblePlats) {
          //console.log('obstaculo',posiblePlats.y)
          //console.log('player',this.char.y)

          if(this.char.y + this.char.h0 <= posiblePlats.y +posiblePlats.h){
            this.char.y0 = posiblePlats.y - this.char.h0
          } 
        } else {
          this.char.y0 = 150 - this.char.h0
        } 
      }

      _clearObstacles(){
        this.bg.platforms.forEach((p,i) => {
          if(p.x + p.w <= 0){
            this.bg.platforms.splice(i,1);
          }
        })
      }

      _gameOver(){

      }

}