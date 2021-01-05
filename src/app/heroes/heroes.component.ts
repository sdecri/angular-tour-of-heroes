import { Component, OnInit } from '@angular/core';
import { ELEMENT, Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[] = [];
  public newHero: Hero = this.createDefaultNewHero();
  public selectedHero: Hero | undefined;

  constructor(private heroService: HeroService) {

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  private createDefaultNewHero(): Hero{
    return {name: '', element: ELEMENT.FIRE} as Hero;
  }

  private getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(returnedHeroes => this.heroes = returnedHeroes);
  }

  public addCallback(): void {
    this.newHero.name = this.newHero.name.trim();
    if (!this.newHero.name) { return; }
    this.heroService.addHero(this.newHero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.newHero = this.createDefaultNewHero();
      });
  }

  
  public delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(() => {
      this.heroes = this.heroes.filter(h => h !== hero);
    });
  }

  // onSelect = (hero: Hero) => {
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  //   this.selectedHero = hero;
  // }

}
