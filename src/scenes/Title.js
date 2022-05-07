import startScreen from '../assets/sprites/start_screen.png';

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

        var text = this.add.text(500, 425, 'Press SPACE to begin', 16);
        text.setOrigin(0.5);
        text.setFontSize(20);

        this.input.keyboard.on('keydown-SPACE', (event) => {
            this.scene.pause();
            this.scene.start('Tutorial');
            console.log('key press');
        }, this);
    }
}

export default Title;