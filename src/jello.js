import Phaser, { Create } from 'phaser';
import jelloImg from './assets/jello.png';


export default class Jello
{
    static preload(scene)
    {
        scene.load.image('jello', jelloImg);
    }

    static addParticleSystemToScene(scene)
    {
        var psd = new b2ParticleSystemDef();
        psd.radius = 0.065;
        scene.lfJelloParticles = scene.myWorld.CreateParticleSystem(psd);

        scene.phaserJelloParticles = scene.add.particles('jello'); 
    }

    constructor(pos, scene)
    {
        this.position = pos;
        this.scene = scene;

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
        pgd.position.Set(this.position.x,this.position.y);
        this.group1 = scene.lfJelloParticles.CreateParticleGroup(pgd);
        this.group1.phaserParticleEmitters = [
            scene.phaserJelloParticles.createEmitter({
                tint: 0xEA4540,
                blendMode: Phaser.BlendModes.COLOR,
                scale: 0.3,
             })
         ];
    }
    
    getPosition()
    {
        return new b2Vec2(
            this.group1.position);
    }

    // isInside(targetArea)
    // {
        
    //     return true;
    // }
}