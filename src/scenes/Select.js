import tutScreen from '../assets/sprites/tut_screen.png';
import Qkey from '../assets/sprites/Qkey.png';
import Pkey from '../assets/sprites/Pkey.png';

import redImg from '../assets/sprites/red.png';
import orangeImg from '../assets/sprites/orange.png';
import yellowImg from '../assets/sprites/yellow.png';
import greenImg from '../assets/sprites/green.png';
import seafoamImg from '../assets/sprites/seafoam.png'
import blueImg from '../assets/sprites/blue.png';
import purpleImg from '../assets/sprites/purple.png'
import blackImg from '../assets/sprites/black.png'


import MyGame from '../index.js';
class Select extends Phaser.Scene {
    constructor(){
        super('Select')
    }

    preload(){
        this.load.image('tutScreen', tutScreen);
        this.load.image('Qkey', Qkey);
        this.load.image('Pkey', Pkey);

        this.load.image('red', redImg);
        this.load.image('orange', orangeImg);
        this.load.image('yellow', yellowImg);
        this.load.image('green', greenImg);
        this.load.image('seafoam', seafoamImg);
        this.load.image('blue', blueImg);
        this.load.image('purple', purpleImg);
        this.load.image('black', blackImg);
    }

    create(){
        var selected = 0;
        this.player1Choice = 0;
        this.player2Choice = 0;

        var player1Selected = false;
        var player2Selected = false;

    
        var screen = this.add.sprite(0, 0, 'tutScreen');
        screen.setOrigin(0,0);
        screen.setScale(0.5);

        var q = this.add.sprite(100, 100, 'Qkey');
        q.setOrigin(0,0);
        q.setScale(0.15);

        this.createColorSelect();

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
            if (player1Selected) {
                player2Selected = true;

                this.scene.pause();
                this.scene.start('MyGame', {color: [this.player1Choice, this.player2Choice]});
                console.log('key press tut');
            }

            if (player1Selected == false){
                player1Selected = true;

                select1Text.destroy();
                q.destroy();
                
            
                var p = this.add.sprite(746.4, 100, 'Pkey');
                p.setOrigin(0,0);
                p.setScale(0.15);

                var select2Text = this.add.text(500, 500, 'Press SPACE to confirm player 2 color and start game...', 16);
                select2Text.setOrigin(0.5);
                select2Text.setFontSize(20);
            }

        }, this);
        
    }

    createColorSelect(){
        var red = this.add.sprite(40, 375, 'red');
        red.setOrigin(0,0);
        red.setScale(0.30); 

        var orange = this.add.sprite(40, 375, 'orange');
        orange.setOrigin(0,0);
        orange.setScale(0.15); 



    }


}

export default Select;