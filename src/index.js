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
        
        var P1scoreText = 0;
        var P2scoreText = 0;
        P1scoreText = this.add.text(16, 16, 'P1 Score: 0', { fontSize: '32px', fill: '#000' });
        P2scoreText = this.add.text(565, 16, 'P2 Score: 0', { fontSize: '32px', fill: '#000' });


        var gravity = new b2Vec2(0,-15);
        window.world = this.myWorld = new b2World(gravity);

        this.physics = new LiquidFunPhysics(this.myWorld, { scale: 120, center: [400,400], flip: true });

        var bd = new b2BodyDef();
        var ground = world.CreateBody(bd);
        
        // var shape1 = new b2PolygonShape();
        // var vertices = shape1.vertices;
        // vertices.push(new b2Vec2(-4, -1));
        // vertices.push(new b2Vec2(4, -1));
        // vertices.push(new b2Vec2(4, 0));
        // vertices.push(new b2Vec2(-4, 0));
        // ground.CreateFixtureFromShape(shape1, 0);

        // var shape2 = new b2PolygonShape();
        // var vertices = shape2.vertices;
        // vertices.push(new b2Vec2(-4, -0.1));
        // vertices.push(new b2Vec2(-2, -0.1));
        // vertices.push(new b2Vec2(-2, 2));
        // vertices.push(new b2Vec2(-4, 2));
        // ground.CreateFixtureFromShape(shape2, 0);

        // var shape3 = new b2PolygonShape();
        // var vertices = shape3.vertices;
        // vertices.push(new b2Vec2(2, -0.1));
        // vertices.push(new b2Vec2(4, -0.1));
        // vertices.push(new b2Vec2(4, 2));
        // vertices.push(new b2Vec2(2, 2));
        // ground.CreateFixtureFromShape(shape3, 0);

        var psd = new b2ParticleSystemDef();
        psd.radius = 0.035;
        var particleSystem = world.CreateParticleSystem(psd);
        this.jelloSystem = particleSystem;
        const jello = this.add.particles('jello');        

        //first group
        var trapezoid = new b2PolygonShape();
        var trapezoid_vertices = trapezoid.vertices;
        trapezoid_vertices.push(new b2Vec2(-0.5, -0.3));
        trapezoid_vertices.push(new b2Vec2(0.5, -0.3));
        trapezoid_vertices.push(new b2Vec2(0.3, 0.4));
        trapezoid_vertices.push(new b2Vec2(-0.3, 0.4));

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

        // //cicle
        // bd = new b2BodyDef();
        // var circle = new b2CircleShape();
        // circle.phaserSprite = this.add.image(0, 0, 'ball');
        // circle.phaserSprite.setScale(1.1);
        // bd.type = b2_dynamicBody;
        // var body = world.CreateBody(bd);
        // circle.position.Set(0, 8);
        // circle.radius = 0.38;
        // body.CreateFixtureFromShape(circle, 0.5);

        // coolwhip test

        // const level1Json =
        //     {
        //         "jellostart": {"x" : -2.5, "y" : 3},

        //         "coolwhip": {
        //             "sprite": "coolwhip",
        //             "shapes": [
        //                 [{ x: 34, y: 12}, { x: 37, y: 52}],
        //                 [{ x: 34, y: 12}, { x: 37, y: 52}],
        //             ]
        //         }


        //     };


        var coolwhip_shape = new b2PolygonShape();
        coolwhip_shape.position.Set(2, 1.5);

        coolwhip_shape.phaserSprite = this.add.image(0,0,'coolwhip');
        coolwhip_shape.phaserSprite.setScale(0.3);

        var coolwhip_vertices = coolwhip_shape.vertices;
        coolwhip_vertices.push(new b2Vec2(1.2, 0.75));
        coolwhip_vertices.push(new b2Vec2(1.98, 0.75));
        coolwhip_vertices.push(new b2Vec2(1.2, 1.71));
        coolwhip_vertices.push(new b2Vec2(1, 1.71));
        ground.CreateFixtureFromShape(coolwhip_shape, 0);

        var coolwhip_shape2 = new b2PolygonShape();
        coolwhip_shape2.position.Set(0.5, 0.5);

        var coolwhip_vertices2 = coolwhip_shape2.vertices;
        coolwhip_vertices2.push(new b2Vec2(1.98, 0.75));
        coolwhip_vertices2.push(new b2Vec2(2.71, 0.75));
        coolwhip_vertices2.push(new b2Vec2(2.71, 1.71));
        coolwhip_vertices2.push(new b2Vec2(2.9, 1.71));
        ground.CreateFixtureFromShape(coolwhip_shape2, 0);


        //flipper

        var polygon_shape = new b2PolygonShape();
        polygon_shape.phaserCentroid = new b2Vec2(0,0);
        polygon_shape.SetAsBoxXYCenterAngle(1.24, 0.1, polygon_shape.phaserCentroid, 0.0); //changed this to be half the length of the flippersprite

        polygon_shape.phaserSprite = this.add.image(0,0,'flipper'); 

        var bd = new b2BodyDef;
        bd.position.Set(-1.8, -0.8);
        bd.angle = -0.1;

        polygon_shape.phaserSprite.setScale(.7);

        bd.type = b2_dynamicBody;
        bd.bullet = true;
        bd.density = 10000;

        var body = world.CreateBody(bd);   
        body.CreateFixtureFromShape(polygon_shape, 2.0);

        let paddleMotorDef = new b2RevoluteJointDef();
        paddleMotorDef.phaserSprite;
        paddleMotorDef.lowerAngle = -.01 * Math.PI;
        paddleMotorDef.upperAngle = .1 * Math.PI;
        paddleMotorDef.enableLimit = true;
        paddleMotorDef.maxMotorTorque = 250.0;
        paddleMotorDef.enableMotor = true;
        paddleMotorDef.collideConnected = false;

        var focalPoint = new b2Vec2(-3.2, -0.6); //got these numbers by clicking on the screen and copying coordinates for where i want the flipper to rotate around
        this.paddleMotor = paddleMotorDef.InitializeAndCreate(ground,body,focalPoint);

        
        this.input.keyboard.on('keydown-SPACE', (event) => {
            this.paddleMotor.SetMotorSpeed(100);
        });

        this.input.keyboard.on('keyup-SPACE', (event) => {
            this.paddleMotor.SetMotorSpeed(-100);
 
           
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
            var mousex = (game.input.mousePointer.x - 400) / 120;
            var mousey = (game.input.mousePointer.y - 400) / -120;

            console.log('x = ' + mousex);
            console.log('y = ' + mousey);
        });

        // this.centroidTest = this.add.image(0, 0, 'ball');
        // this.centroidTest.setScale(0.1);
    }

    update(t,dt) {
        this.physics.update(dt);
        const jelloPos = this.physics.computeParticleCentroid(
        this.jelloSystem, this.group1);
        console.log(jelloPos);    
        if(jelloPos.y <= -2){
            this.scene.restart();
        }
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

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#606C86',
    scene: MyGame
};

const game = new Phaser.Game(config);
