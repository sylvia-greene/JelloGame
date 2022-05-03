import Phaser, { Create, Game } from 'phaser';
import MyGame from './scenes/Game.js';
import Title from './scenes/Title.js';
import Select from './scenes/Select.js';
import Tutorial from './scenes/Tutorial.js';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1000,
    height: 600,
    backgroundColor: '#606C86',
    scene: [
        Title,
        Select,
        Tutorial,
        MyGame
    ]
};

const game = new Phaser.Game(config);



