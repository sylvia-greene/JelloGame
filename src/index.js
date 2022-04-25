import Phaser, { Create } from 'phaser';

import logoImg from './assets/logo.png';
import flipperImg from './assets/flipper.png';
import ballImg from './assets/ball.png';
import jelloImg from './assets/jello.png';
import coolwhipImg from './assets/sprites/coolwhip.png';

import LiquidFunPhysics from './lf-phaser.js';


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
        P2scoreText = this.add.text(750, 16, 'P2 Score: 0', { fontSize: '32px', fill: '#000' });


        var gravity = new b2Vec2(0,-15);
        window.world = this.myWorld = new b2World(gravity);

        this.physics = new LiquidFunPhysics(this.myWorld, { scale: 60, center: [500,500], flip: true });

        var bd = new b2BodyDef();
        var ground = world.CreateBody(bd);     

        var psd = new b2ParticleSystemDef();
        psd.radius = 0.065;
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
        pgd.position.Set(-6.65, 6);
        this.group1 = particleSystem.CreateParticleGroup(pgd);
        this.group1.phaserParticleEmitters = [
            jello.createEmitter({
                tint: 0xFF0000,
                blendMode: Phaser.BlendModes.ADD,
                scale: 0.3,
            })
        ];
        
      

        var psd2 = new b2ParticleSystemDef();
        psd2.radius = 0.065;
        var particleSystem2 = world.CreateParticleSystem(psd2);
        this.jelloSystem2 = particleSystem2;
        const jello2 = this.add.particles('jello');        

        //second group
        var trapezoid2 = new b2PolygonShape();
        var trapezoid_vertices2 = trapezoid2.vertices;
        trapezoid_vertices2.push(new b2Vec2(-0.5, -0.3));
        trapezoid_vertices2.push(new b2Vec2(0.5, -0.3));
        trapezoid_vertices2.push(new b2Vec2(0.3, 0.4));
        trapezoid_vertices2.push(new b2Vec2(-0.3, 0.4));

        var pgd2 = new b2ParticleGroupDef();
        pgd2.flags = b2_springParticle;
        pgd2.groupFlags = b2_solidParticleGroup;
        pgd2.shape = trapezoid2;
        pgd2.position.Set(6.65, 6);
        this.group2 = particleSystem.CreateParticleGroup(pgd2);
        this.group2.phaserParticleEmitters = [
            jello.createEmitter({
                tint: 0xFF0010,
                blendMode: Phaser.BlendModes.ADD,
                scale: 0.3,
            })
        ];



        // var coolwhip_shape = new b2PolygonShape();
        // coolwhip_shape.position.Set(2, 1.5);

        // coolwhip_shape.phaserSprite = this.add.image(0,0,'coolwhip');
        // coolwhip_shape.phaserSprite.setScale(0.3);

        // var coolwhip_vertices = coolwhip_shape.vertices;
        // coolwhip_vertices.push(new b2Vec2(1.2, 0.75));
        // coolwhip_vertices.push(new b2Vec2(1.98, 0.75));
        // coolwhip_vertices.push(new b2Vec2(1.2, 1.71));
        // coolwhip_vertices.push(new b2Vec2(1, 1.71));
        // ground.CreateFixtureFromShape(coolwhip_shape, 0);

        // var coolwhip_shape2 = new b2PolygonShape();
        // coolwhip_shape2.position.Set(0.5, 0.5);

        // var coolwhip_vertices2 = coolwhip_shape2.vertices;
        // coolwhip_vertices2.push(new b2Vec2(1.98, 0.75));
        // coolwhip_vertices2.push(new b2Vec2(2.71, 0.75));
        // coolwhip_vertices2.push(new b2Vec2(2.71, 1.71));
        // coolwhip_vertices2.push(new b2Vec2(2.9, 1.71));
        // ground.CreateFixtureFromShape(coolwhip_shape2, 0);


        //flipper

        var polygon_shape = new b2PolygonShape();
        polygon_shape.phaserCentroid = new b2Vec2(0,0);
        polygon_shape.SetAsBoxXYCenterAngle(2.05, 0.1, polygon_shape.phaserCentroid, 0.0); //changed this to be half the length of the flippersprite

        polygon_shape.phaserSprite = this.add.image(0,0,'flipper'); 

        var bd = new b2BodyDef;
        bd.position.Set(-6, -0);
        bd.angle = -0.10 * Math.PI;

        polygon_shape.phaserSprite.setScale(.55);

        bd.type = b2_dynamicBody;
        bd.bullet = true;
        bd.density = 10000;

        var body = world.CreateBody(bd);   
        body.CreateFixtureFromShape(polygon_shape, 1.0);

        let paddleMotorDef = new b2RevoluteJointDef();
        paddleMotorDef.phaserSprite;
        paddleMotorDef.lowerAngle = 0;
        paddleMotorDef.upperAngle = .15 * Math.PI;
        paddleMotorDef.enableLimit = true;
        paddleMotorDef.maxMotorTorque = 250.0;
        paddleMotorDef.enableMotor = true;
        paddleMotorDef.collideConnected = false;

        var focalPoint = new b2Vec2(-7.8, 0.6); //got these numbers by clicking on the screen and copying coordinates for where i want the flipper to rotate around
        this.paddleMotor = paddleMotorDef.InitializeAndCreate(ground,body,focalPoint);

        

        // //flipper #2 

        var polygon_shape2 = new b2PolygonShape();
        polygon_shape2.phaserCentroid = new b2Vec2(0,0);
        polygon_shape2.SetAsBoxXYCenterAngle(2.05, 0.1, polygon_shape2.phaserCentroid, 0.0); //changed this to be half the length of the flippersprite

        polygon_shape2.phaserSprite = this.add.image(0,0,'flipper'); 

        var bd2 = new b2BodyDef;
        bd2.position.Set(6, -0);
        bd2.angle = -.9 * Math.PI;

        polygon_shape2.phaserSprite.setScale(.55);

        bd2.type = b2_dynamicBody;
        bd2.bullet = true;
        bd2.density = 10000;

        var body2 = world.CreateBody(bd2);   
        body2.CreateFixtureFromShape(polygon_shape2, 2.0);

        let paddleMotorDef2 = new b2RevoluteJointDef();
        paddleMotorDef2.phaserSprite;
        paddleMotorDef2.lowerAngle = -.15 * Math.PI;
        paddleMotorDef2.upperAngle = 0 ;
        paddleMotorDef2.enableLimit = true;
        paddleMotorDef2.maxMotorTorque = 250.0;
        paddleMotorDef2.enableMotor = true;
        paddleMotorDef2.collideConnected = false;

        var focalPoint2 = new b2Vec2(7.8, .6); //got these numbers by clicking on the screen and copying coordinates for where i want the flipper to rotate around
        this.paddleMotor2 = paddleMotorDef2.InitializeAndCreate(ground,body2,focalPoint2);


        this.input.keyboard.on('keydown-SPACE', (event) => {
            this.paddleMotor.SetMotorSpeed(85);
        });

        this.input.keyboard.on('keyup-SPACE', (event) => {
            this.paddleMotor.SetMotorSpeed(-85);
        });


        this.input.keyboard.on('keydown-SHIFT', (event) => {
            this.paddleMotor2.SetMotorSpeed(-85);
        }); 

        this.input.keyboard.on('keyup-SHIFT', (event) => {
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

        // this.centroidTest = this.add.image(0, 0, 'ball');
        // this.centroidTest.setScale(0.1);
    }

    update(t,dt) {
        this.physics.update(dt);
        const jelloPos = this.physics.computeParticleCentroid(
        this.jelloSystem, this.group1);
     
        if(jelloPos.y <= -2){
            
        }

        const jelloPos2 = this.physics.computeParticleCentroid(
            this.jelloSystem2, this.group2);
         
            if(jelloPos2.y <= -2){
                //this.createNewJello2();
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
    width: 1000,
    height: 600,
    backgroundColor: '#606C86',
    scene: MyGame
};

const game = new Phaser.Game(config);
