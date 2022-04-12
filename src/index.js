import Phaser from 'phaser';

import logoImg from './assets/logo.png';
import flipperImg from './assets/flipper.png';
import ballImg from './assets/ball.png';


var timeStep = 1/60.0;
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

        var gravity = new b2Vec2(0, 1500);
        window.world = this.myWorld = new b2World(gravity);

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
        bd.type = b2_dynamicBody;
        bd.position.Set(300, 0); 
        this.ballBody = this.myWorld.CreateBody(bd);
        this.ballBody.bullet = true;
        bd.friction = 0;
        circle.radius = this.myBallSprite.width / 2;
        this.ballBody.CreateFixtureFromShape(circle, 0.5);

        //flipper
        this.flipperSprite = this.add.image(300,100,'flipper');

        const paddleShape = new b2PolygonShape;
        const paddleCentroid = new b2Vec2(100, 0);
        paddleShape.SetAsBoxXYCenterAngle(
            this.flipperSprite.width / 2,
            this.flipperSprite.height / 2,
            paddleCentroid, 0);
        paddleShape.phaserCentroid = paddleCentroid;
        paddleShape.phaserUpdate = (shape, transform) => {
            var transformedPos = new b2Vec2();
            var centroidPos = new b2Vec2();
            b2Vec2.Add(centroidPos, shape.position, shape.phaserCentroid)
            b2Vec2.Mul(transformedPos, transform, centroidPos);
            this.flipperSprite.setPosition(transformedPos.x, transformedPos.y);
            this.flipperSprite.setAngle(180 / Math.PI * Math.atan2(transform.q.c, transform.q.s));
        };

        this.paddleDef = new b2BodyDef;
        this.paddleDef.position.Set(400, 300);
        this.paddleDef.type = b2_dynamicBody;
        this.paddleDef.bullet = true;
        this.paddleDef.density = 10000;
        this.paddle = this.myWorld.CreateBody(this.paddleDef);
console.log("paddle.GetPosition() when created", this.paddle.GetPosition())
        this.paddleFixture = this.paddle.CreateFixtureFromShape(paddleShape, 2.0);

        
        let paddleMotorDef = new b2RevoluteJointDef;
        paddleMotorDef.lowerAngle = -2* Math.PI;
        paddleMotorDef.upperAngle = 2* Math.PI;
        paddleMotorDef.enableLimit = true;
        paddleMotorDef.maxMotorTorque = 2000000.0;
        paddleMotorDef.enableMotor = true;
        this.paddleMotor = paddleMotorDef.InitializeAndCreate(
            ground,
            this.paddle,
            this.paddleDef.position);
        
        this.flipperSpeed = 100;
        paddleMotorDef.motorSpeed = this.flipperSpeed;
    }

    update() {
        this.myWorld.Step(timeStep,velocityIterations,positionIterations);

        // Adopted from liquidfun testbed: https://github.com/google/liquidfun/blob/master/liquidfun/Box2D/lfjs/testbed/renderer.js
        for (var body of world.bodies) {
            var transform = body.GetTransform();
            for (var fixture of body.fixtures) {
                //console.log(fixture.shape, transform);
                const phaserUpdate = fixture.shape.phaserUpdate;
                if (phaserUpdate) {
                    phaserUpdate(fixture.shape, transform);
                }
            }
        }
        
        // let {x,y} = this.ballBody.GetPosition();
        // this.myBallSprite.setPosition(x,y);

        // let paddlePos = this.paddle.GetPosition();
        // this.flipperSprite.setPosition(paddlePos.x, paddlePos.y);
        // this.flipperSprite.setRotation(this.paddle.GetAngle());

        // if (spaceBar.isDown){
        //     this.myBallSprite.setPosition(x,y)
        // }
        
        
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
