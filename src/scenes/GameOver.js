import background from '../assets/sprites/tut_screen.png';
import Jello from '../jello.js';

import LiquidFunPhysics from '../lf-phaser.js';

class GameOver extends Phaser.Scene {
    constructor(){
        super('GameOver')
    }

    init(data){
        this.winningPlayer = data.winningPlayer;
        this.winningColor = data.winningColor;
    }
    preload(){
        this.load.image('background', background);
        Jello.preload(this);
    }

    create(){
        recreateLiquidFun();

        var gravity = new b2Vec2(0,-15);
        window.world = this.myWorld = new b2World(gravity);
        var ground = world.CreateBody(new b2BodyDef());

        this.physics = new LiquidFunPhysics(this.myWorld, { scale: 60, center: [500,500], flip: true });

        Jello.addParticleSystemToScene(this);

        var background = this.add.sprite(0, 0, 'background');
        background.setOrigin(0,0);
        background.setScale(0.5);

        var text1 = this.add.text(500, 425, 'Game Over!', 16);
        text1.setOrigin(0.5);
        text1.setFontSize(30);

        var text2 = this.add.text(500, 200, this.winningPlayer);
        text2.setOrigin(0.5);
        text2.setFontSize(50);

        var text3 = this.add.text(500, 500, 'Press SPACE to return to Main Menu');
        text3.setOrigin(0.5);
        text3.setFontSize(20);


        this.input.keyboard.on('keydown-SPACE', (event) => {
            this.scene.start('Title');
        }, this);
       
        this.jellos = [];
        if (this.winningColor < 9){
            for (var i=0; i < 50; i++) {
                var jello = new Jello({ x: 0, y: 5}, this, 1, this.winningColor);
                this.jellos.push(jello);
            }
        }


    }

    update(t, dt){
        this.physics.update(dt);

        for (let jello of this.jellos){
            if(this.physics.toPhaserCoord(jello.getPosition()).y > this.sys.game.canvas.height + 100 ){
                jello.destroy();
                this.jellos=[];
            }
        }
    }

}

export default GameOver;