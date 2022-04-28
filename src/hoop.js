import Phaser, { Create } from 'phaser';
import hoopImg from './assets/sprites/hoop.png';
import LiquidFunPhysics from './lf-phaser.js';


export default class Hoop
{
    static preload(scene)
    {
        scene.load.image('hoop', hoopImg);
    }


    constructor(pos, scene, ground)
    {
        var hoop_shape = new b2PolygonShape();
        hoop_shape.position.Set(pos.x, pos.y); // x = 0, y = 5
        
        hoop_shape.phaserSprite = scene.add.image(0, 0,'hoop');
        hoop_shape.phaserSprite.setScale(0.3);

        var hoop_vertices = hoop_shape.vertices;
        hoop_vertices.push(new b2Vec2(pos.x - 1.41, pos.y - 1.1));
        hoop_vertices.push(new b2Vec2(pos.x - 1.13, pos.y - 1.62));
        hoop_vertices.push(new b2Vec2(pos.x - 1.13, pos.y - 0.52));
        hoop_vertices.push(new b2Vec2(pos.x - 1.41, pos.y - 0.52));
        ground.CreateFixtureFromShape(hoop_shape, 0);

        var hoop_shape2 = new b2PolygonShape();
        hoop_shape2.position.Set(0, 5);

        var hoop_vertices2 = hoop_shape2.vertices;
        hoop_vertices2.push(new b2Vec2(-1.13, 3.38));
        hoop_vertices2.push(new b2Vec2(-0.45, 2.58));
        hoop_vertices2.push(new b2Vec2(-1.13, 4.48));
        ground.CreateFixtureFromShape(hoop_shape2, 0);

        var hoop_shape3 = new b2PolygonShape();
        hoop_shape3.position.Set(0, 5);

        var hoop_vertices3 = hoop_shape3.vertices;
        hoop_vertices3.push(new b2Vec2(1.13, 3.38));
        hoop_vertices3.push(new b2Vec2(1.13, 4.48));
        hoop_vertices3.push(new b2Vec2(0.45, 2.58));
        ground.CreateFixtureFromShape(hoop_shape3, 0);

        var hoop_shape4 = new b2PolygonShape();
        hoop_shape4.position.Set(0, 5);

        var hoop_vertices4 = hoop_shape4.vertices;
        hoop_vertices4.push(new b2Vec2(1.41, 3.9));
        hoop_vertices4.push(new b2Vec2(1.41, 4.48));
        hoop_vertices4.push(new b2Vec2(1.13, 4.48));
        hoop_vertices4.push(new b2Vec2(1.13, 3.38));
        
        ground.CreateFixtureFromShape(hoop_shape4, 0);


        // x values: 1.41, 1.13, 0.45
        // y values: 3.9, 3.38, 4.48, 2.58, 

    }


    constructHoopPhysics(){
        hoop_vertices.push(new b2Vec2(-1.41, 3.9));
        hoop_vertices.push(new b2Vec2(-1.13, 3.38));
        hoop_vertices.push(new b2Vec2(-1.13, 4.48));
        hoop_vertices.push(new b2Vec2(-1.41, 4.48));

        hoop_vertices2.push(new b2Vec2(-1.13, 3.38));
        hoop_vertices2.push(new b2Vec2(-0.45, 2.58));
        hoop_vertices2.push(new b2Vec2(-1.13, 4.48));

    }
    
    getPosition(){
        return this.pos;  
    }
}