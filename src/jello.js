import Phaser, { Create } from 'phaser';
import jelloImg from './assets/jello.png';
import paulticleImg from './assets/paulticle.png'


export default class Jello
{
    static preload(scene)
    {
        scene.load.image('jello', jelloImg);
        scene.load.image('paulticle', paulticleImg);

    }

    static addParticleSystemToScene(scene)
    {
        var psd = new b2ParticleSystemDef();
        psd.radius = 0.065;
        scene.lfJelloParticles = scene.myWorld.CreateParticleSystem(psd);
    }

    constructor(pos, scene, player, colorIndex)
    {
        this.scene = scene;
        this.player = player;
        this.isScored = false;
        this.colorIndex = colorIndex;

        this.colorArray = [0xE41C17, 0xef603d, 0xeed307, 0x0db50d, 0x32E1B4, 0x1734E4, 0xA532E1, 0x000000, 0xeb9dd3, 0xeb9dd3]

        var trapezoid = new b2PolygonShape();
        var trapezoid_vertices = trapezoid.vertices;
        trapezoid_vertices.push(new b2Vec2(-0.5, -0.3));
        trapezoid_vertices.push(new b2Vec2(0.5, -0.3));
        trapezoid_vertices.push(new b2Vec2(0.3, 0.4));
        trapezoid_vertices.push(new b2Vec2(-0.3, 0.4));


        if (colorIndex == 8){
            //this.scene.phaserJelloParticles = scene.add.particles('paulticle'); 
            this.scene.phaserJelloParticles = scene.add.particles('jello');
        } else {
            var jelloColor = this.colorArray[colorIndex];
            this.scene.phaserJelloParticles = scene.add.particles('jello'); 
        }
 
        var pdg = new b2ParticleGroupDef();
        pdg.flags = b2_springParticle;
        pdg.groupFlags = b2_solidParticleGroup;
        pdg.shape = trapezoid;
        pdg.position.Set(pos.x,pos.y);
        this.particleGroup = scene.lfJelloParticles.CreateParticleGroup(pdg);
        this.particleGroup.phaserParticleEmitters = [
            scene.phaserJelloParticles.createEmitter({
                tint: jelloColor,
                blendMode: Phaser.BlendModes.COLOR,
                scale: 0.3,
             })
         ];
    }
    
    getPosition()
    {
        return this.scene.physics.computeParticleCentroid(
            this.scene.lfJelloParticles,
            this.particleGroup);  
    }

    // isInside(targetArea)
    // {
        
    //     return true;
    // }

    getPlayer()
    {
        return this.player;
    }

    destroy()
    {   

        this.particleGroup.DestroyParticles(true);
        for(let emitter of this.particleGroup.phaserParticleEmitters)
        {
            emitter.remove();
        }
        this.isDestroyed = true;
    }
}