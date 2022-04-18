import Phaser from 'phaser';

import logoImg from './assets/logo.png';
import flipperImg from './assets/flipper.png';
import ballImg from './assets/ball.png';
import jelloImg from './assets/jello.png';
import coolwhipImg from './assets/sprites/coolwhip.png';

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
        this.load.image('coolwhip', coolwhipImg);
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
        // var box = new b2PolygonShape();
        // box.SetAsBoxXY(0.5, 0.5);
        // var pgd = new b2ParticleGroupDef();
        // pgd.flags = b2_springParticle;
        // pgd.groupFlags = b2_solidParticleGroup;
        // pgd.shape = box;
        // pgd.position.Set(0, 3);
        // const group1 = particleSystem.CreateParticleGroup(pgd);
        // group1.phaserParticleEmitters = [
        //     jello.createEmitter({
        //         tint: 0xFF0000,
        //         blendMode: Phaser.BlendModes.ADD,
        //         scale: 0.3,
        //     })
        // ];

    //     //second group 
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

    //  // third group
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

        // coolwhip test

        // var coolwhip_shape = new b2PolygonShape();
        // coolwhip_shape.position.Set(0.5, 0.5);

        // coolwhip_shape.phaserSprite = this.add.image(0,0,'coolwhip');
        // coolwhip_shape.phaserSprite.setScale(0.3);

        // var coolwhip_vertices = coolwhip_shape.vertices;
        // coolwhip_vertices.push(new b2Vec2(-0.3, -0.4));
        // coolwhip_vertices.push(new b2Vec2(0.46, -0.4));
        // coolwhip_vertices.push(new b2Vec2(-0.55, 0.75));
        // ground.CreateFixtureFromShape(coolwhip_shape, 0);

        // var coolwhip_shape2 = new b2PolygonShape();
        // coolwhip_shape2.position.Set(0.5, 0.5);

        // var coolwhip_vertices2 = coolwhip_shape2.vertices;
        // coolwhip_vertices2.push(new b2Vec2(0.46, -0.4));
        // coolwhip_vertices2.push(new b2Vec2(1.23, -0.4));
        // coolwhip_vertices2.push(new b2Vec2(1.45, 0.73));
        // ground.CreateFixtureFromShape(coolwhip_shape2, 0);


        //flipper

       
        var polygon_shape = new b2PolygonShape();
        polygon_shape.phaserCentroid = new b2Vec2 (0.0,0);
        polygon_shape.phaserSprite = this.add.image(0,0,'flipper'); //i don't actually think this is doing anything
        polygon_shape.SetAsBoxXYCenterAngle(5, 0.001, polygon_shape.phaserCentroid, 0.0);
        var bd = new b2BodyDef;
        bd.position.Set(0,0.0);
        // polygon_shape.phaserSprite = this.add.image(0,10,'flipper');
        polygon_shape.phaserSprite.setScale(.9);
        
        bd.type = b2_dynamicBody;
        bd.bullet = true;
        bd.density = 10000;
   
        var body = world.CreateBody(bd);   
        body.CreateFixtureFromShape(polygon_shape, 2.0);
  

        let paddleMotorDef = new b2RevoluteJointDef();
        paddleMotorDef.phaserSprite;
        paddleMotorDef.lowerAngle = 0 * Math.PI;
        paddleMotorDef.upperAngle = .25 * Math.PI;
        paddleMotorDef.enableLimit = true;
        paddleMotorDef.maxMotorTorque = 200000.0;
        paddleMotorDef.enableMotor = true;
        paddleMotorDef.collideConnected = false;

       // var focalPoint = new b2Vec2(-1.2,polygon_shape.phaserCentroid.y);
       var focalPoint = new b2Vec2(-1.2,1);
       
        this.paddleMotor = paddleMotorDef.InitializeAndCreate(ground,body,focalPoint);
        
        // this.flipperSpeed = 20;
        // paddleMotorDef.motorSpeed = this.flipperSpeed;

 
        this.input.keyboard.on('keydown-SPACE', (event) => {
            this.paddleMotor.SetMotorSpeed(100);
        
            console.log(this.paddleMotor);
        });

        this.input.keyboard.on('keyup-SPACE', (event) => {
            this.paddleMotor.SetMotorSpeed(-100);
            
            console.log(this.paddleMotor);
        });

        this.input.on('pointerdown', () => {
            var mousex = (game.input.mousePointer.x - 400) / 120;
            var mousey = (game.input.mousePointer.y - 400) / -120;

            console.log('x = ' + mousex);
            console.log('y = ' + mousey);
        });
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
