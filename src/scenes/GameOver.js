import background from '../assets/sprites/tut_screen.png';

class GameOver extends Phaser.Scene {
    constructor(){
        super('GameOver')
    }

    init(data){
        this.winner = this.data
    }
    preload(){
        this.load.image('background', background);
     
    }

    create(){
        var background = this.add.sprite(0, 0, 'background');
        background.setOrigin(0,0);
        background.setScale(0.5);

        var text = this.add.text(500, 425, 'Game Over!', 16);
        text.setOrigin(0.5);
        text.setFontSize(20);

        var text = this.add.text(500, 200, winner + ' wins!');

        this.input.keyboard.on('keydown-SPACE', (event) => {
            this.scene.pause();
            this.scene.start('Title');
            console.log('key press');
        }, this);
       
        
    }

}

export default GameOver;