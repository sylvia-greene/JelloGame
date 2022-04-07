import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import ballImg from './assets/ball.png';

var timeStep = 1.0/60.0;
var velocityIterations = 8;
var positionIterations = 3;
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
        this.myBallSprite = this.add.image(300,100,'ball');
        const logo = this.add.image(400, 150, 'logo');
        var gravity = new b2Vec2(0,-10.0);
      
        
        this.myWorld = new b2World(gravity);


        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }

    update()
    {
        this.myWorld.Step(timeStep,velocityIterations,positionIterations);
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
