import Phaser from 'phaser';

import logoImg from './assets/logo.png';
import ballImg from './assets/ball.png';


var timeStep = 1/60.0;
var velocityIterations = 8;
var positionIterations = 10;
var bd = new b2BodyDef;
var ground;
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
    }
      
    create ()
    {
<<<<<<< HEAD
        this.myBallSprite = this.add.image(300,100,'ball');
        const logo = this.add.image(400, 150, 'logo');
        var gravity = new b2Vec2(0,100.0);  
        window.world = this.myWorld = new b2World(gravity);

    

        this.ballShape = new b2CircleShape();
        this.ballShape.position.Set(0, 0);
        this.ballShape.radius = .5;

        var ballBodyDef = new b2BodyDef();
        ballBodyDef.type = b2_dynamicBody;
        this.ballBody = this.myWorld.CreateBody(ballBodyDef);
    
        this.ballFixture = this.ballBody.CreateFixtureFromShape(this.ballShape, 0.5);




        
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
=======
        this.myBallSprite = this.add.image(300, 100, 'ball');

    var gravity = new b2Vec2(0, 1500);
    window.world = this.myWorld = new b2World(gravity);

  var bd = new b2BodyDef();
  var ground = this.myWorld.CreateBody(bd);

  var fd = new b2FixtureDef;
  fd.shape = shape;
  fd.density = 0.0;
  fd.friction = 0.6;

//   var shape1 = new b2PolygonShape();
//   var vertices = shape1.vertices;
//   vertices.push(new b2Vec2(-4, -1));
//   vertices.push(new b2Vec2(4, -1));
//   vertices.push(new b2Vec2(4, 0));
//   vertices.push(new b2Vec2(-4, 0));
//   ground.CreateFixtureFromShape(shape1, 0);

  var psd = new b2ParticleSystemDef();
  psd.radius = 0.035;
  var particleSystem = this.myWorld.CreateParticleSystem(psd);

  // third group
  var box = new b2PolygonShape();
  var pgd = new b2ParticleGroupDef();
  box.SetAsBoxXY(1, 0.5);
  pgd.flags = b2_elasticParticle;
  pgd.groupFlags = b2_solidParticleGroup;
  pgd.position.Set(300, 300);
  pgd.angle = -0.5;
  pgd.angularVelocity = 2;
  pgd.shape = box;
  particleSystem.CreateParticleGroup(pgd);


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

  circle.radius = 10;
  this.ballBody.CreateFixtureFromShape(circle, 0.5);
>>>>>>> f11f654306ca12355d904e42e6232b058a96ac36
    }

    update()
    {
        this.myWorld.Step(timeStep,velocityIterations,positionIterations);

        let {x,y} = this.ballBody.GetPosition();
        this.myBallSprite.setPosition(x,y);
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
