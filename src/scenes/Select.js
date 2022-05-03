import tutScreen from '../assets/sprites/tut_screen.png';
import Qkey from '../assets/sprites/Qkey.png';
import Pkey from '../assets/sprites/Pkey.png';

import MyGame from '../index.js';
class Select extends Phaser.Scene {
    constructor(){
        super('Select')
    }

    preload(){
        this.load.image('tutScreen', tutScreen);
        this.load.image('Qkey', Qkey);
        this.load.image('Pkey', Pkey);
    }

    create(){
        var player1Selected = false;
        var player2Selected = false;

        var screen = this.add.sprite(0, 0, 'tutScreen');
        screen.setOrigin(0,0);
        screen.setScale(0.5);

        var q = this.add.sprite(100, 100, 'Qkey');
        q.setOrigin(0,0);
        q.setScale(0.15);

        var p = this.add.sprite(775, 100, 'Pkey');
        p.setOrigin(0,0);
        p.setScale(0.15);

        var select1Text = this.add.text(500, 500, 'Press SPACE to confirm player 1 color...', 16);
        select1Text.setOrigin(0.5);
        select1Text.setFontSize(20);

        this.input.keyboard.on('keyup-Q', (event) => {
            this.leftFlipper.moveFlipperBack();
        });

        this.input.keyboard.on('keyup-P', (event) => {
            this.rightFlipper.moveFlipperBack();
        });



        this.input.keyboard.on('keydown-SPACE', (event) => {
            if(player1Selected && player2Selected) {
                this.scene.pause();
                this.scene.start('MyGame', {color: [0, 1]});
                console.log('key press tut');
    
                }

            if (player1Selected == false && player2Selected == false){
                select1Text.destroy();
                q.destroy();
                player1Selected = true;
                player2Selected = true;
            

                // var p = this.add.sprite(900, 100, 'Pkey');
                // p.setOrigin(0,0);
                // p.setScale(0.15);
            }

        }, this);
        
    }

}

export default Select;