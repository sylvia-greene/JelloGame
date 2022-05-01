import Phaser, { Create } from 'phaser';
import Hoop from './hoop';
import Jello from './jello';

export default class player {
    constructor( playerName, score, scoreText,scene)
    {
        this.scene = scene;
        this.player = player;
        this.playerName = playerName;
        this.score = score;
        this.scoreText = scoreText;
    }

    // takes in the user's int as its location
    displayScore(){
        if(this.playerName == 1 ){
            var locationX = 16;
            var locationY = 16;
        }
        if(this.playerName == 2){
            locationX = 680;
            locationY = 16;
        }
        this.scoreText = this.scene.add.text(locationX, locationY,'Player'+ this.playerName + '  Score:' + this.score, { fontSize: '32px', fill: '#000' })
    }

    updatePlayerScore(player, jello){
        // When player's jello passes through the hoop (jello.isInside) increase player's score by 1
        // Here call function that recognizes jello passthrough
        if (Jello.getPosition() == Hoop.getPosition()){
            this.player.score += 1;
            this.scoreText.setText('Score: ' + score);
        }
    }
}