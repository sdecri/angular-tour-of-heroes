import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[] | undefined;
  public selectedHero: Hero | undefined;

  constructor(private  heroService: HeroService) { 
    
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void{
    this.heroService.getHeroes()
    .subscribe(returnedHeroes => this.heroes = returnedHeroes);
  }

  // onSelect = (hero: Hero) => {
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  //   this.selectedHero = hero;
  // }

}
