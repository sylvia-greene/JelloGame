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
        this.scoreText = this.scene.add.text(locationX, locationY,'Score:' , { fontSize: '32px', fill: '#000' });
        this.scoreNumber = this.scene.add.text(locationX + 120, locationY + 3, this.score , { fontSize: '32px', fill: '#000' });
    }

  updatePlayerScore(){
      this.score += 1;
      this.scoreNumber.setText(this.score);
    }


}