import { Component, Input, OnInit } from '@angular/core';
import { Hero, ELEMENT } from '../hero';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-hero-editor',
  templateUrl: './hero-editor.component.html',
  styleUrls: ['./hero-editor.component.less']
})
export class HeroEditorComponent implements OnInit {

  @Input() public hero!: Hero;
  // = {id:1, name: "test", element: ELEMENT.AIR}
  public elements: { [key: number]: string; } = [];
  // public selectedElementKey: number = 0;

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
    this.elements = {};
    Object.entries(ELEMENT)
      .filter(item => this.helperService.StringIsNumber(item[0]))
      .map(item => {
        const index: number = +item[0];
        this.elements[index] = "" + item[1];
      })
      ;
  }

}
