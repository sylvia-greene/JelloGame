import LiquidFunPhysics from './lf-phaser.js';
import jelloImg from './assets/jello.png';
import Phaser, { Create } from 'phaser';

export default class Jello
{

    preload()
    {
        this.load.image('jello', jelloImg);
    }

    createJello(position,world)
    {
        this.position = position;
        this.world = world;

        this.physics = new LiquidFunPhysics(this.myWorld, { scale: 60, center: [500,500], flip: true });
        var psd = new b2ParticleSystemDef();
        psd.radius = 0.065;
        var particleSystem = world.CreateParticleSystem(psd);
        this.jelloSystem = particleSystem;       
       // const jello = this.add.particles('jello'); 

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
        pgd.position.Set(position.x,position.y);
        this.group1 = particleSystem.CreateParticleGroup(pgd);
        // this.group1.phaserParticleEmitters = [
        //     jello.createEmitter({
        //         tint: 0xEA4540,
        //         blendMode: Phaser.BlendModes.COLOR,
        //         scale: 0.3,
        //      })
        //  ];
    }   
}