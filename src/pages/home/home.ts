import { Component , ViewChild , ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('canvas') canvasEl:ElementRef;
  windowWidth:any;
  windowHeight:any;
  context:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform
    ) {
      platform.ready().then((readySource) => {
        console.log('Width: ' + platform.width());
        console.log('Height: ' + platform.height());
        this.windowWidth = this.platform.width();
        this.windowHeight = this.platform.height();
        let canvas = this.canvasEl.nativeElement;
        let ctx = canvas.getContext('2d');
        if (ctx) {
          this.context = ctx;
          console.log(`width:${this.windowWidth*0.1} Height:${this.windowHeight*0.1}`);
          let canvasWidth = canvas.width;
          let canvasHeight = canvas.height;
          let startPoint = canvasWidth * 0.05;
          let endPoint = startPoint;
          
          let curentY = canvasHeight * 0.1;
         

         let radius = 15
         let positionX = []
          for (let index = 0; index < 5; index++) {
            positionX.push(endPoint + (canvasWidth * 0.1) + radius * 2);
            endPoint += 10 + radius * 2;
          }

          endPoint += 15 + radius * 2;
          this.context.beginPath();
          this.context.moveTo(startPoint,curentY + ((canvasWidth * 0.1)/2));
          this.context.lineTo(endPoint,curentY + ((canvasWidth * 0.1)/2));
          this.context.fillStyle = 'black';
          this.context.stroke();
          for (let index = 0; index < positionX.length; index++) {
            const element = positionX[index];
            this.context.beginPath();
            this.context.arc(element ,curentY + ((canvasWidth * 0.1)/2),radius,0,2*Math.PI);
            this.context.fillStyle = `${this.getRandomColor()}`
            this.context.fill();
          }

          this.context.fillStyle = 'green';
          this.context.fillRect(startPoint,curentY,canvasWidth * 0.1,canvasWidth * 0.1);
          this.context.fillStyle = 'red';
          this.context.fillRect(endPoint,curentY,canvasWidth * 0.1,canvasWidth * 0.1);
        }
      });
    
  }
  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
