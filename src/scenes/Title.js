import startScreen from '../assets/sprites/start_screen.png';
class Title extends Phaser.Scene {
    constructor(){
        super('Title')
    }

    preload(){
        // this.load.image('background-image', require('./assets/opaque_background.png').default);
        // this.load.image('title-sprite', require('./assets/sprites/sqwish_title.png').default);
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
            this.scene.transition({target: 'MyGame', duration: 2000})
            console.log("key press")
        }, this);
    }

    update(time, delta){

    }
}

export default Title;