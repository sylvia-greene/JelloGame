import Phaser, { Create } from 'phaser';

import player1Img from './assets/sprites/player1.png';
import player2Img from './assets/sprites/player2.png';

import backboardImg from './assets/sprites/backboard.png';
import hoopImg from './assets/sprites/hoop.png';

import LiquidFunPhysics from './lf-phaser.js';
import Title from './scenes/Title.js';

import Jello from './jello.js';
import Hoop from './hoop.js';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('player1', player1Img);
        this.load.image('player2', player2Img);
        this.load.image('backboard', backboardImg);
    
        Jello.preload(this);
        Hoop.preload(this);
    }
      
    create ()
    {
        this.timeUntilNextJello = 0;
        var P1scoreText = 0;
        var P2scoreText = 0;
  
        this.timer = this.time.addEvent({ delay: 1000, callback: false, callbackScope: this, loop: true });

        P1scoreText = this.add.text(16, 16, 'P1 Score: 0', { fontSize: '32px', fill: '#000' });
        P2scoreText = this.add.text(750, 16, 'P2 Score: 0', { fontSize: '32px', fill: '#000' });

        var backboard = this.add.image(500, 200, 'backboard');
        backboard.setScale(0.3);

        var gravity = new b2Vec2(0,-15);
        window.world = this.myWorld = new b2World(gravity);
        var ground = world.CreateBody(new b2BodyDef());

        this.physics = new LiquidFunPhysics(this.myWorld, { scale: 60, center: [500,500], flip: true });
        
        Jello.addParticleSystemToScene(this);     

        this.jellos = [];


        //hoop
        var hoop1 = new Hoop({x: 0, y: 5}, this, ground);

        //flipper

        var polygon_shape = new b2PolygonShape();
        polygon_shape.phaserCentroid = new b2Vec2(0,0);
        polygon_shape.SetAsBoxXYCenterAngle(2.05, 0.1, polygon_shape.phaserCentroid, 0.0); //changed this to be half the length of the flippersprite

        polygon_shape.phaserSprite = this.add.image(0,0,'player1'); 

        var bd = new b2BodyDef;
        bd.position.Set(-6, 0);
        bd.angle = -0.10 * Math.PI;

        polygon_shape.phaserSprite.setScale(.55);

        bd.type = b2_dynamicBody;
        bd.bullet = true;
        bd.density = 10000;

        var body = world.CreateBody(bd);   
        body.CreateFixtureFromShape(polygon_shape, 1.0);

        let paddleMotorDef = new b2RevoluteJointDef();
        paddleMotorDef.lowerAngle = 0;
        paddleMotorDef.upperAngle = .15 * Math.PI;
        paddleMotorDef.enableLimit = true;
        paddleMotorDef.maxMotorTorque = 250.0;
        paddleMotorDef.enableMotor = true;
        paddleMotorDef.collideConnected = false;

        var focalPoint = new b2Vec2(-7.8, 0.6); //got these numbers by clicking on the screen and copying coordinates for where i want the flipper to rotate around
        this.paddleMotor = paddleMotorDef.InitializeAndCreate(ground,body,focalPoint);

        //flipper #2 

        var polygon_shape2 = new b2PolygonShape();
        polygon_shape2.phaserCentroid = new b2Vec2(0,0);
        polygon_shape2.SetAsBoxXYCenterAngle(2.05, 0.1, polygon_shape2.phaserCentroid, 0.0); //changed this to be half the length of the flippersprite

        polygon_shape2.phaserSprite = this.add.image(0,0,'player2'); 

        var bd2 = new b2BodyDef;
        bd2.position.Set(6, 0);
        bd2.angle = -.9 * Math.PI;

        polygon_shape2.phaserSprite.setScale(.55);

        bd2.type = b2_dynamicBody;
        bd2.bullet = true;
        bd2.density = 10000;

        var body2 = world.CreateBody(bd2);   
        body2.CreateFixtureFromShape(polygon_shape2, 1.0);

        let paddleMotorDef2 = new b2RevoluteJointDef();
        paddleMotorDef2.lowerAngle = -.15 * Math.PI;
        paddleMotorDef2.upperAngle = 0 ;
        paddleMotorDef2.enableLimit = true;
        paddleMotorDef2.maxMotorTorque = 250.0;
        paddleMotorDef2.enableMotor = true;
        paddleMotorDef2.collideConnected = false;

        var focalPoint2 = new b2Vec2(7.8, .6); //got these numbers by clicking on the screen and copying coordinates for where i want the flipper to rotate around
        this.paddleMotor2 = paddleMotorDef2.InitializeAndCreate(ground,body2,focalPoint2);


        this.input.keyboard.on('keydown-Q', (event) => {
            this.paddleMotor.SetMotorSpeed(85);
        });

        this.input.keyboard.on('keyup-Q', (event) => {
            this.paddleMotor.SetMotorSpeed(-85);
        });


        this.input.keyboard.on('keydown-P', (event) => {
            this.paddleMotor2.SetMotorSpeed(-85);
        }); 

        this.input.keyboard.on('keyup-P', (event) => {
            this.paddleMotor2.SetMotorSpeed(85);
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
            var mousex = (game.input.mousePointer.x - 500) / 60;
            var mousey = (game.input.mousePointer.y - 500) / -60;

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
            if(this.physics.toPhaserCoord(jello.getPosition()).y > this.sys.game.canvas.height){
                jello.destroy();
            }
            // if jello.isInside(targetArea)
            //     jello.destroy()
        }

        this.jellos = this.jellos.filter((jello) => !jello.isDestroyed);
        // at regular time interval:
        //     for(jello element of jellos)
        //     {
        //         console.log(jello);
        //     }
        //     jello = new Jello(...)
        //     add it to this.jellos
        // */

    }

    updatePlayer1Score(P1score, jello){
        // When player 1's jello passes through the hoop's center coordinates player 1's score increases by 1
        // Here call function that recognizes jello passthrough
        P1score += 1;
        P1scoreText.setText('Score: ' + P1score);
    }

    updatePlayer2Score(P2score, jello){
        // When player 2's jello passes through the hoop's center coordinates player 2's score increases by 1
        // Here call function that recognizes jello passthrough
        P2score += 1;
        P2scoreText.setText('Score: ' + P2score);
    }
}
let titleScene = new Title();

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1000,
    height: 600,
    backgroundColor: '#606C86',
    scene: [
        Title,
        MyGame
    ]
};

const game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.start('TitleScene');

export default MyGame;