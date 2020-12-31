import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[] = HEROES;
  public selectedHero: Hero | undefined;

  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  onSelect = (hero: Hero) => this.selectedHero = hero;

}
