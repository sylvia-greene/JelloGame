import startScreen from '../assets/sprites/start_screen.png';
import startButton from '../assets/sprites/startButton.png';
class Title extends Phaser.Scene {
    constructor(){
        super('Title')
    }

    preload(){
        // this.load.image('background-image', require('./assets/opaque_background.png').default);
        // this.load.image('title-sprite', require('./assets/sprites/sqwish_title.png').default);
        this.load.image('start-image', startScreen);
        this.load.image('button', startButton)
    }

    create(){
        // var background = this.add.sprite(0, 0, 'background-image');
        // background.setOrigin(0,0);
        
        // var titleSprite = this.add.sprite(500, 200, 'title-sprite');
        // titleSprite.setScale(0.3);
        var startImage = this.add.sprite(0, 0, 'start-image');
        startImage.setOrigin(0,0);
        startImage.setScale(0.50);

        // var startButton = this.add.sprite('button');
        // startButton.setPosition(500, 400);
        // startImage.setScale(0.3);
    }

    update(time, delta){

    }
}

export default Title;