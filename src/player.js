import Phaser, { Create } from 'phaser';
import Jello from './jello';

export default class player {
    constructor(
        player,
        {
            playerName = "",
            score = 0,
            scoreText = scoreText
        }
    ) {
        this.player = player;
        this.playerName = playerName;
        this.score = score;
        this.scoreText = scoreText;
    }

    // takes in the user's int as its location
    displayScore(locationX, locationY){
        this.scoreText = this.player.add.text(locationX, locationY, playerName, 'Score: ', score, { fontSize: '32px', fill: '#000' })
    }

    updatePlayerScore(player, jello, basketLocationX, basketLocationY){
        // When player's jello passes through the hoop (jello.isInside) increase player's score by 1
        // Here call function that recognizes jello passthrough
        if (jello.isInside ){
            this.player.score += 1;
            this.scoreText.setText('Score: ' + score);
        }
    }
}