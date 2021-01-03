import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero, ELEMENT } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})
export class HeroDetailComponent implements OnInit {

  public elements: { [key: number]: string; }  = [];
  public selectedElementKey: number = 0;

  public hero: Hero = {
    id: 0
    , name: "none"
    , element: ELEMENT.FIRE
  };
  public isMoreDetailActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private messageService: MessageService,
    private helperService: HelperService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getHero();
    // console.log(Object.entries(ELEMENT));
    this.elements = {};
    Object.entries(ELEMENT)
    .filter(item => this.helperService.StringIsNumber(item[0]))
    .map(item => {
      const index: number = +item[0];
      this.elements[index] = ""+item[1];
    })
    ;

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

  public onChangeElement(){
    // const element: ELEMENT = ELEMENT[this.selectedElement];
  }

  public goBack(){
    this.location.back();
  }

  public save(){
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack())
    ;
  }

}
