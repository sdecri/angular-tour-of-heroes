import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})
export class HeroDetailComponent implements OnInit {

  public hero?: Hero;
  public isMoreDetailActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private messageService: MessageService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getHero();
  }

  private getHero(){
    const idObject: any = this.route.snapshot.paramMap.get("id");
    if(idObject !== null){
      const id: number = +idObject;
      this.heroService.getHero(id)
      .subscribe(returnedHero => {
        if(returnedHero){
          this.hero = returnedHero;
        }else {
          this.messageService.add(`Hero with id ${id} not found!`);
        }
      });
    } else {
      this.messageService.add(`Hero id ${idObject} not found in url!`);
    }
    
  }

  public goBack(){
    this.location.back();
  }

}
