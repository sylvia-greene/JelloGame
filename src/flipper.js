import Phaser, { Create } from 'phaser';
import player1Img from './assets/sprites/player1.png';
import player2Img from './assets/sprites/player2.png';
import LiquidFunPhysics from './lf-phaser.js';

export default class Flipper
{
    static preload(scene)
    {
        scene.load.image('player1', player1Img);
        scene.load.image('player2', player2Img);
    }

    constructor(pos, scene, ground)
    {
        this.pos = pos;
        this.scene = scene;
        this.ground = ground;
        this.motorAngle = .15 * Math.PI;

        if (pos.x < 0) {
            this.angle = -0.10 * Math.PI;
            this.focalPoint = new b2Vec2(this.pos.x - 1.8, this.pos.y + 0.6);

        }
        else {
            this.angle = -0.9 * Math.PI;
            this.focalPoint = new b2Vec2(this.pos.x + 1.8, this.pos.y + 0.6);
        }
        this.constructFlipper();
    }

    constructFlipper() {
        var polygon_shape = new b2PolygonShape();
        polygon_shape.phaserCentroid = new b2Vec2(0,0);
        polygon_shape.SetAsBoxXYCenterAngle(2.05, 0.1, polygon_shape.phaserCentroid, 0.0);

        if(this.pos.x < 0) {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'player1');
        }
        else {
            polygon_shape.phaserSprite = this.scene.add.image(0,0,'player1');
            polygon_shape.phaserSprite.flipY = true;
        }

        var bd = new b2BodyDef;
        bd.position.Set(this.pos.x, this.pos.y);
        bd.angle = this.angle;

        polygon_shape.phaserSprite.setScale(.55);

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
        }
        else {
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
        }
        else {
            this.paddleMotor.SetMotorSpeed(-85);
        }
    }

    moveFlipperBack(){
        if (this.pos.x < 0) {
            this.paddleMotor.SetMotorSpeed(-85);
        }
        else {
            this.paddleMotor.SetMotorSpeed(85);
        }
    }

    getPos(){
        return this.pos;
    }
}