import Phaser from 'phaser';

import logoImg from './assets/logo.png';
import flipperImg from './assets/flipper.png';
import ballImg from './assets/ball.png';
import jelloImg from './assets/jello.png';

import LiquidFunPhysics from './lf-phaser.js';


// var velocityIterations = 8;
// var positionIterations = 10;
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
        this.load.image('jello', jelloImg);
    }
      
    create ()
    {
        var gravity = new b2Vec2(0,-15);
        window.world = this.myWorld = new b2World(gravity);

        this.physics = new LiquidFunPhysics(this.myWorld, { scale: 120,center: [400,400], flip: true });

        var bd = new b2BodyDef();
        var ground = world.CreateBody(bd);
        
        var shape1 = new b2PolygonShape();
        var vertices = shape1.vertices;
        vertices.push(new b2Vec2(-4, -1));
        vertices.push(new b2Vec2(4, -1));
        vertices.push(new b2Vec2(4, 0));
        vertices.push(new b2Vec2(-4, 0));
        ground.CreateFixtureFromShape(shape1, 0);

        var shape2 = new b2PolygonShape();
        var vertices = shape2.vertices;
        vertices.push(new b2Vec2(-4, -0.1));
        vertices.push(new b2Vec2(-2, -0.1));
        vertices.push(new b2Vec2(-2, 2));
        vertices.push(new b2Vec2(-4, 2));
        ground.CreateFixtureFromShape(shape2, 0);

        var shape3 = new b2PolygonShape();
        var vertices = shape3.vertices;
        vertices.push(new b2Vec2(2, -0.1));
        vertices.push(new b2Vec2(4, -0.1));
        vertices.push(new b2Vec2(4, 2));
        vertices.push(new b2Vec2(2, 2));
        ground.CreateFixtureFromShape(shape3, 0);

        var psd = new b2ParticleSystemDef();
        psd.radius = 0.035;
        var particleSystem = world.CreateParticleSystem(psd);

        const jello = this.add.particles('jello');        

        //first group
        var box = new b2PolygonShape();
        box.SetAsBoxXY(0.5, 0.5);
        var pgd = new b2ParticleGroupDef();
        pgd.flags = b2_springParticle;
        pgd.groupFlags = b2_solidParticleGroup;
        pgd.shape = box;
        pgd.position.Set(0, 3);
        const group1 = particleSystem.CreateParticleGroup(pgd);
        group1.phaserParticleEmitters = [
            jello.createEmitter({
                tint: 0xFF0000,
                blendMode: Phaser.BlendModes.ADD,
                scale: 0.3,
            })
        ];
        // this.myBallSprite = this.add.image(300, 100, 'ball');

        //second group 
        var box = new b2PolygonShape();
        box.SetAsBoxXY(0.4, 0.4);
        pgd = new b2ParticleGroupDef();
        pgd.flags = b2_elasticParticle;
        pgd.groupFlags = b2_solidParticleGroup;
        pgd.position.Set(-1, 3);
        pgd.shape = box;
        const group2 = particleSystem.CreateParticleGroup(pgd);
        group2.phaserParticleEmitters = [
            jello.createEmitter({
                tint: 0x00FF00,
                blendMode: Phaser.BlendModes.ADD,
                scale: 0.3,
            })
        ];

     // third group
        var box = new b2PolygonShape();
        box.SetAsBoxXY(1, 0.5);
        var pgd = new b2ParticleGroupDef();
        pgd.flags = b2_elasticParticle;
        pgd.groupFlags = b2_solidParticleGroup;
        pgd.position.Set(1, 4);
        pgd.angle = -0.5;
        pgd.angularVelocity = 2;
        pgd.shape = box;
        const group3 = particleSystem.CreateParticleGroup(pgd)
        group3.phaserParticleEmitters = [
            jello.createEmitter({
                tint: 0x0000FF,
                blendMode: Phaser.BlendModes.ADD,
                scale: 0.3,
         })
     ];

        //cicle
        bd = new b2BodyDef();
        var circle = new b2CircleShape();
        circle.phaserSprite = this.add.image(0, 0, 'ball');
        circle.phaserSprite.setScale(1.1);
        bd.type = b2_dynamicBody;
        var body = world.CreateBody(bd);
        circle.position.Set(0, 8);
        circle.radius = 0.5;
        body.CreateFixtureFromShape(circle, 0.5);

        //flipper
        bd = new b2BodyDef();
        var paddleShape = new b2PolygonShape();
        // const paddleCentroid = new b2Vec2(-this.flipperSprite.width/2, 0);
        // paddleShape.SetAsBoxXYCenterAngle(
        //     this.flipperSprite.width / 2,
        //     this.flipperSprite.height / 2,
        //     paddleCentroid, 0);
        // paddleShape.phaserCentroid = paddleCentroid;
        paddleShape.phaserSprite = this.add.image(0,0,'flipper');
        paddleShape.phaserSprite.setScale(1.1);
        bd.type = b2_dynamicBody;
        var body = world.CreateBody(bd);
        paddleShape.position.Set(0,2);
        var paddle = body.CreateFixtureFromShape(paddleShape,0.5);

        let paddleMotorDef = new b2RevoluteJointDef;
        paddleMotorDef.lowerAngle = 0.25 * Math.PI;
        paddleMotorDef.upperAngle = -0.25 * Math.PI;
        paddleMotorDef.enableLimit = true;
        paddleMotorDef.maxMotorTorque = 3e10;
        paddleMotorDef.enableMotor = true;
        var coord = new b2Vec2(0,0);
        this.paddleMotor = paddleMotorDef.InitializeAndCreate(
            ground,
            body,
            coord);

        console.log(paddleShape.position);
        console.log(this.paddleMotor);    
        // this.input.keyboard.on('keydown-SPACE', (event) => {
        //     this.paddleMotor.SetMotorSpeed(10);
        //     this.paddleMotor.EnableMotor(true);
        // });

        // this.input.keyboard.on('keyup-SPACE', (event) => {
        //     this.paddleMotor.SetMotorSpeed(-10);
        // });
    }

    update(t,dt) {
        this.physics.update(dt);

    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#002266',
    scene: MyGame
};

const game = new Phaser.Game(config);
