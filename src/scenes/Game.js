import player1Img from '../assets/sprites/player1.png';
import player2Img from '../assets/sprites/player2.png';

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

    preload ()
    {
        this.load.image('player1', player1Img);
        this.load.image('player2', player2Img);
        this.load.image('backboard', backboardImg);
    
        Jello.preload(this);
        Hoop.preload(this);
        Flipper.preload(this);
    }
      
    create ()
    {
        this.timeUntilNextJello = 0;

        this.player1 = new player(1,0,0,this);
        this.player2 = new player(2,0,0,this);
        this.player1.displayScore();
        this.player2.displayScore();

        var backboard = this.add.image(500, 200, 'backboard');
        backboard.setScale(0.3);

        var gravity = new b2Vec2(0,-15);
        window.world = this.myWorld = new b2World(gravity);
        var ground = world.CreateBody(new b2BodyDef());

        this.physics = new LiquidFunPhysics(this.myWorld, { scale: 60, center: [500,500], flip: true });
        
        Jello.addParticleSystemToScene(this);     

        this.jellos = [];

        //hoop
        this.hoop1 = new Hoop({x: 0, y: 5}, this, ground);

        this.leftFlipper = new Flipper({x: -6, y: 0}, this, ground);
        this.rightFlipper = new Flipper({x: 6, y: 0}, this, ground);


        console.log(this.rightFlipper.getPos());


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
            var pgd = new b2ParticleGroupDef();
            pgd.flags = b2_springParticle;
            pgd.groupFlags = b2_solidParticleGroup;
            pgd.shape = trapezoid;
            pgd.position.Set(-2, 3);
            this.group1 = particleSystem.CreateParticleGroup(pgd);
            this.group1.phaserParticleEmitters = [
                jello.createEmitter({
                    tint: 0xFF0000,
                    blendMode: Phaser.BlendModes.ADD,
                    scale: 0.3,
                })
            ];
        });


        this.input.on('pointerdown', () => {
            var mousex = (this.input.mousePointer.x - 500) / 60;
            var mousey = (this.input.mousePointer.y - 500) / -60;

            console.log('x = ' + mousex);
            console.log('y = ' + mousey);
        });

    }

    update(t,dt) {
        this.timeUntilNextJello -= dt;
        if(this.timeUntilNextJello < 0 ){
            var jello1 = new Jello({ x: -6.65, y: 8 }, this, 1);
            var jello2 = new Jello({x: 6.65, y: 8 }, this, 2);
            this.jellos.push(jello1);
            this.jellos.push(jello2);
            this.timeUntilNextJello = 2000;
        }
        this.physics.update(dt);
       
        // something like this:

        for (let jello of this.jellos){
            if(this.physics.toPhaserCoord(jello.getPosition()).y > this.sys.game.canvas.height + 100 ){
                jello.destroy();
            }
         
        }

        for(let jello of this.jellos){
         if(jello.getPosition().x >= this.hoop1.getMinPos().x
            && jello.getPosition().x <= this.hoop1.getMaxPos().x
            && jello.getPosition().y <= this.hoop1.getMaxPos().y && jello.getPosition().y >= this.hoop1.getMaxPos().y - .5
           ){
                var player = jello.getPlayer();
                if(player == 1){
                    this.player1.updatePlayerScore();
                    this.time.now + 2000

                }
                if(player == 2){
                    this.player2.updatePlayerScore();
                    this.time.now + 2000

                }
            } 
        }

        this.jellos = this.jellos.filter((jello) => !jello.isDestroyed);
    }

}


export default MyGame;