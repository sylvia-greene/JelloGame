import tutScreen from '../assets/sprites/tut_screen.png';
import Qkey from '../assets/sprites/Qkey.png';
import Pkey from '../assets/sprites/Pkey.png';
import arrowImg from '../assets/sprites/arrowsprite.png';

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
        this.load.image('arrow', arrowImg);

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
        var player1Choice = 0;
        var player2Choice = 0;
        var unadded = true;
        var player1Selected = false;
    
        var screen = this.add.sprite(0, 0, 'tutScreen');
        screen.setOrigin(0,0);
        screen.setScale(0.5);

        var q = this.add.sprite(10, 10, 'Qkey');
        q.setOrigin(0,0);
        q.setScale(0.25);

        this.arrow = this.add.sprite(5, 275, 'arrow');
        this.arrow.setOrigin(0,0);
        this.arrow.setScale(0.10);

        this.createColorSelect();

        var select1Text = this.add.text(500, 500, 'Press SPACE to confirm player 1 color...', 16);
        select1Text.setOrigin(0.5);
        select1Text.setFontSize(20);

        this.input.keyboard.on('keydown-Q', (event) => {
            if (player1Selected == false){
                if (this.arrow.x + 110 > 950){
                    this.arrow.setPosition(5, 275);
                    selected = 0;
                }
                else {
                    this.arrow.setPosition(this.arrow.x + 110, 275);
                    selected++;
                }
            }
        });

        this.input.keyboard.on('keydown-P', (event) => {
            if (player1Selected){
                if (this.arrow.x + 110 > 950){
                    this.arrow.setPosition(5, 275);
                    selected = 0;
                }
                else {
                    this.arrow.setPosition(this.arrow.x + 110, 275);
                    selected ++;
                }
            }
        });

        this.input.keyboard.on('keydown-SPACE', (event) => {
            if (player1Selected) {
                player2Choice = selected;

                if (player1Choice == player2Choice){
                    if(unadded){
                        var changeColorText = this.add.text(500, 200, 'Please choose a different color...', 16);
                        changeColorText.setOrigin(0.5);
                        changeColorText.setFontSize(20);
                        unadded = false;
                    }
                }

                else{
                    this.scene.pause();
                    this.scene.start('MyGame', {color: [player1Choice, player2Choice]});
                    console.log('key press tut');
                }
            }

            if (player1Selected == false){
                player1Selected = true;
                player1Choice = selected;

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
        var red = this.add.sprite(5, 375, 'red');
        red.setOrigin(0,0);
        red.setScale(0.25); 

        var orange = this.add.sprite(115, 375, 'orange');
        orange.setOrigin(0,0);
        orange.setScale(0.25); 

        var yellow = this.add.sprite(225, 375, 'yellow');
        yellow.setOrigin(0,0);
        yellow.setScale(0.25); 

        var green = this.add.sprite(335, 375, 'green');
        green.setOrigin(0,0);
        green.setScale(0.25);
        
        var seafoam = this.add.sprite(445, 375, 'seafoam');
        seafoam.setOrigin(0,0);
        seafoam.setScale(0.25);

        var blue = this.add.sprite(555, 375, 'blue');
        blue.setOrigin(0,0);
        blue.setScale(0.25);

        var purple = this.add.sprite(665, 375, 'purple');
        purple.setOrigin(0,0);
        purple.setScale(0.25);

        var black = this.add.sprite(775, 375, 'black');
        black.setOrigin(0,0);
        black.setScale(0.25);

        var paul = this.add.sprite(885, 375, 'red');
        paul.setOrigin(0,0);
        paul.setScale(0.25);
    }


}

export default Select;