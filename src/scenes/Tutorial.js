import tutScreen from '../assets/sprites/tut_screen.png';
import Qkey from '../assets/sprites/Qkey.png';
import Pkey from '../assets/sprites/Pkey.png';

import MyGame from '../index.js';
class Tutorial extends Phaser.Scene {
    constructor(){
        super('Tutorial')
    }

    preload(){
        this.load.image('tutScreen', tutScreen);
        this.load.image('Qkey', Qkey);
        this.load.image('Pkey', Pkey);
    }

    create(){
        var screen = this.add.sprite(0, 0, 'tutScreen');
        screen.setOrigin(0,0);
        screen.setScale(0.5);

        var q = this.add.sprite(175, 100, 'Qkey');
        q.setOrigin(0,0);
        q.setScale(0.25);
        q.setTint(0x8a898c);

        var p = this.add.sprite(575, 100, 'Pkey');
        p.setOrigin(0,0);
        p.setScale(0.25);
        p.setTint(0x8a898c);

        var text1 = this.add.text(300, 425, 'Player 1', 16);
        text1.setOrigin(0.5);
        text1.setFontSize(20);

        var text2 = this.add.text(700, 425, 'Player 2', 16);
        text2.setOrigin(0.5);
        text2.setFontSize(20);

        var text3 = this.add.text(500, 500, 'Press SPACE to continue...', 16);
        text3.setOrigin(0.5);
        text3.setFontSize(20);

        //var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.input.keyboard.on('keydown-Q', (event) => {
            q.setTint();
        });

        this.input.keyboard.on('keyup-Q', (event) => {
            q.setTint(0x8a898c);
        });


        this.input.keyboard.on('keydown-P', (event) => {
            p.setTint();
        }); 

        this.input.keyboard.on('keyup-P', (event) => {
            p.setTint(0x8a898c);
        });
        
        
        this.input.keyboard.on('keydown-SPACE', (event) => {
            this.scene.pause();
            this.scene.start('Select');
            console.log('key press tut');
        }, this);
       
        
    }

}

export default Tutorial;