import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor:'yellow'   , opacity:0}),
        animate(2000 , style({backgroundColor:'red' , opacity:1 }) )
      ])
    ])
  ]

})
export class AnimationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
