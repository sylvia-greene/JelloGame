import backboardImg from '../assets/sprites/backboard.png';

import LiquidFunPhysics from '../lf-phaser.js';

import Jello from '../jello.js';
import Hoop from '../hoop.js';
import player from '../player';
import Flipper from '../flipper.js';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super('MyGame');
    }

    init(data){
        this.colorArray = data.color;
    }

    preload ()
    {
        this.load.image('backboard', backboardImg);
    
        Jello.preload(this);
        Hoop.preload(this);
        Flipper.preload(this);
    }
      
    create ()
    {
        this.timeUntilNextJello = 0;
        this.playTime = 500000;
        this.timerText = this.add.text(475, 16, '', {fontSize: '32px', fill:'#000'});

//create players array
        this.players = [];
        this.player1 = new player(1,0,0,this);
        this.player2 = new player(2,0,0,this);
        this.players.push(this.player1);
        this.players.push(this.player2);
        this.winner = '';

        for(let person of this.players){
            person.displayScore();
        }


        var backboard = this.add.image(500, 200, 'backboard');
        backboard.setScale(0.3);

        var gravity = new b2Vec2(0,-15);
        window.world = this.myWorld = new b2World(gravity);
        var ground = world.CreateBody(new b2BodyDef());

        this.physics = new LiquidFunPhysics(this.myWorld, { scale: 60, center: [500,500], flip: true });
        
        Jello.addParticleSystemToScene(this);     

        this.jellos = [];

        this.hoop1 = new Hoop({x: 0, y: 5}, this, ground);

        this.leftFlipper = new Flipper({x: -6, y: 0}, this, ground, this.colorArray[0]);
        this.rightFlipper = new Flipper({x: 6, y: 0}, this, ground, this.colorArray[1]);

        this.input.keyboard.on('keydown-Q', (event) => {
            this.leftFlipper.moveFlipper();
        });

        this.input.keyboard.on('keyup-Q', (event) => {
            this.leftFlipper.moveFlipperBack();
        });


        this.input.keyboard.on('keydown-P', (event) => {
            this.rightFlipper.moveFlipper();
        }); 

        this.input.keyboard.on('keyup-P', (event) => {
            this.rightFlipper.moveFlipperBack();
        });

        this.input.keyboard.on('keydown-X', (event) => {
            console.log(this.player1.score);
        });
    }

    update(t,dt) {
        this.playTime -=  dt;
        var timer = Math.round((this.playTime)/1000);
        this.timerText.setText(timer);

        if (timer <= 0){
            this.scene.pause();
            // add win scene
            if (this.player2.score > this.player1.score){
                this.winner = this.player2.playerName;
            }
            if (this.player1.score > this.player2.score){
                this.winner = this.player1.playerName;
            }
            if (this.player1.score = this.player2.score){
                this.winner = "it's a tie!";
            }
            this.scene.start('GameOver', {winningPlayer: this.winner});
        }

        this.timeUntilNextJello -= dt;

        if(this.timeUntilNextJello < 0 ){
            var jello1 = new Jello({ x: -6.65, y: 8 }, this, 1, this.colorArray[0]);
            var jello2 = new Jello({x: 6.65, y: 8 }, this, 2, this.colorArray[1]);
            this.jellos.push(jello1);
            this.jellos.push(jello2);
            this.timeUntilNextJello = 2000;
        }
        this.physics.update(dt);

        for (let jello of this.jellos){
            if(this.physics.toPhaserCoord(jello.getPosition()).y > this.sys.game.canvas.height + 100 ){
                jello.destroy();
            }
        }

        for(let jello of this.jellos){
         if(!jello.isScored  
            && jello.getPosition().x >= this.hoop1.getMinPos().x
            && jello.getPosition().x <= this.hoop1.getMaxPos().x
            && jello.getPosition().y <= this.hoop1.getMaxPos().y && jello.getPosition().y  >= this.hoop1.getMaxPos().y - .3
           ){
               var player = jello.getPlayer();
               if(player == 1 ){
                   this.player1.updatePlayerScore();
               }
               if(player == 2){
                   this.player2.updatePlayerScore();
               }

               jello.isScored = true;
            } 
        }
        this.jellos = this.jellos.filter((jello) => !jello.isDestroyed);
    }

}


export default MyGame;