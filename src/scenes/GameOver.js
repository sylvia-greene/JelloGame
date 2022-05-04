import background from '../assets/sprites/tut_screen.png';
import Jello from '../jello.js';

class GameOver extends Phaser.Scene {
    constructor(){
        super('GameOver')
    }

    init(data){
        this.winningPlayer = data.winningPlayer;
        // console.log(this.winningPlayer);
    }
    preload(){
        this.load.image('background', background);
        Jello.preload(this);
    }

    create(){
        var background = this.add.sprite(0, 0, 'background');
        background.setOrigin(0,0);
        background.setScale(0.5);

        var text1 = this.add.text(500, 425, 'Game Over!', 16);
        text1.setOrigin(0.5);
        text1.setFontSize(30);

        console.log(this);
        var text2 = this.add.text(500, 200, this.winningPlayer);
        text2.setOrigin(0.5);
        text2.setFontSize(50);

        var text3 = this.add.text(500, 500, 'Press SPACE to return to Main Menu');
        text3.setOrigin(0.5);
        text3.setFontSize(20);

        this.input.keyboard.on('keydown-SPACE', (event) => {
            this.scene.pause();
            this.scene.start('Title');
            console.log('key press');
        }, this);
       
        this.jellos = []
        for (let i = 0; i<1000; i++){
            var jello = new Jello({ x: 0, y: 0 }, this, 1, this.colorArray[0]);
            this.jello.push(jello);
        }
        Jello.addParticleSystemToScene(this)
    }

}

export default GameOver;