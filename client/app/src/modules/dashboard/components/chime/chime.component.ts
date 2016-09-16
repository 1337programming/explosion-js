import {Component, Inject, Input, OnInit, OnDestroy, trigger, transition, animate, style, group} from '@angular/core';
import {Samples} from 'app/src/common/services/samples.service';
import {Audio} from 'app/src/common/services/audio.service';
import {ColorPresets} from './color-presets';

let ChimeStyle = require('!!raw!sass!./views/chime.scss');
@Component({
  selector: 'chime',
  template: `
    <div class="ring" [@expand]="any"
         [style.border-color]="getColor()"
         [style.left.px]="chime.x"
         [style.top.px]="chime.y">
         <div class="message"><h4>@{{chime.topic}}</h4>{{chime.text}}</div>
    </div>
    <div class="light" [@flash]="any"
         [style.left.px]="chime.x"
         [style.top.px]="chime.y">
    </div>
  `,
  styles: [ChimeStyle],
  animations: [
    trigger('expand', [
      transition('void => *', [
        style({opacity: 1, transform: 'scale3d(.1,.1,.1) translateZ(0)'}),
        group([
          animate('5s',
            style({opacity: 0})),
          animate('5s cubic-bezier(0,.79,.13,.71)',
            style({transform: 'scale3d(1,1,1) translateZ(0)'}))
        ])
      ])
    ]),
    trigger('flash', [
      transition('void => *', [
        style({opacity: 1, transform: 'scale3d(.1,.1,.1) translateZ(0)'}),
        animate('0.05s ease-in',
          style({opacity: 1, transform: 'scale3d(1,1,1) translateZ(0)'})
        ),
        animate('1s ease-out',
          style({opacity: 0, transform: 'scale3d(0,0,0) translateZ(0)'})
        )
      ])
    ])
  
  ]
})

export class Chime implements OnInit, OnDestroy {
  @Input() chime: {x: number, y: number, note: string, text: string, sentiment: any, topic: string, name?: string};
  stopAudio: Function;
  
  private red: number;
  private green: number;
  private blue: number;
  private alpha: number;
  
  constructor(private samples: Samples,
              private audio: Audio,
              @Inject('size') private size) {
  }
  
  public ngOnInit() {
    if (ColorPresets[this.chime.name]) {
      let color = ColorPresets[this.chime.name];
      this.red = color.red;
      this.green = color.green;
      this.blue = color.blue;
    } else {
      this.red = this.getRandomIntInclusive(0, 255);
      this.green = this.getRandomIntInclusive(0, 255);
      this.blue = this.getRandomIntInclusive(0, 255);
    }
    this.alpha = Math.random();
    this.samples.getSample(this.chime.note).then(sample => {
      this.stopAudio = this.audio.play(sample, (this.chime.x / this.size.width) * 2 - 1);
    });
  }
  
  public ngOnDestroy() {
    if (this.stopAudio) {
      this.stopAudio();
    }
  }
  
  public getColor() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
  }
  
  private getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
}
