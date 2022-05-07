import redImg from './assets/sprites/red.png';
import orangeImg from './assets/sprites/orange.png';
import yellowImg from './assets/sprites/yellow.png';
import greenImg from './assets/sprites/green.png';
import seafoamImg from './assets/sprites/seafoam.png'
import blueImg from './assets/sprites/blue.png';
import purpleImg from './assets/sprites/purple.png';
import blackImg from './assets/sprites/black.png';
import paulImg from './assets/sprites/paul.png';

export default class Flipper
{
    static preload(scene)
    {
        scene.load.image('red', redImg);
        scene.load.image('orange', orangeImg);
        scene.load.image('yellow', yellowImg);
        scene.load.image('green', greenImg);
        scene.load.image('seafoam', seafoamImg);
        scene.load.image('blue', blueImg);
        scene.load.image('purple', purpleImg);
        scene.load.image('black', blackImg);
        scene.load.image('paul', paulImg);
    }

    constructor(pos, scene, ground, colorIndex)
    {
        this.pos = pos;
        this.scene = scene;
        this.ground = ground;
        this.colorIndex = colorIndex;
        this.motorAngle = .15 * Math.PI;

        if (pos.x < 0) {
            this.angle = -0.10 * Math.PI;
            this.focalPoint = new b2Vec2(this.pos.x - 1.8, this.pos.y + 0.6);
        } else {
            this.angle = -0.9 * Math.PI;
            this.focalPoint = new b2Vec2(this.pos.x + 1.8, this.pos.y + 0.6);
        }
        this.constructFlipper();
    }

    constructFlipper() {
        var polygon_shape = new b2PolygonShape();
        polygon_shape.phaserCentroid = new b2Vec2(0,0);
        polygon_shape.SetAsBoxXYCenterAngle(2.05, 0.1, polygon_shape.phaserCentroid, 0.0);

        if(this.colorIndex == 0) {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'red');
        } else if(this.colorIndex == 1) {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'orange');
        } else if(this.colorIndex == 2) {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'yellow');
        } else if(this.colorIndex == 3) {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'green');
        } else if(this.colorIndex == 4) {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'seafoam');
        } else if(this.colorIndex == 5) {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'blue');
        } else if(this.colorIndex == 6) {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'purple');
        } else if(this.colorIndex == 7) {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'black');
        } else {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'paul');
        }

        if(this.pos.x > 0) {
            polygon_shape.phaserSprite.flipY = true;
        }
        polygon_shape.phaserSprite.setScale(.55);

        var bd = new b2BodyDef;
        bd.position.Set(this.pos.x, this.pos.y);
        bd.angle = this.angle;
        bd.type = b2_dynamicBody;
        bd.bullet = true;
        bd.density = 10000;

        var body = world.CreateBody(bd);   
        body.CreateFixtureFromShape(polygon_shape, 1.0);
        
        let paddleMotorDef = new b2RevoluteJointDef();
        paddleMotorDef.upperAngle = 0;
        paddleMotorDef.lowerAngle = 0;
        if(this.pos.x < 0) {
            paddleMotorDef.upperAngle = this.motorAngle;
        } else {
            paddleMotorDef.lowerAngle = -this.motorAngle;
        }
        paddleMotorDef.enableLimit = true;
        paddleMotorDef.maxMotorTorque = 250.0;
        paddleMotorDef.enableMotor = true;
        paddleMotorDef.collideConnected = false;
        this.paddleMotor = paddleMotorDef.InitializeAndCreate(this.ground, body, this.focalPoint);
    }

    moveFlipper(){
        if (this.pos.x < 0) {
            this.paddleMotor.SetMotorSpeed(85);
        } else {
            this.paddleMotor.SetMotorSpeed(-85);
        }
    }

    moveFlipperBack(){
        if (this.pos.x < 0) {
            this.paddleMotor.SetMotorSpeed(-85);
        } else {
            this.paddleMotor.SetMotorSpeed(85);
        }
    }

    getPos(){
        return this.pos;
    }
}