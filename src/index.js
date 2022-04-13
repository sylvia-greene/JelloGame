import Phaser from 'phaser';

import logoImg from './assets/logo.png';
import flipperImg from './assets/flipper.png';
import ballImg from './assets/ball.png';

import LiquidFunPhysics from './lf-phaser.js';


var velocityIterations = 8;
var positionIterations = 10;
// var bd = new b2BodyDef;
// var ground;
var shape = new b2EdgeShape;

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('ball', ballImg);
        this.load.image('logo', logoImg);
        this.load.image('flipper',flipperImg);
    }
      
    create ()
    {
        // ball
        this.myBallSprite = this.add.image(300, 100, 'ball');

        var gravity = new b2Vec2(0, 150);
        window.world = this.myWorld = new b2World(gravity);

        this.physics = new LiquidFunPhysics(this.myWorld, { scale: 1, flip: false });

        var bd = new b2BodyDef();
        var ground = this.myWorld.CreateBody(bd);

        var fd = new b2FixtureDef;
        fd.shape = shape;
        fd.density = 0.0;
        fd.friction = 0.75;

        // jelly testzone floor
        shape = new b2EdgeShape;
        shape.Set(new b2Vec2(0, 500), new b2Vec2(1000, 500));
        fd.shape = shape;
        ground.CreateFixtureFromDef(fd);

        // circle
        bd = new b2BodyDef();
        var circle = new b2CircleShape();
        circle.phaserSprite = this.myBallSprite;
        bd.type = b2_dynamicBody;
        bd.density = 1e-14;  // has no effect??!?
        bd.position.Set(300, 0); 
        this.ballBody = this.myWorld.CreateBody(bd);
        this.ballBody.bullet = true;
        bd.friction = 0;
        circle.radius = this.myBallSprite.width / 2;
        this.ballBody.CreateFixtureFromShape(circle, 0.0001);

        //flipper
        this.flipperSprite = this.add.image(300,100,'flipper');

        const paddleShape = new b2PolygonShape;
        const paddleCentroid = new b2Vec2(-this.flipperSprite.width/2, 0);
        paddleShape.SetAsBoxXYCenterAngle(
            this.flipperSprite.width / 2,
            this.flipperSprite.height / 2,
            paddleCentroid, 0);
        paddleShape.phaserCentroid = paddleCentroid;
        paddleShape.phaserSprite = this.flipperSprite;

        this.paddleDef = new b2BodyDef;
        this.paddleDef.position.Set(500, 300);
        this.paddleDef.type = b2_dynamicBody;
        this.paddleDef.bullet = true;
        this.paddle = this.myWorld.CreateBody(this.paddleDef);
        this.paddleFixture = this.paddle.CreateFixtureFromShape(paddleShape, 200.0);

        let paddleMotorDef = new b2RevoluteJointDef;
        paddleMotorDef.lowerAngle = 0.25 * Math.PI;
        paddleMotorDef.upperAngle = -0.25 * Math.PI;
        paddleMotorDef.enableLimit = true;
        paddleMotorDef.maxMotorTorque = 3e10;
        paddleMotorDef.enableMotor = true;
        this.paddleMotor = paddleMotorDef.InitializeAndCreate(
            ground,
            this.paddle,
            this.paddleDef.position);
        
        this.input.keyboard.on('keydown-SPACE', (event) => {
            this.paddleMotor.SetMotorSpeed(10);
            this.paddleMotor.EnableMotor(true);
        });

        this.input.keyboard.on('keyup-SPACE', (event) => {
            this.paddleMotor.SetMotorSpeed(-10);
        });
    }

    update(dt) {
        this.physics.update(dt);
        console.log(this.flipperSprite.x)
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);
