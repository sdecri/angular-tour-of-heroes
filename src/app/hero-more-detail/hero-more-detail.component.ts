import { Component, Input, OnInit } from '@angular/core';
import { Hero, ELEMENT } from '../hero';


@Component({
  selector: 'app-hero-more-detail',
  templateUrl: './hero-more-detail.component.html',
  styleUrls: ['./hero-more-detail.component.less']
})
export class HeroMoreDetailComponent implements OnInit {

  public ELEMENT = ELEMENT;

  @Input("my-hero") public myHero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
