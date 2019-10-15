class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 0;

    this.bg = new Background(ctx);
    this.char = new Character(ctx);
    this.charHp = new HpBar(ctx, 30, 10, 60, 10)
    this.boss1 = new Boss1(ctx)
    this.soldiers = [];
    this.tickSoldier = 0;

    this.audio = new Audio("audio/Stage1.mp3");
    this.audio.volume = 0.3
    this.missionCompleteAudio = new Audio("audio/MissionComplete.mp3");
  }

  start() {
    this._runAnimationLoop()
  }

  _runAnimationLoop() {
    this.audio.play();
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._addSoldiers()
      this._boosFight()
      this._checkPlatforms()
      this._checkCollisions()
      this._clearObstacles()
      this._clearSoldier()
      this._gameOver()
      this._missionComplete()

      if (this.tick++ > 10000) {
        this.tick = 0
      }

      if (this.tickSoldier++ > 10000) {
        this.tick = 0
      }
      this.soldiers.forEach(s => {
        if (s.tickShoot % 200 === 0) {
          s.weapon._soldierShoot()
        }
      })

    }, FPS)
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  _draw() {
    this.bg.draw();
    this.charHp.draw(this.char);
    this.char.draw();
    this.char.update();
    this.charHp.draw(this.char);
    this.soldiers.forEach(s => s.draw())
    this.boss1.draw(this.char);
  }

  _move() {

    if (this.char.actions.right && (this.char.x + this.char.w / 2) >= this.ctx.canvas.width * 0.65) {
      this.bg.move();
      this.char.x = this.ctx.canvas.width * 0.65 - this.char.w / 2;
      if (this.bg.x > this.bg.w * -1 + this.ctx.canvas.width) {
        this.soldiers.forEach(s => s.vx = -0.5)
        this.boss1.move();
      }

      if (this.bg.x < -3150 && this.bg.y <= 0) {
        this.bg.y += 0.27;
      }

    }

    this.char.move();
    this.soldiers.forEach(s => s.move(this.char.x, this.char.y))

    if (this._checkCharBarricade()) {
      this.char.vx = 0;
    }


  }

  _boosFight() {
    if (this.boss1.x <= 335) {
      this.soldiers.splice(0, this.soldiers.length - 1);
      this.tickSoldier = 0;
      this.boss1.hpBar.draw(this.boss1)
    }
  }

  _addSoldiers() {
    if (this.tickSoldier % 400 === 0 && this.soldiers.length < 5) {
      this.soldiers.push(new Soldier(ctx))
    }
  }

  _clearSoldier() {
    this.soldiers.forEach(s => { if (s._isDead()) s.deadAudio.play() });
    this.soldiers = this.soldiers.filter(s => !s._isDead())
  }

  _checkCharBarricade() {
    const colChar = this.bg.barricades.some(barr => {
      return barr.charCollide(this.char)
    })
    return colChar
  }

  _checkCollisions() {

    // char bullets on barricades
    this.char.weapons[0].bullets = this.char.weapons[0].bullets.filter(b => {
      return !this.bg.barricades.some(barr => barr.collide(b))
    })

    // char bullets on barricades
    this.soldiers.forEach(s => {
      s.weapon.bullets = s.weapon.bullets.filter(b => {
        return !this.bg.barricades.some(barr => barr.collide(b))
      })
    })


    // character hit by soldiers
    this.soldiers.forEach(s => {
      s.weapon.bullets = s.weapon.bullets.filter(b => {
        if (this.char._hit(b)) {
          this.char._takeDmg(b.dmg)
        }
        return !this.char._hit(b)
      })
    })

     // character hit by boss
     
      this.boss1.lasser = this.boss1.lasser.filter(l => {
        if (this.char._hit(l)) {
          this.char._takeDmg(l.dmg)
        }
        return !this.char._hit(l)
      })
    

    // soldiers taking dmg
    this.soldiers.forEach(s => {
      this.char.weapons[0].bullets = this.char.weapons[0].bullets.filter(b => {
        if (s._hit(b)) {
          s._takeDmg(b.dmg)
        }
        return !s._hit(b)
      })
    })

    // boss taking dmg
    this.char.weapons[0].bullets = this.char.weapons[0].bullets.filter(b => {
      if (this.boss1._hit(b)) {
        this.boss1._takeDmg(b.dmg)
      }
      return !this.boss1._hit(b)
    })


  }

  _checkPlatforms() {

    const posiblePlats = this.bg.platforms.find(p => p.collide(this.char));

    if (posiblePlats) {
      //console.log('obstaculo',posiblePlats.y)
      //console.log('player',this.char.y)
      if (this.char.y + this.char.h0 <= posiblePlats.y + posiblePlats.h) {
        this.char.y0 = posiblePlats.y - this.char.h0 + posiblePlats.h
      }

    } else {
      this.char.y0 = 150 - this.char.h0
    }

  }

  _clearObstacles() {

    this.bg.platforms.forEach((p, i) => {
      if (p.x + p.w <= 0) {
        this.bg.platforms.splice(i, 1);
      }
    })

    this.char.weapons[0].bullets = this.char.weapons[0].bullets.filter(b => b.isVisible())

    this.soldiers.forEach(s => { s.weapon.bullets = s.weapon.bullets.filter(b => b.isVisible()) })
  }

  _gameOver() {

    if (this.char._isDead()) {
      clearInterval(this.intervalId)
      this.ctx.fillStyle = "red"
      this.ctx.font = "40px Comic Sans MS";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "GAME OVER",
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      );
      this.audio.pause();
    }

  }

  _missionComplete() {

    if (this.boss1._isDead()) {
      this.audio.pause();
      this.missionCompleteAudio.play();
      clearInterval(this.intervalId)
      this.ctx.fillStyle = "#FFF"
      this.ctx.font = "30px Roboto";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "MISSION COMPLETE",
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      );

    }

  }

}