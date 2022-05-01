import startScreen from '../assets/sprites/start_screen.png';
import MyGame from '../index.js';
class Title extends Phaser.Scene {
    constructor(){
        super('Title')
    }

    preload(){
        this.load.image('start-image', startScreen);
     
    }

    create(){
        var startImage = this.add.sprite(0, 0, 'start-image');
        startImage.setOrigin(0,0);
        startImage.setScale(0.5);

        var text = this.add.text(500, 425, 'Press any button to begin', 16);
        text.setOrigin(0.5);
        text.setFontSize(20);
    
        this.input.keyboard.on('keydown', (event) => {
            this.scene.start(MyGame)
            console.log("key press")
        }, this);
       
       
        
    }

}

export default Title;