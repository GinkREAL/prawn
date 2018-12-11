import { Component } from '@angular/core';
import { bindCallback } from 'rxjs';

declare var particleJS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  title = 'PRAWn Data Labeling';
  ngOnInit(){
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      particles: {
          number: {
              value: 300,
          },
          color: {
              value: '#ff0000'
          },
          shape: {
              type: 'circle',
          },
          size: {
            value: 8,
          },
          line_linked:  {
            enable: true,
            color: '#ffffff',
            opacity: 0.6,
            distance: 40,
            width: 1,
          }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onclick: {
            enable: false,
            mode: "repulse"
          },
          onhover: {
            enable: false
          }
        }
      }
    };
  }
}
