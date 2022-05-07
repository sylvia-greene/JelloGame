import Phaser, { Create, Game } from 'phaser';
import MyGame from './scenes/Game.js';
import Title from './scenes/Title.js';
import Select from './scenes/Select.js';
import Tutorial from './scenes/Tutorial.js';
import GameOver from './scenes/GameOver.js';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1000,
    height: 600,
    backgroundColor: '#606C86',
    autoCenter: true,
    scene: [
        Title,
        Tutorial,
        Select,
        MyGame, 
        GameOver
    ]
};

const game = new Phaser.Game(config);
